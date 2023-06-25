import nodemailer from "nodemailer";
import { Job } from "src/core/utils/job";
import dotev from "dotenv";

export class EmailService {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_USERNAME,
    port: 25,
    service: process.env.EMAIL_SERVICE,
    secure: false,
    auth: {
      // user: "abhijithpsubash110@gmail.com",
      // pass: "rahwaqxxoxnyfmkg"
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  /* 
  ACTION: Send Email
  */
  async sendEmail(job: Job) {
    const mailData = job.body;
    const mailOPtions = {
      from: process.env.EMAIL_USERNAME,
      to: mailData?.email,
      subject: mailData?.subject,
      text: mailData?.mailBody,
    };

    try {
      const info = await this.transporter.sendMail(mailOPtions);
      console.log(info);
      return {
        data: info,
        message: "Email Send",
      };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  /* 
  ACTION: Send Bulk Email
  */
  async sendBulkEmail(job: Job) {}
}
