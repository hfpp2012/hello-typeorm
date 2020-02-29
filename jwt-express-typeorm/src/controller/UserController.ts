import { Request, NextFunction } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";
import HttpException from "../exceptions/HttpException";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";

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
      const { username, password, confirmPassword, email } = req.body;

      let user = new User();
      user.username = username;
      user.password = password;
      user.confirmPassword = confirmPassword;
      user.email = email;

      const errors = await validate(user);

      if (errors.length > 0) {
        throw new HttpException(
          UNPROCESSABLE_ENTITY,
          "User register input error",
          errors
        );
      }

      await user.save();
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
