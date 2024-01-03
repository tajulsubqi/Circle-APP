import * as express from "express"
import ReplyServices from "../services/ReplyServices"
import upload from "../middlewares/multer/multer"
import AuthMiddlewares from "../middlewares/jwt/AuthJwt"

const replyRouter = express.Router()

// Routes for replies
replyRouter.get("/replies/:threadId", ReplyServices.findReply)
// replyRouter.get("/replies/:id", ReplyServices.findOneReply)
replyRouter.post(
  "/replies",
  AuthMiddlewares.Authentication,
  upload.single("image"),
  ReplyServices.createReply,
)

export default replyRouter
