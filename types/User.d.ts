import { userAccountStatus } from "../global/userAccountStatus";

export interface IToken {
  _id: string;
  email: string;
  status: userAccountStatus;
  iat?: number;
  exp?: number;
}
export interface IUser {
  _id: string;
  email: string;
  name: string;
  image: File | string;
  password?: string;
  status: userAccountStatus;
  iat?: number;
  exp?: number;
  coins: number;
}
export interface IOtp {
  _id: string;
  email: string;
  token: string;
  otp: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface ISignUp extends ILogin {
  name: string;
}
export interface IVerifyOtp extends IOtp {}
export interface ISetPassword extends IOtp {
  password: string;
}
export interface IFrogetPassword extends IOtp {}
