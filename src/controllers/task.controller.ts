import { FindConditions, FindManyOptions, FindOneOptions } from "typeorm";
import { Task } from "../entity";
import {
  createTask,
  getTasks,
  updateTask,
  ITaskUpdate,
  deleteTask
} from "../repository/task";

export default class UserController {
  public async createTask(title: string, userId: number): Promise<Task> {
    return createTask(title, userId);
  }

  public async getTasks(options: FindManyOptions): Promise<Task[]> {
    return getTasks(options);
  }

  public async updateTask(
    options: FindOneOptions<Task>,
    data: ITaskUpdate
  ): Promise<Task | undefined> {
    return updateTask(options, data);
  }

  public async deleteTask(options: FindConditions<Task>) {
    return deleteTask(options);
  }
}
