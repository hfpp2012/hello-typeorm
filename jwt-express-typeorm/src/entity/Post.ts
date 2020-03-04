import { Entity, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";
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

  // @RelationId((post: Post) => post.user)
  // userId: number;
}
