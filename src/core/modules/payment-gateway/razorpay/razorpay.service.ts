import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import { Job } from "src/core/utils/job";

dotenv.config();

const rzp = new Razorpay({
  key_id: `${process.env.RZP_KEY_ID}`,
  key_secret: `${process.env.RZP_KEY_SECRET}`,
});

export class RazorpayService {
  // --------------------//
  // Payments            //
  // --------------------//

  /* 
  Get All Payments
  */
  async getAllPayments(job: Job): Promise<any> {
    return new Promise((resolve, reject) => {
      rzp.payments.all(
        {
          from: job.options?.where.from_date, //'Aug 25, 2023',
          to: job.options?.where.to_date, //'Aug 30, 2023',
        },
        function (data, err) {
          if (err) {
            reject({
              error: true,
              message: "Failed to get all payments",
              data: err,
            });
          } else {
            resolve({ error: false, message: "Get all Pyaments", data: data });
          }
        }
      );
    });
  }

  /* 
  Get a particular payment
  */
  async get(job: Job): Promise<any> {
    return new Promise((resolve, reject) => {
      rzp.payments
        .fetch(job.options?.where?.id)
        .then((data) => {
          resolve({
            error: false,
            message: "Get particular Pyaments",
            data: data,
          });
        })
        .catch((err) => {
          reject({
            error: true,
            message: "Failed to get particular payments",
            data: err,
          });
        });
    });
  }

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

      rzp.orders.create(options, function (err, order) {
        if (err) {
          reject({
            error: true,
            message: "Failed to created order",
            data: err,
          });
        } else {
          resolve({ error: false, message: "Order created", data: order });
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
        resolve({
          error: false,
          message: "Payment has been verified",
          data: {},
        });
      } else
        reject({
          error: true,
          message: "Payment verification failed",
          data: {},
        });
    });
  }
}
