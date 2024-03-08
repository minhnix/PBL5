import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class Owner {
  constructor(partial?: Partial<Owner>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({  nullable: false })
  phone: string;

  @Column({ })
  email: string;

  @Column()
  address: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner, {
    cascade: true,
    nullable: true,
  })
  vehicles: Promise<Owner[]>;

  @DeleteDateColumn()
  deletedAt?: Date;
}
