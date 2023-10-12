import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../user/user.service";
import { comparePassword } from "../utils/bcrypt";
import { signtoken, verifytoken } from "./auth.service";
import { AuthRequest } from "./auth.types";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    //compare Password 
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    //JWT
    const payload = {
      id: user.id,
      email: user.email
    }

    const token = signtoken(payload)

    interface Profile {
      fullName: string;
      email: string;
      status: boolean;
      role: string;
      avatar: string
    };

    const profile: Profile = {
      fullName: user.fullName,
      email: user.email,
      status: user.status,
      role: user.role,
      avatar: user.avatar
    }

    res.status(200).json({ token, profile })

  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
}

export async function isAutenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction) {
  try {
    const token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = verifytoken(token)

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await getUserByEmail(decoded.email)

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = user

  } catch (error: any) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  return next()
}

export const hasRole = (allowRoles: string[]) => {

  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction) => {

    const user = req.user

    if (!user) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const hasPermission = allowRoles.includes(user.role)

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next()
  }
}
