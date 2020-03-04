import { Entity, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Post } from "./Post";
import Base from "./Base";

@Entity("comments")
export class Comment extends Base {
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

  @ManyToOne(
    _ => Post,
    post => post.comments
  )
  @IsNotEmpty()
  post: Post;
}
