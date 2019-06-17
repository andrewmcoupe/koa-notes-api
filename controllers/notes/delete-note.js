const HttpStatus = require('http-status-codes');
const Note = require('../../models/Note');

async function deleteNote(ctx) {
  try {
    const note = await Note.findByIdAndDelete(ctx.params.id);

    if (!note) {
      ctx.response.status = HttpStatus.NOT_FOUND;
      return (ctx.body = {
        message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      });
    }

    ctx.response.status = HttpStatus.OK;
    ctx.body = {
      message: HttpStatus.getStatusText(HttpStatus.OK)
    };
  } catch (error) {
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }
}

module.exports = deleteNote;
