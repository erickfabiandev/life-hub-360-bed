import { Router } from "express";
import { isAutenticate } from "../auth/auth.controller";
import { createTaskListHandler, deleteTaskListHandler, getAllTaskListHandler, getLatestTasksListsForUserHandler, updateTaskListHandler } from "./tasklist.controller";

const router = Router()

router.post('/', isAutenticate, createTaskListHandler)
router.patch('/', isAutenticate, updateTaskListHandler)
router.delete('/', isAutenticate, deleteTaskListHandler)
router.get('/all', isAutenticate, getAllTaskListHandler)
router.get('/latest', isAutenticate, getLatestTasksListsForUserHandler)

export default router