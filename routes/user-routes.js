const Router = require('koa-router');
const router = new Router({
  prefix: '/api/users'
});

const usersController = require('../controllers/users');

// User routes
router.post('/', usersController.addUser);
router.get('/', usersController.getUsers);

module.exports = router;
