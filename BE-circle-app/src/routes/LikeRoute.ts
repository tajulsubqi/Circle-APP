import * as express from "express"
import LikeControllers from "../controllers/LikeControllers"

const likeRouter = express.Router()

likeRouter.get("/like", LikeControllers.find)
likeRouter.get("/like/:id", LikeControllers.findOne)
likeRouter.post("/like", LikeControllers.create)
likeRouter.post("/like/:id", LikeControllers.delete)

export default likeRouter
