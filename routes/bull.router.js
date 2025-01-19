import express from "express"
import BullController from "../controllers/Bull.controller";
import Validation from '../middlewares/Validation';

const router = express.Router();

router.get('/', Validation.isLogged, BullController.show);
router.get('/batepapo', Validation.isLogged, BullController.batePapo);
router.get('/logout', Validation.isLogged, BullController.logout);

export default router;