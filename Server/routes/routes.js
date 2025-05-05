const express = require('express');
const router = express.Router();
const {signup, login, getAll, get, post, update, softDelete} = require('../controller/controller');

router.get('/login', login);
router.get('/signup', signup);
router.get('/', getAll);
router.get('/:id', get);
router.post('/', post);
router.patch('/:id', update);
router.delete('/:id', softDelete);

module.exports = router;