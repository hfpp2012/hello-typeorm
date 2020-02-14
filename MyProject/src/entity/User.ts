import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("users")
export class User {
  // @PrimaryGeneratedColumn("uuid")
  // id: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  username: string;

  @Column()
  email: string;

  @Column("text")
  password: string;

  @Column("decimal", { precision: 8, scale: 2, default: 0.0 })
  money: number;

  @Column("boolean", { default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
