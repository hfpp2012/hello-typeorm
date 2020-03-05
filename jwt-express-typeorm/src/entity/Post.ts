import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Comment } from "./Comment";
import Base from "./Base";

@Entity("posts")
export class Post extends Base {
  @Column("text")
  @IsNotEmpty()
  body: string;

  @ManyToOne(
    () => User,
    user => user.posts,
    { eager: true }
  )
  @IsNotEmpty()
  user: User;

  @OneToMany(
    () => Comment,
    comment => comment.post
  )
  comments: Comment[];

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];
}
