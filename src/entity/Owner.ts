import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./Vehicle";
import { User } from "./User";
import { VehiclePending } from "./VehiclePending";

@Entity()
export class Owner {
  constructor(partial?: Partial<Owner>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({})
  email: string;

  @Column()
  address: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner, {
    cascade: true,
    nullable: true,
    onDelete: "CASCADE",
  })
  vehicles: Promise<Vehicle[]>;

  @OneToMany(() => VehiclePending, (vehicle) => vehicle.owner, {
    cascade: true,
    nullable: true,
    onDelete: "CASCADE",
  })
  vehiclesPending: Promise<VehiclePending[]>;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.owner, { nullable: true })
  @JoinColumn()
  account: Promise<User>;
}
