import { Router } from "express";
import { healchecktHandler } from "./healcheckt.controller";

const router = Router()

router.get('/', healchecktHandler)

export default router