import { Repository } from "typeorm"
import { Follows } from "../entities/Follows"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"

export default new (class FollowServices {
  private readonly LikeRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows)

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const follows = await this.LikeRepository.find({
        relations: ["user"],
      })
      return res.status(200).json({ code: 200, data: follows })
    } catch (error) {
      res.status(500).json({ error: "error while getting follows" })
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const follow = await this.LikeRepository.findOne({
        where: { id: id },
        relations: ["user"],
      })
      return res.status(200).json(follow)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const follow = this.LikeRepository.create(data)
      await this.LikeRepository.save(follow)
      return res.status(201).json({ message: "follow created" })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      await this.LikeRepository.delete({ id: id })
      return res.status(200).json({ message: "follow deleted" })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const data = req.body
      await this.LikeRepository.update({ id: id }, data)
      return res.status(200).json({ message: "follow updated" })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async count(req: Request, res: Response): Promise<Response> {
    try {
      const count = await this.LikeRepository.count()
      return res.status(200).json({ count: count })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
})()
