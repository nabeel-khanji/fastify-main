import { JSONSchemaType } from "ajv";
import { FastifySchema } from "fastify";
import { ISignUp } from "../types/User";

export const signUpSchema: FastifySchema = {
    body: {
        type: "object",
        properties: {
            email: {
                type: "string",
                format: "email"
            },
            name: {
                type: "string"
            },
            password: {
                type: "string"
            }
        },
        additionalProperties: false
    } as JSONSchemaType<ISignUp>
}