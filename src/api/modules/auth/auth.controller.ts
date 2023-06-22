import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { Result, Unauthorized } from "../../../utils/response.js";
import { Job } from "../../../utils/job.js";

const authService = new AuthService();

export class AuthController {
  /* 
    ACTION: Create user
    Credentials: Username, password
    */
  async signUp(req: Request, res: Response) {}

  /* 
    ACTION: Create user
    Credentials: Username, password
    */
  async logIn(req: Request, res: Response) {
    let user: { _id: number | number } | any = req.user;
    const _id = user._id.toString();
    const { data, error } = await authService.createUserSession(
      new Job({
        id: _id,
        body: req.user,
      })
    );
    if (!!error) {
      return Unauthorized(res, {
        error,
        message: `${error || error}`,
      });
    }
    return Result(res, { data, message: "Login success" });
  }

  /* 
    ACTION: Create user
    Credentials: Username, password
    */
  async logOut(req: Request, res: Response) {}
}
