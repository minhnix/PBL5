import {} from "typeorm";
import { AppDataSource } from "../data-source";
import { Owner } from "../entity/Owner";
import { Request, Response } from "express";
import { catchError } from "../utils/catchError";

let ownerController = {
  createOwner: catchError(async (req: Request, res: Response) => {
    let { name, phone, email, address } = req.body;
    let user = await AppDataSource.getRepository(Owner).save(
      new Owner({ name, phone, email, address })
    );
    res.status(200).json({
      status: "success",
      data: { user },
    });
  }),
  updateOwner: catchError(async (req: Request, res: Response) => {
    let id = req.params.id;
    let owner = await AppDataSource.getRepository(Owner).findOneBy({ id });
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
    await AppDataSource.getRepository(Owner).softDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  }),
  getAllOwner: catchError(async (req: Request, res: Response, next) => {
    let limit = +req.query.limit || 15;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;
    console.log(page, limit, offset);
    let owners = await AppDataSource.getRepository(Owner)
      .createQueryBuilder("e")
      .loadRelationCountAndMap("e.vehiclesCount", "e.vehicles")
      .offset(offset)
      .limit(limit)
      .getMany();

    return res.status(200).json({
      status: "success",
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
};

export default ownerController;
