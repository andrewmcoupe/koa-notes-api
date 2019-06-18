const { userSchema } = require('../../validation');
const { isValid } = require('../../utilities/is-valid');
const HttpStatus = require('http-status-codes');
const User = require('../../models/User');

async function getUsers(ctx) {
  try {
    const users = await User.find({});

    ctx.response.status = HttpStatus.OK;
    ctx.body = {
      message: HttpStatus.getStatusText(HttpStatus.OK),
      users
    };
  } catch (error) {
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }
}

module.exports = getUsers;
