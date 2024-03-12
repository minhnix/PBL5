import * as express from "express";
import { historyController } from "../controller/historyController";
const router = express.Router();

router.post(
  "/",
  historyController.uploadImage,
  historyController.createHistory
);

export default router;
