import { PostController } from "../controller/PostController";

const postsRoute = [
  {
    method: "get",
    route: "/posts",
    controller: PostController,
    action: "all"
  },
  {
    method: "get",
    route: "/posts/:id",
    controller: PostController,
    action: "one"
  },
  {
    method: "post",
    route: "/posts",
    controller: PostController,
    action: "save"
  },
  {
    method: "delete",
    route: "/posts/:id",
    controller: PostController,
    action: "remove"
  }
];

export default postsRoute;
