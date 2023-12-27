import * as express from "express"
import FollowController from "../controllers/FollowController"

const followRouter = express.Router()

followRouter.get("/follow", FollowController.getFollowingUsers)
followRouter.get("/follow/:id", FollowController.getFollowerUsers)
followRouter.post("/follow", FollowController.followUser)

export default followRouter
