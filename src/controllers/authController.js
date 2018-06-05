const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User = require('../models/user.js');

const router = express.Router();

function generateJwt(userId) {
  return jwt.sign({ id: userId }, authConfig.secret, { expiresIn: 86400 });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) return res.status(400).send({ error: 'User already exists' });

    const user = await User.create(req.body);
    user.password = undefined;

    console.log('New user:');
    console.log(user);
    return res.send({
      user,
      token: generateJwt(user.id),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  user.password = undefined;

  console.log('Logged in:');
  console.log(user);
  return res.send({
    user,
    token: generateJwt(user.id),
  });
});

module.exports = app => app.use('/auth', router);
