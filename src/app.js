const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;

app.get('/', (red, res) => {
  res.send(`Server running at: ${port}`);
});

require('./controllers/authController')(app);

app.listen(port);
