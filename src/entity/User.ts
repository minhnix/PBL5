import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Owner } from "./Owner";
export enum RoleType {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  role: RoleType;

  @OneToOne(() => Owner, (owner) => owner.account, {
    cascade: true,
    nullable: true,
  })
  owner: Promise<Owner>;
}
