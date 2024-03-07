import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./Vehicle";

export enum HistoryType {
  IN = "in",
  OUT = "out",
}

@Entity()
export class History {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: HistoryType; // out in

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.history)
  vehicle: Promise<Vehicle>;
}
