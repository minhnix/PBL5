import * as express from "express";
import { authController } from "../controller/authController";

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);

export default router;
