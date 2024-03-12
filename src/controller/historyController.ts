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
  createHistory: catchError(async function (req, res, next) {
    if (!req.file) return new AppError("File can not be empty", 400);
    let { url, type } = await uploadPhotoCloudinary(req.file);
    let vehicle = await AppDataSource.getRepository(Vehicle).findOneBy({
      numberPlate: req.body.numberPlate,
    });
    // if (!vehicle)
    //   return new AppError("Cannot find vehicle with number plate", 400);
    let history = await AppDataSource.getRepository(History).save(
      new History({
        type: HistoryType.IN,
        // vehicle: Promise.resolve(vehicle),
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
};
export { historyController };
