import * as jwt from "jsonwebtoken";
import { catchError } from "../utils/catchError";
import { AppError } from "../utils/appError";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { User } from "../entity";
import { Request, Response } from "express";
let authController = {
  signToken: (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
  decodeToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  },
  comparePassword: async (inputPassword: string, userPassword: string) => {
    return await bcrypt.compare(inputPassword, userPassword);
  },
  logIn: catchError(async function (req: Request, res: Response, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
      return next(new AppError("Please provide username and password!", 400));
    }
    let userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { username },
      relations: ["owner"],
    });

    if (
      !user ||
      !(await authController.comparePassword(password, user.password))
    ) {
      return next(new AppError("Incorrect username or password", 401));
    }

    return res.status(201).json({
      status: "success",
      token: authController.signToken(user.id, user.role),
      role: user.role,
      data: {
        user,
      },
    });
  }),
  signUp: catchError(async (req: Request, res: Response, next) => {
    let userRepository = AppDataSource.getRepository(User);

    let user = await userRepository.save(
      new User({
        username: req.body.username,
        password: await authController.hashPassword(req.body.password),
        role: req.body.role,
      })
    );
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }),
  hashPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },
};
export { authController };
