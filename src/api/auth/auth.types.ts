import { Request } from "express";
import { IUser } from "../user/user.types";

export type PayloadType = {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: IUser
}