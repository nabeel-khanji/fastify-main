import { JSONSchemaType } from "ajv";
import { FastifySchema } from "fastify";
import { ILogin } from "../types/User";

export const signUpSchema: FastifySchema = {
    body: {
        type: "object",
        properties: {
            email: {
                type: "string",
                format: "email"
            },
            password: {
                type: "string"
            }
        },
        additionalProperties: false
    } as JSONSchemaType<ILogin>
}