import { Document } from "mongoose";
import { ITask } from "../task/task.types";

interface ITaskList extends Document {
  title: string,
  status: string,
  tasks: ITask[],
  color: string
}
export { ITaskList }