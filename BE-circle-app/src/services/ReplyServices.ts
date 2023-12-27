import { Repository } from "typeorm"
import { Reply } from "../entities/Reply"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import cloudinary from "../middlewares/cloudinary/configCloudinary"
import * as fs from "fs"

class ReplysServices {
  private readonly ReplyRepository: Repository<Reply> = AppDataSource.getRepository(Reply)

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const replies = await this.ReplyRepository.find({
        relations: ["thread", "user"],
        select: {
          thread: {
            id: true,
            content: true,
          },
          user: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      })
      return res.status(200).json({ code: 200, data: replies })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Error while getting replies" })
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const userId = res.locals.loginSession.user.id
      const username = res.locals.loginSession.user.username

      if (req.file) {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: `/circle-app/thread/${userId}-${username}/reply`,
          tags: "circle-app,user,reply",
        })
        data.image = cloudinaryResponse.secure_url
        fs.unlinkSync(req.file.path)
      }

      const result = this.ReplyRepository.create({
        content: data.content,
        user: userId,
      })

      const reply = await this.ReplyRepository.save(result)
      return res.status(201).json({
        message: "Success",
        data: reply,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id
      const userId = res.locals.loginSession.user.id

      const checkData = await this.ReplyRepository.findOneBy({ id: Number(id) })
      if (!checkData)
        return res.status(404).json({
          message: "Reply not found",
        })

      const checkUser = await this.ReplyRepository.findOne({
        where: { id: Number(id) },
        relations: ["user"],
      })
      if (checkUser.user.id !== userId)
        return res.status(404).json({
          message: "User not allowed to delete this reply",
        })

      const result = await this.ReplyRepository.delete({ id: Number(id) })
      return res.status(200).json({
        message: "Success",
        data: result,
      })
    } catch (error) {
      return res.status(500).json({
        error: error,
      })
    }
  }
}

export default new ReplysServices()
