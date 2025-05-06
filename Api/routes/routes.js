import express from 'express';  
const router = express.Router();
import userController from '../controller/userController.js';
import genericController from '../controller/genericConterller.js';

router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/', genericController.getAll);
router.get('/:id', genericController.get);
router.post('/', genericController.post);
router.patch('/:id', genericController.update);
router.delete('/:id', genericController.softDelete);

export default router;