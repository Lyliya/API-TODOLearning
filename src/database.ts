import { ConnectionOptions } from "typeorm";

import { User, Task } from "./entity";

const config: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "",
  database: "todo",
  entities: [User, Task],
  synchronize: false,
  logging: true
};

export default config;
