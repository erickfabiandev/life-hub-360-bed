import jwt from 'jsonwebtoken'
import { PayloadType } from './auth.types'
import dotenv from 'dotenv'
dotenv.config();

const SECRET = process.env.JWT_SECRET as string

export const verifytoken = (token: string) => {
  const decoded = jwt.verify(token, SECRET) as PayloadType
  return decoded
}

export const signtoken = (payload: PayloadType) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: '1d' })
  return token
}