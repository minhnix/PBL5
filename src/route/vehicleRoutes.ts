import * as express from "express";
import { vehicleController } from "../controller/vehicleController";

const router = express.Router();

router.post("/", vehicleController.createVehicle);
router.delete("/:id", vehicleController.deleteVehicle);
router.get("/", vehicleController.getAllVehicle);
router.get("/:id", vehicleController.getVehicle);
router.patch("/:id", vehicleController.updateVehicle);

export default router;
