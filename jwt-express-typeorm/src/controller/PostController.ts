import { Request } from "express";
import { Post } from "../entity/Post";
import { validate } from "class-validator";
import { throwInputError } from "../utils/throwError";
import { User } from "../entity/User";

export class PostController {
  async all(req: Request) {
    let { current, pageSize } = req.query;

    [current, pageSize] = [+current, +pageSize];

    return await Post.findAndCount({
      take: pageSize,
      skip: (current - 1) * pageSize
    });
  }

  async one(request: Request) {
    return await Post.findOneOrFail(request.params.id);
  }

  async create(req: Request): Promise<any> {
    const user = req.currentUser as User;
    const { body } = req.body;

    let post = new Post();
    post.body = body;
    post.user = user;

    const errors = await validate(post);

    if (errors.length > 0) {
      throwInputError(errors, "Post input error");
    }

    return await Post.save(post);
  }
}
