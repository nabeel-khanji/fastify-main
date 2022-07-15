import { JSONSchemaType } from "ajv";
import { FastifySchema } from "fastify";
import { IFrogetPassword, ISetPassword } from "../types/User";

export const forgetPasswordSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
      },
    },
    additionalProperties: false,
  } as JSONSchemaType<IFrogetPassword>,
};
