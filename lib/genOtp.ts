import { randomInt } from "node:crypto";

export const generateOTP = () => {
  return `${randomInt(0, 9999)}`.padStart(4, "0");
};
