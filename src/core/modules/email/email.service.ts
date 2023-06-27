import nodemailer from "nodemailer";
import { Job } from "src/core/utils/job";
import dotev from "dotenv";

dotev.config();

export class EmailService {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  /* 
  ACTION: Send Email
  */
  async sendEmail(job: Job) {
    this.transporter.verify((err, success) => {
      if (err) console.error(err);
    });
    const mailData = job.body;
    const mailOPtions = {
      from: process.env.EMAIL_FROM,
      to: mailData?.toEmail,
      subject: mailData?.subject,
      html: mailData?.htmlBody,
    };

    try {
      const info = await this.transporter.sendMail(mailOPtions);
      return {
        data: info,
        message: "Email Send",
      };
    } catch (error) {
      console.error(error);
      return { error: { error, message: "Failed to Send Email" } };
    }
  }

  /* 
  ACTION: Send Bulk Email
  */
  async sendBulkEmail(job: Job) {}
}
