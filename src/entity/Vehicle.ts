import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Owner } from "./Owner";
import { History } from "./History";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  numberPlate: string;

  @ManyToOne(() => Owner, (owner) => owner.vehicles)
  owner: Promise<Owner[]>;

  @OneToMany(() => History, (history) => history.vehicle)
  history: Promise<History[]>;
}
