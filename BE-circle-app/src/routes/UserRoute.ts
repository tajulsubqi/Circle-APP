import * as express from "express"
import UserController from "../controllers/UserControllers"

const userRouter = express.Router()

// Routes for users
userRouter.get("/users", UserController.getAllUsers)
userRouter.get("/users/:id", UserController.getUserById)
userRouter.put("/users/:id", UserController.updateUser)
userRouter.delete("/users/:id", UserController.deleteUser)

export default userRouter
