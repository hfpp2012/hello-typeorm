import { Entity, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";
import Base from "./Base";
import { Post } from "./Post";

@Entity("comments")
export class Comment extends Base {
  @Column("text")
  @IsNotEmpty()
  body: string;

  @ManyToOne(
    _ => User,
    user => user.comments
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
