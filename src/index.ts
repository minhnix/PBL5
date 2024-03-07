import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import ownerRoutes from "./route/ownerRoutes";
import userRoutes from "./route/userRoutes";
import "reflect-metadata";
import { AppError } from "./utils/appError";
dotenv.config();

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;

app.use("/api/owners", ownerRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
