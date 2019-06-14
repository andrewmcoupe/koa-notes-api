const mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
