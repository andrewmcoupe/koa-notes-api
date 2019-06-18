const { userSchema } = require('../../validation');
const { isValid } = require('../../utilities/is-valid');
const HttpStatus = require('http-status-codes');
const User = require('../../models/User');

async function addUser(ctx) {
  try {
    const { error, value } = isValid(ctx.request.body, userSchema);

    if (error) {
      ctx.response.status = HttpStatus.BAD_REQUEST;
      return (ctx.body = {
        message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
        error: error.details[0].message
      });
    }

    const user = new User(value);
    await user.save();

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

module.exports = addUser;
