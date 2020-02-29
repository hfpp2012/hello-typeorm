import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Index
} from "typeorm";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsEqual } from "../utils/validators/decorators/IsEqual";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEqual("password", { message: "Passwords must match" })
  confirmPassword: string;

  @Column("text")
  @IsNotEmpty()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
