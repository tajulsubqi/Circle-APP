import * as express from "express"
import userRoutes from "./routes/UserRoute"
import threadRoutes from "./routes/ThreadRoute"
import AuthRoutes from "./routes/AuthRoute"
import { AppDataSource } from "./data-source"
import { Request, Response, NextFunction } from "express"

const cors = require("cors")

AppDataSource.initialize().then(async () => {
  const app = express()
  const PORT = 3000

  app.use(cors())
  app.use(express.json())

  app.use("/api/v1", userRoutes)
  app.use("/api/v1", threadRoutes)
  app.use("/api/v1", AuthRoutes)

  app.use((req, res) => {
    res.status(404).json({ error: "Not Found" })
  })

  app.use((err, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ error: "Internal Server Error" })
  })

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})
