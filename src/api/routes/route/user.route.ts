import { Router } from "express";
import { UserController } from "../../modules/user/user.controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.get("/", userController.getAll);

export default userRouter;
