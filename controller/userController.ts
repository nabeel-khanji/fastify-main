import { httpReq } from "../lib/reqHandler";
import { userModel } from "../model/userModel";
import { verify, hash } from "argon2";
import { IOtp, IUser } from "../types/User";
import { createToken } from "../lib/jwt";
import { queueTask } from "../lib/queue";
import { randomUUID } from "crypto";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { otpModel } from "../model/otpModule";
import { generateOTP } from "../lib/genOtp";
import ms from "ms";
export const login = httpReq(async (req, res) => {
  const invalid = () => {
    res.locals.code = 422;
    res.locals.msg = "invalid credentials!";
  };
  try {
    const user: IUser = await userModel
      .findOne({ email: req.body.email })
      .lean();
    if (!user) {
      return invalid();
    }
    if (!(await verify(user.password!, req.body.password))) {
      return invalid();
    }
    res.locals.msg = "Login successful!";
    return sendAuthData(user);
  } catch (error) {
    return invalid();
  }
});

export const signUp = httpReq(async (req, res) => {
  try {
    const user: IUser = await userModel.create({
      email: req.body.email,
      password: await hash(req.body.password),
      name: req.body.name,
    });
    res.locals.code = 201;
    res.locals.msg = "user created!";
    return sendAuthData(user);
  } catch (error: any) {
    res.locals.code = 422;
    res.locals.msg = error?.keyPattern?.email
      ? "Email already exists!"
      : "user creation failed!";
    return error;
  }
});

export const setUser = httpReq(async (req, res) => {
  try {
    const user: IUser = await userModel
      .findByIdAndUpdate(
        { _id: res.locals.user?._id },
        { name: req.body.name },
        { new: true }
      )
      .lean();
    res.locals.code = 200;
    res.locals.msg = "Update User Data Successful!";
    return sendAuthData(user);
  } catch (error: any) {
    res.locals.code = 422;
    res.locals.msg = "Could not update user data!";
  }
});

export const forgetPassword = httpReq(async (req, res) => {
  const invalid = () => {
    res.locals.code = 422;
    res.locals.msg = "invalid credentials!";
  };
  try {
    const user: IUser = await userModel
      .findOne({ email: req.body.email })
      .lean();
    if (!user) {
      return invalid();
    }
    const newOtp = generateOTP();
    const otp: IOtp = await otpModel.create({
      email: req.body.email,
      otp: newOtp,
    });
    var data: MailOptions = {
      from: process.env.DEFAULT_EMAIL,
      to: req.body.email,
      subject: "Forget Password",
      text: `Your otp is ${otp.otp}`,
    };
    queueTask("email", data);
    res.locals.code = 200;
    res.locals.msg = "Email Send Successful!";
  } catch (error: any) {
    return error;
  }
});

export const verifyOtp = httpReq(async (req, res) => {
  const invalid = () => {
    res.locals.code = 422;
    res.locals.msg = "invalid otp!";
  };
  try {
    const now = new Date(Date.now() - ms(process.env.OTP_EXPIRE_TIME ?? "30m"));
    const otp: IOtp = await otpModel
      .findOne({
        email: req.body.email,
        otp: req.body.otp,
        createdAt: {
          $gte: now,
        },
      })
      .lean();
    if (!otp) {
      return invalid();
    }
    const token = randomUUID();
    const updateOtp: IOtp = await otpModel
      .findByIdAndUpdate(
        {
          _id: otp._id,
        },
        { token: token },
        {
          new: true,
        }
      )
      .lean();
    return updateOtp;
  } catch (error) {}
});

export const setPassword = httpReq(async (req, res) => {
  const invalid = () => {
    res.locals.code = 422;
    res.locals.msg = "token not found!";
  };
  try {
    const now = new Date(Date.now() - ms(process.env.OTP_EXPIRE_TIME ?? "30m"));
    const otp: IOtp = await otpModel
      .findOne({
        token: req.body.token,
        createdAt: {
          $gte: now,
        },
      })
      .lean();
    if (!otp) {
      return invalid();
    }
    Promise.all([
      userModel.updateOne(
        { email: otp.email },
        {
          password: await hash(req.body.password),
        }
      ),
      otpModel.deleteMany({
        email: otp.email,
      }),
    ]);
    res.locals.code = 200;
    res.locals.msg = "Password Change Successful!";
  } catch (error: any) {
    res.locals.code = 422;
    res.locals.msg = "Could not change password!";
  }
});

export const changePassword = httpReq(async (req, res) => {
  const invalid = () => {
    res.locals.code = 422;
    res.locals.msg = "invalid credentials!";
  };
  try {
    const user: IUser = await userModel
      .findOne({ _id: res.locals.user?._id })
      .lean();
    if (!(await verify(user.password!, req.body.password))) {
      return invalid();
    }
    await userModel.updateOne(
      { _id: res.locals.user?._id },
      { password: await hash(req.body.newpassword) }
    );
    res.locals.code = 200;
    res.locals.msg = "Password Change Successful!";
  } catch (error: any) {
    res.locals.code = 422;
    res.locals.msg = "Could not change password!";
  }
});

const sendAuthData = (user: IUser) => {
  if (user.password) delete user.password;
  return {
    token: createToken({
      email: user.email,
      _id: user._id,
      status: user.status,
    }),
    ...user,
  };
};

export const refreshToken = httpReq(async (req, res) => {
  const user: IUser = await userModel.findById(res.locals.user?._id).lean()!;
  return sendAuthData(user);
});
