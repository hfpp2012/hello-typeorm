import { Request } from "express";
import { Post } from "../entity/Post";

export class PostController {
  async all(_: Request) {
    return Post.find();
  }

  async one(request: Request) {
    return Post.findOne(request.params.id);
  }

  async save(request: Request) {
    return Post.save(request.body);
  }
}
