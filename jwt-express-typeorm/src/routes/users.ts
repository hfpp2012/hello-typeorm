import { UserController } from "../controller/UserController";

const usersRoute = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
  },
  {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "register"
  },
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login"
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
  }
];

export default usersRoute;
