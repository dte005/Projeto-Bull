import express from "express";
import {show, login} from '../controllers/login';

const router = express.Router();

router.get('/', show);
router.post('/login', login);

module.exports = router;