import { IsNotEmpty } from "class-validator";

export class Session {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
