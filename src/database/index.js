const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodebackend');
mongoose.Promise = global.Promise;

module.exports = mongoose;