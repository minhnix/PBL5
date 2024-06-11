import {} from "typeorm";
import { AppDataSource } from "../data-source";
import { Owner } from "../entity/Owner";
import { Request, Response } from "express";
import { catchError } from "../utils/catchError";
import { AppError } from "../utils/appError";

let ownerController = {
  createOwner: catchError(async (req: Request, res: Response) => {
    let { name, phone, email, address, createdAt } = req.body;
    let user = await AppDataSource.getRepository(Owner).save(
      new Owner({ name, phone, email, address, createdAt })
    );
    res.status(200).json({
      status: "success",
      data: { user },
    });
  }),
  updateOwner: catchError(async (req: Request, res: Response, next) => {
    let id = req.params.id;
    let owner = await AppDataSource.getRepository(Owner).findOneBy({ id });
    if (!owner) {
      return next(new AppError("Cannot find owner by that id", 400));
      // res.status(400).json({
      //   status: 400,
      //   message: "Cannot find owner by that id",
      // });
    }
    let newOwner = await AppDataSource.getRepository(Owner).save(
      new Owner({ ...owner, ...req.body })
    );
    return res.status(200).json({
      status: "success",
      data: {
        user: newOwner,
      },
    });
  }),
  deleteOwner: catchError(async (req: Request, res: Response) => {
    let owner = await AppDataSource.getRepository(Owner).findOne({
      where: { id: req.params.id },
      relations: ["vehicles"],
    });
    await AppDataSource.getRepository(Owner).softRemove(owner);
    res.status(200).json({
      status: "success",
    });
  }),
  getAllOwner: catchError(async (req: Request, res: Response, next) => {
    let limit = +req.query.limit || 15;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;
    let ownersQueryBuilder = AppDataSource.getRepository(Owner)
      .createQueryBuilder("e")
      .loadRelationCountAndMap("e.vehiclesCount", "e.vehicles");
    let totalQueryBuilder =
      AppDataSource.getRepository(Owner).createQueryBuilder("e");
    // .getCount();
    if (req.query.search) {
      ownersQueryBuilder = ownersQueryBuilder.where(
        "e.name LIKE :searchTerm OR e.address LIKE :searchTerm OR e.email LIKE :searchTerm OR e.phone LIKE :searchTerm",
        { searchTerm: `%${req.query.search}%` }
      );

      totalQueryBuilder = totalQueryBuilder.where(
        "e.name LIKE :searchTerm OR e.address LIKE :searchTerm OR e.email LIKE :searchTerm OR e.phone LIKE :searchTerm",
        { searchTerm: `%${req.query.search}%` }
      );
    }
    let totalPromise = totalQueryBuilder.getCount();
    let ownersPromise = ownersQueryBuilder
      .orderBy("e.createdAt", "DESC")
      .offset(offset)
      .limit(limit)
      .getMany();

    let [owners, total] = await Promise.all([ownersPromise, totalPromise]);
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
  getOwner: catchError(async (req: Request, res: Response, next) => {
    let id = req.params.id;
    let owner = await AppDataSource.getRepository(Owner).find({
      where: { id },
      relations: ["vehicles"],
    });

    res.status(200).json({
      status: "success",
      data: {
        owner,
      },
    });
  }),
  getAllOwners: catchError(async (req: Request, res: Response, next) => {
    let owners = await AppDataSource.getRepository(Owner).find({});
    return res.status(200).json({
      status: "success",
      data: {
        owners,
      },
    });
  }),
  getTotal: catchError(async (req: Request, res: Response, next) => {
    let total = await AppDataSource.getRepository(Owner)
      .createQueryBuilder("e")
      .getCount();
    return res.status(200).json({
      total: total,
    });
  }),
  addVehicle: catchError(async (req: Request, res: Response, next) => {}),
};

export default ownerController;
