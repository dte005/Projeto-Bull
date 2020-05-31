import express from "express"
import {show} from "../controllers/bull";

const router = express.Router();

router.get('/', show);

module.exports = router;