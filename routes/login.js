import express from "express";
import {show, login, signup, createUser} from '../controllers/login';
import {validEmailToSignup} from '../middlewares/isEmailValidSignup';

const router = express.Router();

router.get('/', show);
router.post('/send', login);
router.get('/signup', signup);
router.post('/signup', validEmailToSignup, createUser);

module.exports = router;