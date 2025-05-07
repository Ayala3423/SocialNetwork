import express from 'express';  
const router = express.Router();
import userController from '../controller/userController.js';
import genericController from '../controller/genericConterller.js';

router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/:table', genericController.getAll);
router.get('/:table/:id', genericController.get);
router.post('/:table/', genericController.post);
router.patch('/:table/:id', genericController.update);
router.delete('/:table/:id', genericController.softDelete);

export default router;