import { Router, Request, Response } from "express";
import passport from "passport";
import { UserController } from "../../modules/user/user.controller";
import { AuthController } from "../../modules/auth/auth.controller";

const authRouter = Router();
const userController = new UserController();
const authController = new AuthController();

authRouter.post("/signup", authController.signUp);

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.logIn
);

authRouter.get("/logout", authController.logOut);

// authRouter.post(
//   "/send-verification-email/:id",
//   authController.sendVerificationEmail
// );
// authRouter.get("/email-verification/:token", authController.emailVerification);

// authRouter.get(
//   "/test-security",
//   passport.authenticate("jwt", { session: false }),
//   authController.testSecurity
// );

export default authRouter;
