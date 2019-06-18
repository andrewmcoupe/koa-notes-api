const Router = require('koa-router');
const router = new Router({
  prefix: '/api/notes'
});

const notesController = require('../controllers/notes');

// Notes routes
router.get('/', notesController.getNotes);
router.get('/:id', notesController.getNoteById);
router.post('/', notesController.addNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
