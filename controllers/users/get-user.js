const { userSchema } = require('../../validation');
const { isValid } = require('../../utilities/is-valid');
const HttpStatus = require('http-status-codes');
const User = require('../../models/User');

async function getUserById(ctx) {
  try {
    const user = await User.findById(ctx.params.id);

    if (!user) {
      ctx.response.status = HttpStatus.NOT_FOUND;
      return (ctx.body = {
        message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      });
    }

    ctx.response.status = HttpStatus.OK;
    ctx.body = {
      message: HttpStatus.getStatusText(HttpStatus.OK),
      user
    };
  } catch (error) {
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }
}

module.exports = getUserById;
