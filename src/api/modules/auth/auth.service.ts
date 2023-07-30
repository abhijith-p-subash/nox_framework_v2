import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ejs from "ejs";
import { UserService } from "../user/user.service";
import { JWTService } from "./jwt/jwt.service";
import { Job } from "../../../core/utils/job";
import { User } from "../user/entities/user.model";
import { EmailService } from "../../../core/modules/email/email.service";
import { LoginLogService } from "../loginLog/loginLog.service";
import { LoginLogModel } from "../loginLog/entity/loginLog.model";

const userService = new UserService(User);
const loginLogService = new LoginLogService(LoginLogModel);
const jwtService = new JWTService();
const emailService = new EmailService();

export class AuthService {
  async createSession() {}

  /* 
  
  ACTION: Register user
  */
  async registerUser(job: Job) {
    const { data, error } = await userService.create(
      new Job({
        action: "create",
        body: {
          uid: uuidv4(),
          ...job.body?.user,
        },
      })
    );
    if (!!error) {
      return { error, message: error.message };
    }
    const {
      data: sndEmailRes,
      message,
      error: sndEmailErr,
      status,
      verificationToken,
    } = await this.sendVerificationEmail(
      new Job({
        id: data.id,
        body: {
          protocol: job.body?.httpData.protocol,
          host: job.body?.httpData.host,
          toEmail: data.email,
        },
      })
    );

    if (!!sndEmailErr) {
      return {
        error: sndEmailErr,
        message: "Verification Email failed to Send",
      };
    }

    return { data, verificationToken, status, message };
  }

  /* 
  ACTION: Create User Session
  */
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

      const loginLogs = await loginLogService.create(
        new Job({
          action: "create",
          body: {
            user_name: data.name,
            user_id: _id,
          },
        })
      );

      if (loginLogs.error)
        return { error: true, message: "Failed to register Login Logs" };

      return {
        error: false,
        data: { token, refreshToken, user: data },
      };
    }
  }

  /* 
  ACTION: Send Verification email to the user
  */
  async sendVerificationEmail(job: Job) {
    try {
      const template = fs.readFileSync("views/verification_email.ejs", "utf-8");
      const OTP = Math.floor(100000 + Math.random() * 90000),
        verificationToken = await jwtService.createToken(
          job.id || "",
          "10m",
          `${OTP}`
        ),
        protocol = job.body?.protocol,
        host = job.body?.host,
        verificationLink = `${protocol}://${host}/auth/email-verification/${verificationToken}`,
        htmlBody = ejs.render(template, {
          otp: OTP,
          verificationLink: verificationLink,
        }),
        emailJob = new Job({
          action: "sendMail",
          payload: {
            toEmail: job.body?.toEmail,
          },
          body: {
            subject: "NOEX Framework Account Verification Required",
            OTP: OTP,
            link: verificationLink,
            toEmail: job.body?.toEmail,
            htmlBody,
          },
        });
      const { data, message, error } = await emailService.sendEmail(emailJob);
      if (error) {
        return { error: error, status: 404, message: "Failed to send email" };
      }
      return {
        data: { ...data, verificationToken },
        verificationToken,
        message,
      };
    } catch (error) {
      return { error: error, status: 404, message: "Failed to send email" };
    }
  }

  /* 
  ACTION: Email Verification
  */
  async emailVerification(job: Job) {
    try {
      let jwtPayLoad = await jwtService.verifyToken(
        job.body?.token,
        job.body?.otp
      );
      let tokenVerifi = jwtPayLoad as JwtPayload;
      const { data, error } = await userService.update(
        new Job({
          action: "update",
          id: tokenVerifi.userId,
          body: {
            verified: true,
          },
        })
      );

      if (error) {
        return error;
      }
      return { data };
    } catch (error) {
      return { error };
    }
  }
}
