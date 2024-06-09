import * as express from "express";
import { vehicleController } from "../controller/vehicleController";
import { middleware } from "../controller/middlewareController";

const router = express.Router();

router.post(
  "/",
  middleware.addCreateAt,
  middleware.handleNotificationVehicle,
  vehicleController.createVehicle
);
router.delete(
  "/:id",
  middleware.handleNotificationVehicle,
  vehicleController.deleteVehicle
);
router.get("/", vehicleController.getAllVehicle);
router.get("/user/:id", vehicleController.getVehicleByIdUser);
router.get("/status", vehicleController.getVehicleStatus);
router.get("/:id", vehicleController.getVehicle);
router.patch(
  "/:id",
  middleware.handleNotificationVehicle,
  vehicleController.updateVehicle
);

export default router;
