const { noteSchema } = require('../../validation');
const { isValid } = require('../../utilities/is-valid');
const HttpStatus = require('http-status-codes');
const Note = require('../../models/Note');

async function updateNote(ctx) {
  try {
    const update = ctx.request.body;
    const { error, value } = isValid(update, noteSchema);

    if (error) {
      ctx.response.status = HttpStatus.BAD_REQUEST;
      return (ctx.body = {
        message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
        error: error.details[0].message
      });
    }

    const note = await Note.findByIdAndUpdate(ctx.params.id, update, {
      new: true
    });

    if (!note) {
      ctx.response.status = HttpStatus.NOT_FOUND;
      return (ctx.body = {
        message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      });
    }

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

module.exports = updateNote;
