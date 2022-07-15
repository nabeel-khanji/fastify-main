import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";
import { FastifyDefault, FastifyFn } from "../types/fastify";
import { IResponseLocals } from "../types/global";

export const middleware = (...middlewares: FastifyFn[]) => {
  return ((
    req: FastifyRequest,
    res: FastifyReply & IResponseLocals,
    done: DoneFuncWithErrOrRes
  ) => {
    for (const fn of middlewares) {
      const msg = fn(req, res);
      if (msg) res.status(res.locals.code).send({ msg, data: [] });
    }
    if (!res.sent) done();
  }) as FastifyDefault;
};
