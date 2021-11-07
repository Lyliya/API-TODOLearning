import * as jwt from "jsonwebtoken";
import { User, Task } from "../entity";
import { BadRequest } from "../errors";
import { getUser, getUserByName, createUser } from "../repository/user";
import { ITaskUpdate } from "../repository/task";
import TaskController from "./task.controller";
import config from "../config";
import { DeleteResult, FindOneOptions } from "typeorm";

export interface ILogin {
  user: User;
  access_token: string;
}

export default class UserController {
  public async createUser(username: string, password: string): Promise<User> {
    return createUser(username, password);
  }
  public async getUser(id: number): Promise<User | undefined> {
    return getUser(id);
  }

  public async logUser(username: string, password: string): Promise<ILogin> {
    const user = await getUserByName(username);
    if (!user) throw new BadRequest("Invalid username");

    if (user.password == password) {
      return {
        user,
        access_token: jwt.sign({ id: user.id }, config.JWT_SECRET)
      };
    } else {
      throw new BadRequest("Invalid password");
    }
  }

  public async createUserTask(
    title: string,
    userId: number
  ): Promise<Task | undefined> {
    const taskController = new TaskController();
    return taskController.createTask(title, userId);
  }

  public async updateTask(
    options: FindOneOptions<Task>,
    data: ITaskUpdate
  ): Promise<Task | undefined> {
    const taskController = new TaskController();
    return taskController.updateTask(options, data);
  }

  public async deleteUserTask(
    userId: number,
    taskId: number
  ): Promise<DeleteResult> {
    const taskController = new TaskController();
    return taskController.deleteTask({ userId, id: taskId });
  }
}
