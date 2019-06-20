const mongoose = require('mongoose');

let connectionString;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  connectionString = process.env.MONGO_URI_TEST;
}

connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(
    `Connected to ${
      process.env.NODE_ENV === 'test' ? 'Mongo Test DB' : 'MongoDB'
    }`
  );
});

module.exports = db;
