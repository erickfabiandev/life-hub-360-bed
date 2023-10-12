import { Router } from "express";
import { createUserHandler, updateUserHandler } from "./user.controller";
import { isAutenticate } from "../auth/auth.controller";
import multer from "multer";

const router = Router()
const upload = multer({
  dest: './uploads/users',
  preservePath: true
})

router.post('/', upload.single('image'), createUserHandler)
router.patch('/my-profile', isAutenticate, upload.single('image'), updateUserHandler)

export default router