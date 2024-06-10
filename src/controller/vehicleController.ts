import { Request, Response } from "express";
import { catchError } from "../utils/catchError";
import { AppDataSource } from "../data-source";
import { Owner, Vehicle } from "../entity";
import { AppError } from "../utils/appError";
import { HistoryType } from "../entity/History";
import axios from "axios";

let vehicleController = {
  createVehicle: catchError(async (req: Request, res: Response, next) => {
    let vehicleRepository = AppDataSource.getRepository(Vehicle);

    let owner = await AppDataSource.getRepository(Owner).findOneBy({
      id: req.body.idOwner,
    });

    if (!owner) {
      // return res.status(400).json({
      //   status: 400,
      //   message: "Cannot find owner by that id",
      // });
      return next(new AppError("Cannot find owner by that id", 400));
    }

    req.body.idOwner = undefined;
    let vehicle = await vehicleRepository.save(
      new Vehicle({
        ...req.body,
        owner: Promise.resolve(owner),
        status: req.body.status == "in" ? HistoryType.IN : HistoryType.OUT,
      })
    );
    vehicleController.handleNotificationVehicle()
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
    if (!vehicle) {
      return next(new AppError("Cannot find vehicle by that id", 400));
      // res.status(400).json({
      //   status: 400,
      //   message: "Cannot find vehicle by that id",
      // });
    }

    if (req.body.idOwner) {
      let owner = await AppDataSource.getRepository(Owner).findOneBy({
        id: req.body.idOwner,
      });
      if (!owner) {
        return next(new AppError("Cannot find owner by that id", 400));
        // return res.status(400).json({
        //   status: 400,
        //   message: "Cannot find owner by that id",
        // });
      }
      req.body.idOwner = undefined;
      req.body.owner = owner;
    }

    let newVehicle = new Vehicle(new Vehicle({ ...vehicle, ...req.body }));
    // if (req.body.status) {
    //   req.body.status == "in"
    //     ? (vehicle.status = HistoryType.IN)
    //     : (vehicle.status = HistoryType.OUT);
    //   console.log(vehicle);
    //   req.body.status = undefined;
    // }
    let updateVehicle = await vehicleRepository.save(newVehicle);
    console.log(updateVehicle);
    vehicleController.handleNotificationVehicle()

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
    vehicleController.handleNotificationVehicle()
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
  getVehicleByIdUser: catchError(async (req: Request, res: Response, next) => {
    let limit = +req.query.limit || 15;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;
    let vehiclesPromise = AppDataSource.getRepository(Vehicle).find({
      relations: ["owner"],
      where: {
        owner: {
          id: req.params.id,
        },
      },
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
    let totalPromise = AppDataSource.getRepository(Vehicle)
      .createQueryBuilder("vehicle")
      .leftJoin("vehicle.owner", "owner")
      .where("owner.id = :id", { id: req.params.id })
      .getCount();;

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
  getVehicleStatus: catchError(async (req: Request, res: Response, next) => {
    let totalVehiclePromise = AppDataSource.getRepository(Vehicle)
      .createQueryBuilder("e")
      .getCount();
    let totalVehicleInPromise = AppDataSource.getRepository(Vehicle)
      .createQueryBuilder("e")
      .where("e.status = :status", { status: "in" })
      .getCount();
    let [totalVehicle, totalVehicleIn] = await Promise.all([
      totalVehiclePromise,
      totalVehicleInPromise,
    ]);
    return res.status(200).json({
      total: totalVehicle,
      in: totalVehicleIn,
    });
  }),
   handleNotificationVehicle: async () => {
    try {
      axios.post("http://127.0.0.1:5000/webhook");
      axios.post("http://127.0.0.1:5001/webhook");
      console.log("OKE WEBHOOK")
    } catch (error) {
      console.log("CSKodjaiojdfsioajdioas ",error);
    }
  },
};
export { vehicleController };
