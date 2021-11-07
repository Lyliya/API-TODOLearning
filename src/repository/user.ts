import { getRepository } from "typeorm";
import { User } from "../entity";

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  const userRepository = getRepository(User);
  const user = userRepository.create({
    username,
    password
  });
  return userRepository.save(user);
};

export const getUser = async (id: number): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ where: { id }, relations: ["tasks"] });
};

export const getUserByName = async (
  username: string
): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({
    where: { username },
    select: ["id", "username", "password"]
  });
};
