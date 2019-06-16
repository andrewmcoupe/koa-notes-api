const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const notesController = require('../controllers/notes-controller');

router.get('/notes', notesController.getNotes);
router.post('/notes', notesController.addNote);

module.exports = router;
