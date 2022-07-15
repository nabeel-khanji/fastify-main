import { userAccountStatus } from "../global/userAccountStatus";
import { verifyToken } from "../lib/jwt";
import { FastifyFn } from "../types/fastify";
import { IToken } from "../types/User";

export const AuthMiddleware: FastifyFn = (req, res) => {
  const auth = req.headers.authorization;
  if (auth) {
    try {
      const data = verifyToken(auth.replace("Bearer ", "")) as IToken;
      if (!res.locals.disableCheck) {
        if (data.status !== userAccountStatus.ACTIVE) {
          res.locals.code = 401;
          return "Account is inactive. please verify OTP to activate account.";
        }
      }
      delete data.iat;
      delete data.exp;
      res.locals.user = data;
    } catch (error) {
      if (!res.locals.authOptional) {
        res.locals.code = 401;
        return "Invalid token or token expired!";
      }
    }
  }
};

export const AllowInActive: FastifyFn = (req, res) => {
  res.locals.disableCheck = true;
};

export const OptionalAuth: FastifyFn = (req, res) => {
  res.locals.disableCheck = true;
  res.locals.authOptional = true;
};
