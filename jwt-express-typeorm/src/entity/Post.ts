import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
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
    _ => User,
    user => user.posts,
    { eager: true }
  )
  @IsNotEmpty()
  user: User;

  @OneToMany(
    _ => Comment,
    comment => comment.user,
    { eager: true }
  )
  comments: Comment[];
}
