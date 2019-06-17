const HttpStatus = require('http-status-codes');
const Note = require('../../models/Note');

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

module.exports = getNotes;
