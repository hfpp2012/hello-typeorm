import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import { User } from "./entity/User";

createConnection()
  .then(async connection => {
    const app = express();

    app.use(express.json());

    app.get("/", async function(_: Request, res: Response) {
      const users = await connection.manager.find(User);
      res.json({ users });
    });

    app.listen("6060");

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.username = "Timber";
    // user.password = "Saw";
    // user.email = "222@qq.com";
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch(error => console.log(error));
