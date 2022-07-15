import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { type } from "os";
import { IResponseLocals } from "./global";

export type FastifyFn = (req: FastifyRequest & { body: any }, res: FastifyReply & IResponseLocals) => any
export type FastifyDefault = (req: FastifyRequest , res: FastifyReply, done: DoneFuncWithErrOrRes) => any