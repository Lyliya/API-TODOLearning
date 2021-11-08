import { Router } from "express";
import UserRouter from "./user.router";
import TaskRouter from "./task.router";

const router = Router();

router.use("/user", UserRouter);
router.use("/task", TaskRouter);

export default router;
