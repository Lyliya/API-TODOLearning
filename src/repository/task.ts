import {
  getRepository,
  FindManyOptions,
  FindOneOptions,
  DeleteResult,
  FindConditions
} from "typeorm";
import { Task } from "../entity";
import { BadRequest } from "../errors";

export interface ITaskUpdate {
  done: boolean;
  title: string;
}

export const createTask = async (
  title: string,
  userId: number
): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = taskRepository.create({
    title,
    userId
  });
  return taskRepository.save(task);
};

export const getTasks = async (options: FindManyOptions): Promise<Task[]> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find(options);
};

export const deleteTask = async (
  options: FindConditions<Task>
): Promise<DeleteResult> => {
  const taskRepository = getRepository(Task);
  return taskRepository.delete(options);
};

export const updateTask = async (
  options: FindOneOptions<Task>,
  data: ITaskUpdate
): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(options);
  if (!task) return undefined;

  task.title = data.title;
  task.done = data.done;
  return taskRepository.save({
    ...task,
    ...data
  });
};
