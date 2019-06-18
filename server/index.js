'use strict';

const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const notes = require('../routes/notes-routes');
const users = require('../routes/user-routes');
const db = require('../db');
const errorHandler = require('../middleware/error-handler');

app.use(bodyParser());

if (!process.env.NODE_ENV == 'test') {
  app.use(logger());
}

app.use(notes.routes());
app.use(users.routes());
app.use(errorHandler());

app.on('error', (err, ctx) => {
  console.log(err);
});

const PORT = process.env.PORT || 8081;
const server = app.listen(PORT);

module.exports = { server, app };
