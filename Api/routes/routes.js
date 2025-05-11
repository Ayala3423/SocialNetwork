import express from 'express';
import genericController from '../controller/genericConterller.js';
import userController from '../controller/userController.js';
import { verifyToken } from '../middleware/middleware.js'
const router = express.Router();

router.route('/login')
    .post(userController.login);
router.route('/signup')
    .post(userController.signup);

router.use(verifyToken);

router.route('/users/:userId/:table')
    .get(genericController.getAllOrByValue)
    .post(genericController.post);
router.route('/users/:userId/:table/:id')
    .patch(genericController.update)
    .delete(genericController.softDelete);
router.route('/users/:userId/:baseTable/:id/:table')
    .get(genericController.getAllOrByValue)
    .post(genericController.post)
    .patch(genericController.update)
    .delete(genericController.softDelete);

export default router;