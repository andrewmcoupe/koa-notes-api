const { noteSchema } = require('../validation');
const { isValid } = require('../utilities');
const Note = require('../models/Note');

async function addNote(ctx) {
  const { error, value } = isValid(ctx.request.body, noteSchema);

  if (error) {
    ctx.response.status = 400;
    return (ctx.body = {
      message: 'Error',
      error: error.details[0].message
    });
  }

  const note = new Note(value);
  await note.save();

  ctx.response.status = 201;
  ctx.body = {
    message: 'Success',
    note
  };
}

async function getNotes(ctx) {
  const notes = await Note.find({});

  ctx.response.status = 200;
  ctx.body = {
    message: 'Success',
    notes
  };
}

module.exports = {
  addNote,
  getNotes
};
