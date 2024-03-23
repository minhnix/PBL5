import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Owner } from "./Owner";
import { History, HistoryType } from "./History";

@Entity()
export class Vehicle {
  constructor(partial?: Partial<Vehicle>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  numberPlate: string;

  @Column()
  status: HistoryType;

  @ManyToOne(() => Owner, (owner) => owner.vehicles)
  owner: Promise<Owner[]>;

  @OneToMany(() => History, (history) => history.vehicle)
  history: Promise<History[]>;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
