import mongoose, { Schema } from "mongoose";
import { ITaskList } from "./tasklist.types";
import { TaskSchema } from "../task/task.model";

export const TaskListSchema = new Schema<ITaskList>({
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
  },
  tasks: {
    type: [TaskSchema],
    default: []
  },
  color: {
    type: String,
    default: '#FBFCFC'
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)

const TaskList = mongoose.model<ITaskList>('TaskList', TaskListSchema)

export default TaskList