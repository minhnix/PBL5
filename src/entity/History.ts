import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./Vehicle";

export enum HistoryType {
  IN = "in",
  OUT = "out",
}

@Entity()
export class History {
  constructor(partial?: Partial<History>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: HistoryType; // out in

  @Column()
  url_image: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.history)
  vehicle: Promise<Vehicle>;
}
