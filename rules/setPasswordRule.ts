import { JSONSchemaType } from "ajv";
import { FastifySchema } from "fastify";
import { ISetPassword } from "../types/User";

export const setPasswordSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      token: { type: "string" },
      password: { type: "string" },
    },
    additionalProperties: false,
  },
};
