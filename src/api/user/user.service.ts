import uploadFile from "../../utils/uploadFile";
import { hashPassword } from "../utils/bcrypt";
import UserModel from "./user.model";
import { IUser } from "./user.types";

export async function createUser(input: IUser, file?: Express.Multer.File) {
  try {
    let fileResponse = null
    let filePath = file?.path || ''

    if (filePath) {
      fileResponse = await uploadFile('users', filePath)
    }

    const hashedPassword = await hashPassword(input.password)
    const data = fileResponse ? {
      avatar: fileResponse.secure_url
    } : {
      ...input,
      email: input.email.toLowerCase(),
      password: hashedPassword,
    }

    const user = await UserModel.create(data)
    return user
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email: email?.toLocaleLowerCase() })
}

export async function updateUser(id: string, data: IUser) {
  try {
    const newUser = await UserModel.findByIdAndUpdate(id, data, { new: true })
    return newUser
  } catch (error: any) {
    throw new Error(error)
  }
}

