import { Request, NextFunction } from "express";
import { User } from "../entity/User";

export class UserController {
  async all(_: Request) {
    return User.find();
  }

  async register(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { username, password, email } = req.body;

      const user = await User.create({ username, password, email }).save();
      return user;
    } catch (e) {
      next(e);
    }
  }

  async one(request: Request) {
    return User.findOne(request.params.id);
  }

  async save(request: Request) {
    return User.save(request.body);
  }
}
