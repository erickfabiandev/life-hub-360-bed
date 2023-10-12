import { Document } from "mongoose";

interface ITask extends Document {
  title: string,
  status: string
}

export { ITask }