import { Router } from "express";
import userRouter from "./route/user.routes.js";
import authRouter from "./route/auth.routes.js";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/user", userRouter);

export default routes;
