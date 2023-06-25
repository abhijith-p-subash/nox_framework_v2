import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "../user/user.service";
import { JWTService } from "./jwt/jwt.service";
import { Job } from "../../../core/utils/job";
import { UserModel } from "../user/entities/user.entity";

const userService = new UserService(UserModel);
// const loginLogService = new LoginLogService(LoginLogModel);
const jwtService = new JWTService();
// const emailService = new emailService();

export class AuthService {
  async createSession() {}

  async createUserSession(job: Job) {
    const _id: { _id: string } | any = job.id;
    const jobBody = (job as { body: any }).body;
    const { data, error } = await userService.findById(
      new Job({
        action: "findById",
        id: _id,
      })
    );
    if (!!error) {
      return { error: "Account does not exist" };
    } else {
      if (!data.active) {
        return { error: "Account is inactive" };
      }
      const token = await jwtService.createToken(_id, "1h");
      const refreshToken = await jwtService.createRefreshToken(_id);

      //   const loginLogs = await loginLogService.create(
      //     new Job({
      //       action: "create",
      //       body: {
      //         name: jobBody.full_name,
      //         user_id: +id,
      //       },
      //     })
      //   );

      //   if (loginLogs.error)
      //     return { error: true, message: "Failed to register Login Logs" };

      return {
        error: false,
        data: { token, refreshToken, user: data },
      };
    }
  }
}
