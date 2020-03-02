import { Request, NextFunction } from "express";
import { Post } from "../entity/Post";
import { validate } from "class-validator";
import { throwInputError } from "../utils/throwError";

export class PostController {
  async all(_: Request) {
    return Post.find();
  }

  async one(request: Request) {
    return Post.findOne(request.params.id);
  }

  async create(req: Request, _res: Response, next: NextFunction): Promise<any> {
    try {
      const { body } = req.body;

      let post = new Post();
      post.body = body;

      const errors = await validate(post);

      if (errors.length > 0) {
        throwInputError(errors, "Post input error");
      }

      await Post.save(post);
      return post;
    } catch (e) {
      next(e);
    }
  }
}
