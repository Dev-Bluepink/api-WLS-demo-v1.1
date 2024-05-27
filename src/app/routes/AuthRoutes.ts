import * as express from "express";
const router = express.Router();
import { login, register } from "../controller/AuthController";

router.post("/register", register);
router.post("/login", login);

module.exports = router;
