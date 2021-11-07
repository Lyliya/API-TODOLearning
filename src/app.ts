import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";

import dbConfig from "./database";
import router from "./router";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use(router);

createConnection(dbConfig)
  .then(() => {
    app.listen(3000, () => {
      console.log("Listen on port", 3000);
    });
  })
  .catch(e => console.log(e));
