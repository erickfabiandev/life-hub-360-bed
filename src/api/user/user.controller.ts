import { Request, Response } from "express";
import { createUser, updateUser } from "./user.service";
import { AuthRequest } from "../auth/auth.types";

export async function createUserHandler(req: Request, res: Response) {
  const file = req.file
  const data = req.body;
  try {
    const user = await createUser(data, file)
    res.status(201).json({ message: "User created successfully", data: user })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating user', error: error.message })
  }

}

export async function updateUserHandler(req: AuthRequest, res: Response) {
  const file = req.file
  const user = req.user
  const data = req.body
  try {
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const response = await updateUser(user.id, data)
    return res.status(200).json({ message: "successfully upgraded", data: response })
  } catch (error: any) {
    res.status(400).json({ message: 'User could not updated', error: error.message })
  }
}