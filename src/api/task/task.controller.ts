import { Response } from "express";
import { AuthRequest } from "../auth/auth.types";
import { createTask, deleteTask, updateTask } from "./task.service";

export async function createTaskHandler(req: AuthRequest, res: Response) {
  const { task, idTaskList } = req.body
  try {
    const newTask = await createTask(task, idTaskList)
    res.status(200).json(newTask)
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating Task', error: error.message })
  }
}

export async function updateTaskHandler(req: AuthRequest, res: Response) {
  const { idTask, idTaskList, data } = req.body
  try {
    const upTask = await updateTask(idTask, idTaskList, data)
    res.status(200).json({ message: "Task successfully upgraded", data: upTask })
  } catch (error: any) {
    res.status(400).json({ message: 'Task could not updated', error: error.message })
  }
}

export async function deleteTaskHandler(req: AuthRequest, res: Response) {
  const { idTask, idTaskList } = req.body

  try {
    const upTask = await deleteTask(idTask, idTaskList)
    res.status(200).json({ message: "Task successfully deleted", data: upTask })
  } catch (error: any) {
    res.status(400).json({ message: 'Task could not delete', error: error.message })
  }
}