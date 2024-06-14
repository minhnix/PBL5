import * as express from "express";
import { historyController } from "../controller/historyController";
import { middleware } from "../controller/middlewareController";
const router = express.Router();

router.post(
  "/",
  historyController.uploadImage,
  middleware.addCreateAt,
  historyController.createHistory
);
router.get("/", historyController.getAllHistory);
router.get("/:id", historyController.getHistory);
router.get("/vehicles/:id", historyController.getAllHistory);
router.get("/users/:id", historyController.getAllUserHistory);
router.get("/owners/:id", historyController.getAllOwnerHistory);
router.get("/users/:id/:idVehicle", historyController.getAllVehicleUserHistory);
export default router;
