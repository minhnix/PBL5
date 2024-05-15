import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { Request, Response } from "express";
import ownerRoutes from "./route/ownerRoutes";
import userRoutes from "./route/userRoutes";
import vehicleRoutes from "./route/vehicleRoutes";
import vehiclePendingRoutes from "./route/vehiclePendingRoutes";
import historyRoutes from "./route/historyRoutes";
import "reflect-metadata";
import { AppError } from "./utils/appError";
import { errorController } from "./controller/errorController";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const { PORT = 3000 } = process.env;

app.use("/api/owners", ownerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/vehiclesPending", vehiclePendingRoutes);
app.use("/api/history", historyRoutes);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController.handleError);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
