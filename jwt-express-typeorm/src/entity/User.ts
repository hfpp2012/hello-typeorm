import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Index,
  OneToMany
} from "typeorm";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsEqual } from "../utils/validators/decorators/IsEqual";
import { IsUserAlreadyExist } from "../utils/validators/decorators/IsUserAlreadyExist";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { Post } from "./Post";
import { JwtPayload } from "../types/Jwt";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  @IsNotEmpty()
  @MinLength(6)
  @IsUserAlreadyExist(false, {
    message: "User $value already exists. Choose another name."
  })
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

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  generateToken() {
    const payload: JwtPayload = { id: this.id, username: this.username };
    return jwt.sign(payload, config.auth.secretKey, {
      expiresIn: "5d"
    });
  }

  @OneToMany(
    _ => Post,
    post => post.user
  )
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
