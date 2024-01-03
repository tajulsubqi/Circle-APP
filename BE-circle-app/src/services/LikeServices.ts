import { Repository } from "typeorm"
import { Like } from "../entities/Like"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { likeSchema } from "../utils/validators/Thread"
class LikeServices {
  private readonly LikeRepository: Repository<Like> = AppDataSource.getRepository(Like)

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const likes = await this.LikeRepository.find({
        relations: ["thread", "user"],
      })
      return res.status(200).json({ code: 200, data: likes })
    } catch (error) {
      res.status(500).json({ error: "error while getting likes" })
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const like = await this.LikeRepository.findOne({
        where: { id: id },
        relations: ["thread", "user"],
      })
      return res.status(200).json(like)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const { error, value } = likeSchema.validate(data)
      if (error) {
        return res.status(400).json({ Error: `${error}` })
        // return res.status(400).json({ error: error.details[0].message })
      }

      const likeSelected: Like | null = await this.LikeRepository.findOne({
        where: {
          user: {
            id: res.locals.loginSession.user.id,
          },
          thread: {
            id: value.thread,
          },
        },
      })

      if (likeSelected) {
        //delete the like
        await this.LikeRepository.remove(likeSelected)
        return res.status(200).json({ message: "like deleted" })
      }

      const like = this.LikeRepository.create({
        user: res.locals.loginSession.user.id,
        thread: value.thread,
      })

      const createdLike = await this.LikeRepository.save(like)
      return res.status(200).json(createdLike)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "error while updating reply" })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const like = await this.LikeRepository.findOne({
        where: { id: id },
        relations: ["thread", "user"],
      })

      if (!like) return res.status(404).json({ Error: "like ID not found" })
      
      const likeDeleted = await this.LikeRepository.remove(like)
      return res.status(200).json(likeDeleted)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
}

export default new LikeServices()
