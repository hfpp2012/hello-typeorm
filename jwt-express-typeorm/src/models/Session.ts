import { IsNotEmpty } from "class-validator";
import { IsUserAlreadyExist } from "../utils/validators/decorators/IsUserAlreadyExist";

export class Session {
  @IsNotEmpty()
  @IsUserAlreadyExist(true, {
    message: "User not found"
  })
  username: string;

  @IsNotEmpty()
  password: string;
}
