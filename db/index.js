const mongoose = require('mongoose');
require('dotenv').config();

const connectionString =
  process.env.TEST_ENV === 'true'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = db;
