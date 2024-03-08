import { Request, Response } from "express";
import { catchError } from "../utils/catchError";
import { AppDataSource } from "../data-source";
import { Vehicle } from "../entity";

let vehicleController = {
  createVehicle: catchError(async (req: Request, res: Response, next) => {
    let vehicleRepository = AppDataSource.getRepository(Vehicle);
    let vehicle = await vehicleRepository.save(new Vehicle({ ...req.body }));
    return res.status(200).json({
      status: "success",
      data: {
        vehicle,
      },
    });
  }),
  updateVehicle: catchError(async (req: Request, res: Response, next) => {
    let vehicleRepository = AppDataSource.getRepository(Vehicle);
    let id = req.params.id;
    let vehicle = await vehicleRepository.findOneBy({ id });
    let updateVehicle = await vehicleRepository.save(
      new Vehicle({ ...vehicle, ...req.body })
    );
    return res.status(200).json({
      status: "success",
      data: {
        vehicle: updateVehicle,
      },
    });
  }),
  deleteVehicle: catchError(async (req: Request, res: Response, next) => {
    let id = req.params.id;
    await AppDataSource.getRepository(Vehicle).softDelete(id);
    return res.status(200).json({
      status: "success",
    });
  }),
  getAllVehicle: catchError(async (req: Request, res: Response, next) => {
    let limit = +req.query.limit || 15;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;
    let vehicles = await AppDataSource.getRepository(Vehicle)
      .createQueryBuilder("e")
      .offset(offset)
      .limit(limit)
      .getMany();

    return res.status(200).json({
      status: "success",
      results: vehicles.length,
      data: {
        vehicles,
      },
    });
  }),
  getVehicle: catchError(async (req: Request, res: Response, next) => {
    let vehicle = await AppDataSource.getRepository(Vehicle).find({
      where: { id: req.params.id },
      relations: ["owner"],
    });
    res.status(200).json({
      status: "success",
      data: {
        vehicle,
      },
    });
  }),
};
export { vehicleController };
