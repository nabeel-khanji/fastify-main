import { IToken } from "./User";

interface IResponseLocals {
  locals: {
    id: string;
    name?: string;
    msg: string;
    code: number;
    postPromises: Promise<any>[];
    user?: IToken;
    disableCheck?: boolean;
    authOptional?: boolean;
  };
}
