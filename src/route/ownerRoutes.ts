import * as express from "express";
import ownerController from "../controller/ownerController";

const router = express.Router();

router.post("/", ownerController.createOwner);
router.patch("/:id", ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);
router.get("/", ownerController.getAllOwner);
router.get("/:id", ownerController.getOwner);

export default router;
