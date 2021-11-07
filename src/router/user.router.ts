import { response, Router } from "express";
import UserController from "../controllers/user.controller";

import { userAuth } from "../middleware/auth";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Invalid request");

    const userController = new UserController();
    const response = await userController.createUser(username, password);
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Invalid request");

    const userController = new UserController();
    const response = await userController.logUser(username, password);
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

router.get("/", userAuth, async (req, res) => {
  try {
    console.log("Request user:", res.locals.id);
    const userController = new UserController();
    const response = await userController.getUser(Number(res.locals.id));
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userController = new UserController();
    const response = await userController.getUser(Number(req.params.id));
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

router.post("/task", userAuth, async (req, res) => {
  try {
    const userController = new UserController();
    const response = await userController.createUserTask(
      req.body.title,
      res.locals.id
    );
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

router.put("/task/:id", userAuth, async (req, res) => {
  try {
    const userController = new UserController();
    const response = await userController.updateTask(
      {
        where: { id: Number(req.params.id), userId: Number(res.locals.id) }
      },
      {
        title: req.body.title,
        done: req.body.done
      }
    );
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

export default router;
