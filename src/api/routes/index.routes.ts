import { Router } from "express";
import passport from "passport";
import userRouter from "./route/user.routes";
import authRouter from "./route/auth.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

export default routes;
