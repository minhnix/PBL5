import { Request, Response } from "express";
import * as multer from "multer";
import { filterImage } from "../utils/multerFilter";
import { uploadPhotoCloudinary } from "../utils/uploadCloudinary";
import { AppError } from "../utils/appError";
import { AppDataSource } from "../data-source";
import { History, Vehicle } from "../entity";
import { HistoryType } from "../entity/History";
import { catchError } from "../utils/catchError";
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: filterImage,
});

let historyController = {
  uploadImage: upload.single("file"),
  createHistory: catchError(async function (req, res: Response, next) {
    if (!req.file) return next(new AppError("File can not be empty", 400));
    let { url, type } = await uploadPhotoCloudinary(req.file);
    console.log(url);
    let vehicle = await AppDataSource.getRepository(Vehicle).findOneBy({
      numberPlate: req.body.numberPlate,
    });
    if (!vehicle) {
      // res.status(400).json({
      //   status: 400,
      //   message: "Cannot find vehicle with number plate",
      // });
      return next(new AppError("Cannot find vehicle with number plate", 400));
    }
    // return new AppError("Cannot find vehicle with number plate", 400);
    let history = await AppDataSource.getRepository(History).save(
      new History({
        createdAt: req.body.createdAt,
        type: req.body.typeStatus == "in" ? HistoryType.IN : HistoryType.OUT,
        vehicle: Promise.resolve(vehicle),
        url_image: url,
      })
    );
    await AppDataSource.getRepository(Vehicle).save(
      new Vehicle({
        ...vehicle,
        status: req.body.typeStatus == "in" ? HistoryType.IN : HistoryType.OUT,
      })
    );

    return res.status(201).json({
      status: "success",
      data: {
        history,
      },
    });
  }),
  getAllHistory: catchError(async function (req: Request, res: Response, next) {
    let limit = +req.query.limit || 15;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;
    let filter = {};
    const id = req.params.id;
    // if (req.params.id) {
    //   filter = {
    //     vehicle: {
    //       id: req.params.id,
    //     },
    //   };
    // }
    // let historyPromise = AppDataSource.getRepository(History).find({
    //   where: filter,
    //   relations: ["vehicle"],
    //   skip: offset,
    //   take: limit,
    //   order: {
    //     createdAt: "DESC",
    //   },
    // });
    let historyQueryBuilder = AppDataSource.getRepository(History)
      .createQueryBuilder("history")
      .leftJoinAndSelect("history.vehicle", "vehicle")
      .skip(offset)
      .take(limit)
      .orderBy("history.createdAt", "DESC");

    if (id) {
      historyQueryBuilder.andWhere("vehicle.id = :id", { id });
    } else {
      if (req.query.search) {
        historyQueryBuilder = historyQueryBuilder.where(
          "vehicle.numberPlate LIKE :searchTerm",
          { searchTerm: `%${req.query.search}%` }
        );
      }
      if (req.query.searchDate) {
        historyQueryBuilder = historyQueryBuilder.where(
          "history.createdAt LIKE :searchDate",
          { searchDate: `%${req.query.searchDate}%` }
        );
      }
    }
    let historyPromise = historyQueryBuilder.getMany();

    let totalQueryBuilder;
    if (req.params.id) {
      totalQueryBuilder = AppDataSource.getRepository(History)
        .createQueryBuilder("e")
        .where("e.vehicle.id = :id", { id: req.params.id });
    } else {
      totalQueryBuilder = AppDataSource.getRepository(History)
        .createQueryBuilder("e")
        .leftJoinAndSelect("e.vehicle", "vehicle");

      if (req.query.search) {
        totalQueryBuilder = totalQueryBuilder.where(
          "vehicle.numberPlate LIKE :searchTerm",
          { searchTerm: `%${req.query.search}%` }
        );
      }
      if (req.query.searchDate) {
        totalQueryBuilder = totalQueryBuilder.where(
          "e.createdAt LIKE :searchDate",
          { searchDate: `%${req.query.searchDate}%` }
        );
      }
    }

    let totalPromise = totalQueryBuilder.getCount();

    let [history, total] = await Promise.all([historyPromise, totalPromise]);
    return res.status(200).json({
      status: "success",
      total: total,
      start: offset,
      results: history.length,
      data: {
        history,
      },
    });
  }),
  getAllVehicleUserHistory: catchError(async function (
    req: Request,
    res: Response,
    next
  ) {
    let limit = +req.query.limit || 15;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;
    let filter = {};
    let vehicleId = req.params.idVehicle;
    if (req.params.id) {
      filter = {
        vehicle: {
          id: vehicleId,
          owner: {
            account: {
              id: req.params.id,
            },
          },
        },
      };
    }
    let historyPromise = AppDataSource.getRepository(History).find({
      where: filter,
      relations: ["vehicle", "vehicle.owner", "vehicle.owner.account"],
      skip: offset,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
    let totalPromise;
    if (req.params.id) {
      totalPromise = AppDataSource.getRepository(History)
        .createQueryBuilder("e")
        .leftJoin("e.vehicle", "vehicle")
        .leftJoin("vehicle.owner", "owner")
        .leftJoin("owner.account", "account")
        .where("account.id = :id", { id: req.params.id })
        .andWhere("vehicle.id = :vehicleId", { vehicleId })
        .getCount();
    }
    let [history, total] = await Promise.all([historyPromise, totalPromise]);
    return res.status(200).json({
      status: "success",
      total: total,
      start: offset,
      results: history.length,
      data: {
        history,
      },
    });
  }),
  getAllUserHistory: catchError(async function (
    req: Request,
    res: Response,
    next
  ) {
    let limit = +req.query.limit || 15;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;
    let filter = {};
    if (req.params.id) {
      filter = {
        vehicle: {
          owner: {
            account: {
              id: req.params.id,
            },
          },
        },
      };
    }
    let historyPromise = AppDataSource.getRepository(History).find({
      where: filter,
      relations: ["vehicle", "vehicle.owner", "vehicle.owner.account"],
      skip: offset,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
    let totalPromise;
    if (req.params.id) {
      totalPromise = AppDataSource.getRepository(History)
        .createQueryBuilder("e")
        .leftJoin("e.vehicle", "vehicle")
        .leftJoin("vehicle.owner", "owner")
        .leftJoin("owner.account", "account")
        .where("account.id = :id", { id: req.params.id })
        .getCount();
    }
    let [history, total] = await Promise.all([historyPromise, totalPromise]);
    return res.status(200).json({
      status: "success",
      total: total,
      start: offset,
      results: history.length,
      data: {
        history,
      },
    });
  }),

  getHistory: catchError(async function (req: Request, res: Response, next) {
    let history = await AppDataSource.getRepository(History).find({
      where: { id: req.params.id },
      relations: ["vehicle", "vehicle.owner"],
      withDeleted: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        history,
      },
    });
  }),
};
export { historyController };
