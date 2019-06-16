const { noteSchema } = require('../validation');
const { isValid } = require('../utilities/is-valid');
const HttpStatus = require('http-status-codes');
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

  try {
    const note = new Note(value);
    await note.save();

    ctx.response.status = HttpStatus.OK;
    ctx.body = {
      message: HttpStatus.getStatusText(HttpStatus.OK),
      note
    };
  } catch (error) {
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }
}

async function getNotes(ctx) {
  try {
    const notes = await Note.find({});

    ctx.response.status = HttpStatus.OK;
    ctx.body = {
      message: HttpStatus.getStatusText(HttpStatus.OK),
      notes
    };
  } catch (error) {
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }
}

module.exports = {
  addNote,
  getNotes
};
