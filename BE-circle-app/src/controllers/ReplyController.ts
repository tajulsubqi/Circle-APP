import { Request, Response } from "express"
import ReplyServices from "../services/ReplyServices"

class ReplyControllers {
  find(req: Request, res: Response) {
    ReplyServices.findReply(req, res)
  }

  create(req: Request, res: Response) {
    ReplyServices.createReply(req, res)
  }
}

export default new ReplyControllers()
