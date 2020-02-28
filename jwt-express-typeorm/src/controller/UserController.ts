import { Request } from "express";
import { User } from "../entity/User";

export class UserController {
  async all(_: Request) {
    return User.find();
  }

  async register(req: Request) {
    const { username, password, email } = req.body;

    return User.create({ username, password, email }).save();
  }

  async one(request: Request) {
    return User.findOne(request.params.id);
  }

  async save(request: Request) {
    return User.save(request.body);
  }
}
