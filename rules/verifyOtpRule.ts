import { JSONSchemaType } from "ajv";
import { FastifySchema } from "fastify";
import { IVerifyOtp } from "../types/User";

export const verifyOtpSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      otp: {
        type: "string",
      },
    },
    additionalProperties: false,
  },
};
