import { Request, NextFunction } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { Session } from "./../models/Session";
import { throwInputError } from "../utils/throwError";

export class UserController {
  async all(_: Request) {
    return User.find();
  }

  async login(req: Request, _res: Response, next: NextFunction): Promise<any> {
    try {
      const { username, password } = req.body;

      let session = new Session();
      session.username = username;
      session.password = password;

      const errors = await validate(session);

      if (errors.length > 0) {
        throwInputError(errors, "User login input error");
      }

      const user = await User.findOneOrFail({ username });
      const token = user.generateToken();

      return { id: user.id, username: user.username, token };
    } catch (e) {
      next(e);
    }
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
        throwInputError(errors, "User register input error");
      }

      user.hashPassword();

      await user.save();

      const token = user.generateToken();

      return { id: user.id, username: user.username, token };
    } catch (e) {
      next(e);
    }
  }

  async one(request: Request) {
    return User.findOne(request.params.id);
  }
}
