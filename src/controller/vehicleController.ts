import { Request, Response } from "express";
import { catchError } from "../utils/catchError";
import { AppDataSource } from "../data-source";
import { Owner, Vehicle } from "../entity";
import { AppError } from "../utils/appError";

let vehicleController = {
  createVehicle: catchError(async (req: Request, res: Response, next) => {
    let vehicleRepository = AppDataSource.getRepository(Vehicle);
    let owner = await AppDataSource.getRepository(Owner).findOneBy({
      id: req.body.idOwner,
    });
    if (!owner) return new AppError("Cannot find owner by that id", 400);
    req.body.idOwner = undefined;
    let vehicle = await vehicleRepository.save(
      new Vehicle({ ...req.body, owner: Promise.resolve(owner) })
    );
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
    if (req.body.idOwner) {
      let owner = await AppDataSource.getRepository(Owner).findOneBy({
        id: req.body.idOwner,
      });
      req.body.idOwner = undefined;
      req.body.owner = owner;
    }

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
    let vehiclesPromise = AppDataSource.getRepository(Vehicle).find({
      relations: ["owner"],
      skip: offset,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
    // let vehiclesPromise = AppDataSource.getRepository(Vehicle)
    //   .createQueryBuilder("e")
    //   .leftJoinAndSelect("e.owner", "owner")
    //   .offset(offset)
    //   .limit(limit)
    //   .getMany();
    let totalPromise = AppDataSource.getRepository(Vehicle).count({});

    let [vehicles, total] = await Promise.all([vehiclesPromise, totalPromise]);
    return res.status(200).json({
      status: "success",
      total: total,
      start: offset,
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
      withDeleted: true,
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
