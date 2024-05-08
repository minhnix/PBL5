import * as express from "express";
import ownerController from "../controller/ownerController";
import { middleware } from "../controller/middlewareController";

const router = express.Router();

router.post("/", middleware.addCreateAt,ownerController.createOwner);
router.patch("/:id", ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);
router.get("/", ownerController.getAllOwner);
router.get("/all/", ownerController.getAllOwners);
router.get("/total/", ownerController.getTotal);
router.get("/:id", ownerController.getOwner);

export default router;
