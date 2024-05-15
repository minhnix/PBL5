import * as express from "express";
import { authController } from "../controller/authController";

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);
router.get("/:id", authController.getAccount);
router.post("/:id", authController.updateAccount);

export default router;
