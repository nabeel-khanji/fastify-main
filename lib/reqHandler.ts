import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyDefault, FastifyFn } from "../types/fastify";
import { IResponseLocals } from "../types/global";

export const httpReq = (fn: FastifyFn) => {
  return (async (req: FastifyRequest, res: FastifyReply & IResponseLocals) => {
    const data = (await fn(req, res)) ?? [];
    // console.log(data,'data')
    res.status(res.locals.code).send({ data, msg: res.locals.msg });
  }) as any;
};
