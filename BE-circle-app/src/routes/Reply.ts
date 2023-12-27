import * as express from "express"
import ReplyServices from "../services/ReplyServices"

const replyRouter = express.Router()

// Routes for replies
replyRouter.get("/replies", ReplyServices.find)
replyRouter.get("/replies/:id", ReplyServices.findOne)
replyRouter.post("/replies", ReplyServices.create)
replyRouter.post("/replies/:id", ReplyServices.update)
replyRouter.post("/replies/:id", ReplyServices.delete)

export default replyRouter
