import express from 'express';
const router = express.Router();
import userController from '../controller/userController.js';
import genericController from '../controller/genericConterller.js';

router.route('/:table')
    .get(genericController.getAll)
    .post(genericController.post);

router.route('/:table/:id')
    .patch(genericController.update)
    .delete(genericController.softDelete);

router.route('/:baseTable/:id/:table')
    .get(genericController.getAll)
    .post(genericController.post)
    .patch(genericController.update)
    .delete(genericController.softDelete);

export default router;