import { Request } from "express";
import { Post } from "../entity/Post";
import { validate } from "class-validator";
import {
  throwInputError,
  throwActionNotAllowedError
} from "../utils/throwError";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";

export class PostController {
  async all(req: Request) {
    let { current, pageSize } = req.query;

    [current, pageSize] = [+current, +pageSize];

    return await Post.findAndCount({
      take: pageSize,
      skip: (current - 1) * pageSize
    });
  }

  async one(request: Request): Promise<Post> {
    return await Post.findOneOrFail(request.params.id);
  }

  async remove(req: Request) {
    const post = await Post.findOneOrFail(req.params.id);
    const currentUser = req.currentUser as User;

    if (post.user.id !== currentUser.id) {
      throwActionNotAllowedError();
    }

    await Post.remove(post);
    return { message: "deleted sucessfully" };
  }

  async update(req: Request): Promise<Post> {
    const { body } = req.body;
    const post = await Post.findOneOrFail(req.params.id);
    post.body = body;

    const currentUser = req.currentUser as User;

    const errors = await validate(post);

    if (errors.length > 0) {
      throwInputError(errors, "Post input error");
    }

    if (post.user.id !== currentUser.id) {
      throwActionNotAllowedError();
    }

    return await Post.save(post);
  }

  async create(req: Request): Promise<Post> {
    const currentUser = req.currentUser as User;
    const { body } = req.body;

    let post = new Post();
    post.body = body;
    post.user = currentUser;

    const errors = await validate(post);

    if (errors.length > 0) {
      throwInputError(errors, "Post input error");
    }

    return await Post.save(post);
  }

  /**
   * Create comment for post
   *
   * @Method POST
   * @URL /api/posts/:id/comments
   *
   */
  async createComment(req: Request): Promise<Comment> {
    const currentUser = req.currentUser as User;
    const { body } = req.body;
    const post = await Post.findOneOrFail(req.params.id);

    let comment = new Comment();
    comment.body = body;
    comment.user = currentUser;
    comment.post = post;

    const errors = await validate(comment);

    if (errors.length > 0) {
      throwInputError(errors, "Comment input error");
    }

    return await Comment.save(comment);
  }
}
