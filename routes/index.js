const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const notesController = require('../controllers/notes');

router.get('/notes', notesController.getNotes);
router.get('/notes/:id', notesController.getNoteById);
router.post('/notes', notesController.addNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;
