const { noteSchema } = require('../../validation');
const { isValid } = require('../../utilities/is-valid');
const HttpStatus = require('http-status-codes');
const Note = require('../../models/Note');

async function addNote(ctx) {
  try {
    const { error, value } = isValid(ctx.request.body, noteSchema);

    if (error) {
      ctx.response.status = HttpStatus.BAD_REQUEST;
      return (ctx.body = {
        message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
        error: error.details[0].message
      });
    }

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

module.exports = addNote;
