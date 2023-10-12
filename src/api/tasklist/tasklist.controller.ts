import { Response } from "express";
import { AuthRequest } from "../auth/auth.types";
import { createTaskList, deleteTaskList, getAllTaskList, getLatestTasksListsForUser, updateTaskList } from "./tasklist.service";

export async function createTaskListHandler(req: AuthRequest, res: Response) {
  const user = req.user
  const { data } = req.body
  try {
    const newTaskList = await createTaskList(user?.id, data)
    res.status(200).json(newTaskList)
  } catch (error: any) {
    res.status(400).json({ message: 'TaskList created successfully', error: error.message })
  }
}

export async function updateTaskListHandler(req: AuthRequest, res: Response) {
  const { idTaskList, data } = req.body
  try {
    const taskList = await updateTaskList(idTaskList, data)
    res.status(200).json({ message: 'TaskList updated successfully', taskList })
  } catch (error: any) {
    res.status(400).json({ message: 'TaskList could not updated', error: error.message })
  }
}

export async function deleteTaskListHandler(req: AuthRequest, res: Response) {
  const { idTaskList } = req.body
  try {
    await deleteTaskList(idTaskList)
    res.status(200).json({ message: 'TaskList deleted successfully' })

  } catch (error: any) {
    res.status(400).json({ message: 'TaskList could not deleted', error: error.message })

  }
}

export async function getAllTaskListHandler(req: AuthRequest, res: Response) {
  const user = req.user
  try {
    const TaskLists = await getAllTaskList(user?.id)
    res.status(200).json(TaskLists)
  } catch (error: any) {
    res.status(400).json({ message: 'TaskList could not deleted', error: error.message })
  }
}

export async function getLatestTasksListsForUserHandler(req: AuthRequest, res: Response) {
  const user = req.user
  try {
    const response = await getLatestTasksListsForUser(user?.id)

    const TaskLists = response.map((_) => {
      return {
        title: _.taskList.title,
        status: _.taskList.status,
        tasks: _.taskList.tasks,
        color: _.taskList.color,
        _id: _.taskList._id,
        createdAt: _.taskList.createdAt,
        updatedAt: _.taskList.updatedAt
      }
    })
    res.status(200).json(TaskLists)
  } catch (error: any) {
    res.status(400).json({ message: 'Search error', error: error.message })
  }
}