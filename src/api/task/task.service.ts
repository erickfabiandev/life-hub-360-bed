import UserModel from "../user/user.model";
import TaskModel from "./task.model";
import { ITask } from "./task.types";

export async function createTask(task: ITask, idTaskList: string) {
  try {
    if (!task.title.trim()) {
      throw new Error('The new title cannot be empty')
    }

    const newTask = new TaskModel({
      title: task.title
    });
    await UserModel.findOneAndUpdate(
      { 'taskList._id': idTaskList },
      { $push: { 'taskList.$.tasks': newTask } },
      { new: true }
    )
    return newTask
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function updateTask(idTask: string, idTaskList: string, data: ITask) {
  try {
    const task = await UserModel.findOneAndUpdate(
      { 'taskList._id': idTaskList, 'taskList.tasks._id': idTask },
      {
        $set: {
          'taskList.$[list].tasks.$[task].title': data.title,
          'taskList.$[list].tasks.$[task].status': data.status
        }
      },
      {
        new: true,
        arrayFilters: [{ 'list._id': idTaskList }, { 'task._id': idTask }]
      }
    )
    return task
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function deleteTask(idTask: string, idTaskList: string) {
  try {
    const task = await UserModel.findOneAndUpdate(
      { 'taskList._id': idTaskList },
      { $pull: { 'taskList.$.tasks': { _id: idTask } } },
      { new: true }
    )
    return task
  } catch (error: any) {
    throw new Error(error)
  }
}
