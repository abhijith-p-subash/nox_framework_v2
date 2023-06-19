import { Request, Response } from "express";
import { UserModel } from "./entities/user.entity.js";
import { UserService } from "./user.service.js";
import { Job } from "../../../utils/job.js";
import { ValidationError } from "../../../utils/errors.js";
import {
  BadRequest,
  Created,
  ErrorResponse,
  Result,
} from "../../../utils/response.js";
import { queryValidation } from "../../../utils/validation.js";

export class UserController {
  userService: UserService;
  // constructor(private userService = new UserService(UserModel)) {
  //   userService;
  // }
  constructor() {
    this.userService = new UserService(UserModel);
  }

  /**
   * Create User
   */
  async create(req: Request, res: Response) {
    const { data, error } = await this.userService.create(
      new Job({
        action: "create",
        body: {
          ...req.body,
        },
      })
    );

    if (!!error) {
      if (error instanceof ValidationError) {
        return BadRequest(res, {
          error,
          message: error.message,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { user: data }, message: "Created" });
  }

  /**
   * Return all Users list
   */
  async getAll(req: Request, res: Response) {
    const resp = await this.userService.testApi();
    console.log("kkkkkkkkkkkkkkk");
    res.send(resp);

    // const { data, count, limit, offset, error } =
    //   await this.userService.findAll(
    //     new Job({
    //       action: "findAll",
    //       options: {
    //         ...queryValidation(req.query),
    //       },
    //     })
    //   );
    // if (!!error) {
    //   return ErrorResponse(res, {
    //     error,
    //     message: `${error.message || error}`,
    //   });
    // }
    // return Result(res, {
    //   data: { user: data, count, limit, offset },
    //   message: "Ok",
    // });
  }
}
