import { readFileSync } from "fs"
import jwt from "jsonwebtoken"
import { IToken, IUser } from "../types/User"
import { __dirname } from "./config"
const privateKey = readFileSync(__dirname + "/../keys/private.pem")
const publicKey = readFileSync(__dirname + "/../keys/public.pem")
export const tokenExpiry = process.env.TOKEN_EXPIRY ?? "10h"
/**
 * creates json webtoken form non sensitive user data.
 */
export const createToken = (data: Partial<IToken>) => {
    return jwt.sign(data, privateKey, { algorithm: "RS256", expiresIn: tokenExpiry })
}


/**
 * verify and parse jsonwebtoken for application usage.
 */
export const verifyToken = (token: string) => {
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] })
}