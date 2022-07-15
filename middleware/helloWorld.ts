import { FastifyFn } from "../types/fastify"

export const helloWorldMiddleware: FastifyFn = (req, res) => {
    // res.locals.code = 422
    // return "auth failed!"
    // throw Error("gg")
    console.log("Hello", res.locals)
}