const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const PORT = process.env.PORT || 8081;

const router = require('../routes');

app.use(bodyParser());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  console.log(err);
});

const server = app.listen(PORT);

module.exports = server;
