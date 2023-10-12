import mongoose, { Schema } from "mongoose";
import { ITask } from "./task.types";

export const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [4, 'Title must be at least 4 characters long'],
      maxlength: [100, 'Title must be at most 100 characters long'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED'],
      default: 'PENDING'
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const TaskModel = mongoose.model<ITask>('Task', TaskSchema)

export default TaskModel