const { noteSchema } = require('../validation');
const { isValid } = require('../utilities/is-valid');
const HttpStatus = require('http-status-codes');
const Note = require('../models/Note');

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

async function getNoteById(ctx) {
  try {
    const note = await Note.findById(ctx.params.id);

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

module.exports = {
  addNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};
