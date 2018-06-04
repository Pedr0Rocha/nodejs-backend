const express = require('express');

const User = require('../models/user.js');

const router = express.Router();


router.post('/register', async (req, res) => {
	console.log(req.body);
	const { email } = req.body;

	try {
		if (await User.findOne({ email })) return res.status(400).send({ error: 'User already exists' });

		const user = await User.create(req.body);
		user.password = undefined;

		console.log(user);
		return res.send({ user });
	} catch (err) {
		console.log(err);
		return res.status(400).send({ error: 'Registration failed'});
	}
});

module.exports = app => app.use('/auth', router);