const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/noteController');

router.post('/', auth, ctrl.createNote);
router.get('/', auth, ctrl.getNotes);
router.get('/:id', auth, ctrl.getNoteById);
router.put('/:id', auth, ctrl.updateNote);
router.delete('/:id', auth, ctrl.deleteNote);

module.exports = router;
