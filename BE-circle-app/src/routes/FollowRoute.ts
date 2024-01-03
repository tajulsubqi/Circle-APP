import * as express from "express"
import FollowController from "../controllers/FollowController"

const followRouter = express.Router()

followRouter.get("/follow", FollowController.find)
followRouter.get("/follow/:id", FollowController.findOne)
followRouter.post("/follow", FollowController.create)
followRouter.post("/follow/:id", FollowController.delete)

export default followRouter
