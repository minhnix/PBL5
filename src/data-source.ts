import "reflect-metadata";
import { DataSource } from "typeorm";
import { History, Owner, User, Vehicle } from "./entity";
import { VehiclePending } from "./entity/VehiclePending";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "pbl5",
  synchronize: true,
  logging: false,
  entities: [User, Vehicle, Owner, History, VehiclePending],
  migrations: [],
  subscribers: [],
});
