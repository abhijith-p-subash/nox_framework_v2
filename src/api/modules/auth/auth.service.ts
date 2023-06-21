import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "../user/user.service.js";
import { JWTService } from "./jwt/jwt.service.js";
import { User } from "../user/entities/user.entity.js";
import { Job } from "../../../utils/job.js";

const userService = new UserService(User);
// const loginLogService = new LoginLogService(LoginLogModel);
const jwtService = new JWTService();
// const emailService = new emailService();

export class AuthService {
  async createSession() {}

  async createUserSession(job: Job) {
    const id: { id: number } | any = job.id;
    const jobBody = (job as { body: any }).body;
    const { data, error } = await userService.findById(
      new Job({
        action: "findById",
        id: +id,
      })
    );
    if (!!error) {
      return { error: "Account does not exist" };
    } else {
      if (!data.active) {
        return { error: "Account is inactive" };
      }
      const token = await jwtService.createToken(id, "1h");
      const refreshToken = await jwtService.createRefreshToken(id);

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
