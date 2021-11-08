import { response, Router } from "express";
import TaskController from "../controllers/task.controller";

import { userAuth } from "../middleware/auth";

const router = Router();

router.get("/", userAuth, async (req, res) => {
  try {
    const taskController = new TaskController();
    const response = await taskController.getTasks({
      where: { userId: res.locals.id }
    });
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

router.post("/", userAuth, async (req, res) => {
  try {
    const taskController = new TaskController();
    const response = await taskController.createTask(
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

router.delete("/:id", userAuth, async (req, res) => {
  try {
    const taskController = new TaskController();
    const response = await taskController.deleteTask({
      userId: Number(res.locals.id),
      id: Number(req.params.id)
    });
    res.status(200).json(response);
  } catch (e: any) {
    const status = e.status || 500;
    res.status(status).json({
      error: e.message || "Internal server error"
    });
  }
});

router.put("/:id", userAuth, async (req, res) => {
  try {
    const taskController = new TaskController();
    const response = await taskController.updateTask(
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
