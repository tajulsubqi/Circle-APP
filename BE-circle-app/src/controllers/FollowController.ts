import { Request, Response } from "express"
import FollowServices from "../services/FollowServices"

class FollowControllers {
  find(req: Request, res: Response) {
    FollowServices.find(req, res)
  }

  findOne(req: Request, res: Response) {
    FollowServices.findOne(req, res)
  }

  create(req: Request, res: Response) {
    FollowServices.create(req, res)
  }

  delete(req: Request, res: Response) {
    FollowServices.delete(req, res)
  }

  update(req: Request, res: Response) {
    FollowServices.update(req, res)
  }
}

export default new FollowControllers()
