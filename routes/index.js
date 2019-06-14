const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const { noteSchema } = require('../validation');
const { isValid } = require('../utilities');

router.get('/', async ctx => {
  ctx.body = {
    data: 'You hit the /api endpoint'
  };
});

router.post('/notes', async ctx => {
  const { error } = isValid(ctx.request.body, noteSchema);

  if (error) {
    ctx.response.status = 400;
    return (ctx.body = {
      error: error.details[0].message
    });
  }

  ctx.body = {
    message: 'New note added'
  };
});

module.exports = router;
