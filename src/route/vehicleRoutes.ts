import * as express from "express";
import { vehicleController } from "../controller/vehicleController";
import { middleware } from "../controller/middlewareController";

const router = express.Router();

router.post(
  "/",
  middleware.addCreateAt,
  
  vehicleController.createVehicle
);
router.delete(
  "/:id",
  
  vehicleController.deleteVehicle
);
router.get("/", vehicleController.getAllVehicle);
router.get("/user/:id", vehicleController.getVehicleByIdUser);
router.get("/status", vehicleController.getVehicleStatus);
router.get("/:id", vehicleController.getVehicle);
router.patch(
  "/:id",
  
  vehicleController.updateVehicle
);

export default router;
