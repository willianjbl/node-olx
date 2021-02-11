import express from 'express';
import AuthController from './controller/AuthController.js';
import UserController from './controller/UserController.js';
import AdController from './controller/AdController.js';
import AuthMiddleware from './middleware/AuthMiddleware.js';
import validateRequest from './validator/validateRequest.js';
import AuthValidator from './validator/AuthValidator.js';
const router = express.Router();

router.get('/ping', (req, res) => {
    res.json(validateRequest({ pong: true }));
});

router.post('/user/signin', AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

router.get('/states', UserController.getStates);
router.get('/user/me', AuthMiddleware.private, UserController.info);
router.put('/user/me', AuthMiddleware.private, UserController.editAction);

router.get('/categories', AdController.getCategories);

router.post('/ad/add', AuthMiddleware.private, AdController.addAction);
router.get('/ad/list', AdController.getList);
router.get('/ad/item', AdController.getItem);
router.post('/ad/:id', AuthMiddleware.private, AdController.editAction);

export default router;
