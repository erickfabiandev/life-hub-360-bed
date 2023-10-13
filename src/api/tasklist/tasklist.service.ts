import mongoose from "mongoose";
import UserModel from "../user/user.model";
import TaskList from "./tasklist.model";
import { ITaskList } from "./tasklist.types";

export async function createTaskList(idUser: string, data: ITaskList) {
  try {

    const newTaskList = new TaskList(
      {
        title: data.title,
        tasks: data.tasks,
        color: data.color
      }
    )
    const savedTaskList = await newTaskList.save();

    await UserModel.findByIdAndUpdate(
      idUser,
      { $push: { 'taskList': savedTaskList } },
      { new: true }
    )
    return savedTaskList
  } catch (error: any) {
    throw error
  }
}

export async function updateTaskList(idTaskList: string, data: ITaskList) {
  try {
    if (data.title && !data.title.trim()) {
      throw new Error('The new title cannot be empty')
    }
    const taskList = await UserModel.findOneAndUpdate(
      { 'taskList._id': idTaskList },
      { $set: { 'taskList.$.title': data.title, 'taskList.$.status': data.status } },
      { new: true }
    ).exec()
    return taskList
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function deleteTaskList(idTaskList: string) {
  try {
    const taskList = await UserModel.findOneAndUpdate(
      { 'taskList._id': idTaskList },
      { $pull: { 'taskList': { _id: idTaskList } } },
      { new: true }
    )
    return taskList
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getAllTaskList(idUser: string) {

  try {
    const response = await UserModel.findById(
      idUser,
      'taskList'
    )
    return response?.taskList
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getLatestTasksListsForUser(idUser: string) {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {

    const response = UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(idUser),
        },
      },
      {
        $unwind: '$taskList',
      },
      {
        $match: {
          'taskList.createdAt': {
            $gte: firstDayOfMonth,
            $lte: lastDayOfMonth,
          },
        },
      },

      {
        $sort: { 'taskList.createdAt': -1 },
      },
      {
        $limit: 4,
      },
    ]).exec();

    return response

  } catch (error: any) {
    throw new Error(error)
  }
}