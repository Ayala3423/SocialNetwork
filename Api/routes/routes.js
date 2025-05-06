import express from 'express';  // שינה את require ל-import
const router = express.Router();
import userController from '../controller/userController.js';  // הוספתי .js לקובץ המיובא
import genericController from '../controller/genericConterller.js';  // הוספתי .js לקובץ המיובא

router.get('/login', userController.login);
router.get('/signup', userController.signup);

router.get('/', genericController.getAll);
router.get('/:id', genericController.get);
router.post('/', genericController.post);
router.patch('/:id', genericController.update);
router.delete('/:id', genericController.softDelete);

export default router;