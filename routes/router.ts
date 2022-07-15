import { fastify } from "fastify";
import { getHome } from "../controller/homeController";
import {
  changePassword,
  forgetPassword,
  login,
  refreshToken,
  setPassword,
  setUser,
  signUp,
  verifyOtp,
} from "../controller/userController";
import { isDev } from "../lib/env";
import { middleware } from "../lib/middlewareHandler";
import { httpReq } from "../lib/reqHandler";
import { helloWorldMiddleware } from "../middleware/helloWorld";
import { signUpSchema } from "../rules/signUpRule";
import formatsPlugin from "ajv-formats";
import { IResponseLocals } from "../types/global";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { FastifyFn } from "../types/fastify";
import { verifyOtpSchema } from "../rules/verifyOtpRule";
import { setPasswordSchema } from "../rules/setPasswordRule";
import { forgetPasswordSchema } from "../rules/forgetRule";

const http = fastify({
  logger: true,
  disableRequestLogging: true,
  ajv: { plugins: [formatsPlugin] },
});
/**
 * set locals for passing data between routes.
 */
http.decorateReply("locals", null);
/**
 * clear locals on request
 */
http.addHook("onRequest", (req, res, next) => {
  //@ts-ignore
  res.locals = {
    msg: "",
    code: 200,
    postPromises: [],
  } as IResponseLocals["locals"];
  next();
});
/**
 * making sure error handler matches the application structure.
 */
http.setErrorHandler((err, req, res) => {
  return httpReq((req, res) => {
    res.locals.code = 500;
    res.locals.msg = isDev
      ? "Server Error: " + err.message
      : "Internal server error";
    if (isDev) {
      return err.stack;
    }
  })(req, res);
});
/**
 * example of middleware
 */
http.get("/", { onRequest: middleware(helloWorldMiddleware) }, getHome);
/**
 * Auth Routes
 */
http.post("/sign-up", { schema: signUpSchema }, signUp);
http.post("/login", login);
http.post(
  "/refresh-token",
  { onRequest: middleware(AuthMiddleware) },
  refreshToken
);
/**
 * Change Password Routes
 */
http.post(
  "/change-password",
  { onRequest: middleware(AuthMiddleware) },
  changePassword
);
/**
 * Forget Password Routes
 */ http.post(
  "/forget-password",
  { schema: forgetPasswordSchema },
  forgetPassword
);
/**
 * Verify Otp Route
 */ http.post("/verify-otp", { schema: verifyOtpSchema }, verifyOtp);
/**
 * Set Password Routes
 */ http.post("/set-password", { schema: setPasswordSchema }, setPassword);
/**
 * Profile Update Routes
 */ http.post("/profile", { onRequest: middleware(AuthMiddleware) }, setUser);
export { http };
