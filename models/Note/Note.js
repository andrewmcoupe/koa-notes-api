const mongoose = require('mongoose');
const validationSchema = require('./validationSchema');

var noteSchema = new mongoose.Schema({
  title: String
});

const Note = mongoose.model('Note', noteSchema);

module.exports = {
  Note,
  validationSchema
};
