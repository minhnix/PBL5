import * as express from "express";
import { historyController } from "../controller/historyController";
const router = express.Router();

router.post(
  "/",
  historyController.uploadImage,
  historyController.createHistory
);
router.get("/", historyController.getAllHistory);
router.get("/:id", historyController.getHistory);
router.get("/vehicles/:id", historyController.getAllHistory);
export default router;
