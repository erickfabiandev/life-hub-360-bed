import { Application } from "express";
import healthcheckRouter from './api/healcheckt'
import userRouter from './api/user'
import authRouter from './api/auth'
import eventRouter from './api/event'
import taskRouter from './api/task'
import tasklistRouter from './api/tasklist'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/users', userRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/event', eventRouter)
  app.use('/api/task', taskRouter)
  app.use('/api/tasklist', tasklistRouter)

}

export default routes