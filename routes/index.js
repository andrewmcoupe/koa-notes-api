const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

router.get('/', async ctx => {
  ctx.body = {
    data: 'You hit the /api endpoint'
  };
});

router.post('/notes', async ctx => {
  ctx.body = {
    data: 'you posted'
  };
});

module.exports = router;
