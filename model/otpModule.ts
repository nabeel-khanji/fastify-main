import { DB } from "../lib/db";
import { IOtp } from "../types/User";

const otpSchema = new DB.Schema(
  {
    email: {
      type: String,
    },
    otp: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
export const otpModel = DB.model<IOtp & Document>("otp", otpSchema);
