const addNote = require('./add-note');
const updateNote = require('./update-note');
const deleteNote = require('./delete-note');
const getNoteById = require('./get-note');
const getNotes = require('./get-notes');

module.exports = {
  addNote,
  updateNote,
  deleteNote,
  getNoteById,
  getNotes
};
