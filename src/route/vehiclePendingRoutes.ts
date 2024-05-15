import * as express from "express";
import { vehiclePendingController } from "../controller/vehiclePendingController";
import { middleware } from "../controller/middlewareController";

const router = express.Router();

router.post(
  "/",
  middleware.addCreateAt,
  vehiclePendingController.createVehicle
);
router.delete("/:id", vehiclePendingController.deleteVehicle);
router.post("/approve/:id", vehiclePendingController.approveVehicle);
router.get("/", vehiclePendingController.getAllVehicle);
router.get("/user/:id", vehiclePendingController.getVehicleByIdUser);
// router.get("/status", vehicleController.getVehicleStatus);
router.get("/:id", vehiclePendingController.getVehicle);
// router.patch("/:id", vehicleController.updateVehicle);

export default router;
