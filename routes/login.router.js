import express from "express";
import LoginController from '../controllers/Login.controller';
import Validation from '../middlewares/Validation';

const router = express.Router();

router.get('/', LoginController.show);
router.post('/send', LoginController.login);
router.get('/signup', LoginController.signup);
router.post('/signup', Validation.validEmailToSignup, LoginController.createUser);

export default router;