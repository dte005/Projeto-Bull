import express from "express"
import {show, batepapo, logout} from "../controllers/bull";
import {isLogged} from '../middlewares/isLogged';

const router = express.Router();

router.get('/',isLogged, show);
router.get('/batepapo', isLogged, batepapo);
router.get('/logout', isLogged, logout);

module.exports = router;