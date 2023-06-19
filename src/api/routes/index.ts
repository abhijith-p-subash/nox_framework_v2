import { Router } from "express";
import userRouter from "./route/user.route.js";

const routes = Router();

routes.use("/user", userRouter);

export default routes;
