import * as express from "express"
import UserController from "../controllers/UserControllers"

const userRouter = express.Router()

// Routes for users
userRouter.get("/users", UserController.find)
userRouter.get("/users/:id", UserController.findOne)
userRouter.post("/users/:id", UserController.create)
userRouter.delete("/users/:id", UserController.delete)

export default userRouter
