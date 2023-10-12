import express from 'express'
import configExpress from './config/express'
import routes from './routes'
import connect from './config/database'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 8080

connect()

//Setup Express
configExpress(app)

//Setup Routes
routes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})