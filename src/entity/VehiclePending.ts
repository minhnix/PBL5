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
export class VehiclePending {
  constructor(partial?: Partial<VehiclePending>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  numberPlate: string;

  @Column()
  status: HistoryType;

  @ManyToOne(() => Owner, (owner) => owner.vehiclesPending)
  owner: Promise<Owner>;

  @CreateDateColumn()
  createdAt: Date;
}
