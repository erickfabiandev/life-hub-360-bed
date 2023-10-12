import { Router } from "express";
import { isAutenticate } from "../auth/auth.controller";
import { createTaskHandler, deleteTaskHandler, updateTaskHandler } from "./task.controller";

const router = Router()

router.post('/', isAutenticate, createTaskHandler)
router.patch('/', isAutenticate, updateTaskHandler)
router.delete('/', isAutenticate, deleteTaskHandler)

export default router