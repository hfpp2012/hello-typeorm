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
  confirmPassword: string;

  @Column("text")
  @IsNotEmpty()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
