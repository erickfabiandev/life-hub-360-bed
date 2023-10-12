import { Router } from "express";
import { isAutenticate } from "../auth/auth.controller";
import { createEventHandler, deteleEventHandler, getEventByUserHandler, getLatestEventsForUserHandler } from "./event.controller";

const router = Router()

router.post('/', isAutenticate, createEventHandler)
router.delete('/', isAutenticate, deteleEventHandler)
router.get('/all', isAutenticate, getEventByUserHandler)
router.get('/latest', isAutenticate, getLatestEventsForUserHandler)

export default router