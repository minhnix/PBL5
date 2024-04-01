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
    if (!req.file) return new AppError("File can not be empty", 400);
    let { url, type } = await uploadPhotoCloudinary(req.file);
    console.log(url);
    let vehicle = await AppDataSource.getRepository(Vehicle).findOneBy({
      numberPlate: req.body.numberPlate,
    });
    if (!vehicle)
      return new AppError("Cannot find vehicle with number plate", 400);
    let history = await AppDataSource.getRepository(History).save(
      new History({
        type: req.body.type == "in" ? HistoryType.IN : HistoryType.OUT,
        vehicle: Promise.resolve(vehicle),
        url_image: url,
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
    let historyPromise = AppDataSource.getRepository(History).find({
      relations: ["vehicle"],
      skip: offset,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
    let totalPromise = AppDataSource.getRepository(History)
      .createQueryBuilder("e")
      .getCount();
    let [owners, total] = await Promise.all([historyPromise, totalPromise]);
    return res.status(200).json({
      status: "success",
      total: total,
      start: offset,
      results: owners.length,
      data: {
        owners,
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
