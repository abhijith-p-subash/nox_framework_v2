import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import { Job } from "src/core/utils/job";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: `${process.env.RZP_KEY_ID}`,
  key_secret: `${process.env.RZP_KEY_SECRET}`,
});

export class RazorpayService {
  /* 
  Create Order
  */
  async createOrder(job: Job): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        amount: job.body?.amount, // amount in the smallest currency unit
        currency: "INR",
        receipt: job.body?.receipt,
      };

      razorpayInstance.orders.create(options, function (err, order) {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    });
  }

  /* 
  Verify the payment 
  */
  async verifyPayment(job: Job): Promise<any> {
    return new Promise((resolve, reject) => {
      // Creating hmac object
      let hmac = crypto.createHmac("sha256", `${process.env.RZP_KEY_SECRET}`);

      // Passing the data to be hashed
      hmac.update(job.body?.order_id + "|" + job.body?.payment_id);

      // Creating the hmac in the required format
      const generated_signature = hmac.digest("hex");

      if (job.body?.razorpay_signature === generated_signature) {
        resolve({ success: true, message: "Payment has been verified" });
      } else reject({ success: false, message: "Payment verification failed" });
    });
  }
}
