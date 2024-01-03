import { Repository } from "typeorm"
import { Reply } from "../entities/Reply"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import cloudinary from "../middlewares/cloudinary/configCloudinary"
import * as fs from "fs"
import { createReplySchema, updateReplySchema } from "../utils/validators/Thread"
import "dotenv/config"
import { number } from "joi"

export default new (class ReplysServices {
  private readonly ReplyRepository: Repository<Reply> = AppDataSource.getRepository(Reply)

  findReply = async (req: Request, res: Response): Promise<Response> => {
    try {
      const replies = await this.ReplyRepository.find({
        relations: ["user", "thread"],
        order: {
          id: "DESC",
        },
      })
      return res.status(200).json({ code: 200, data: replies })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ error: "Error while getting replies" })
    }
  }

  async findOneReply(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const thread = await this.ReplyRepository.findOne({
        where: { id: Number(id) },
        relations: ["users, replies"],
      })
      return res.status(200).json({
        message: "Success",
        data: thread,
      })
    } catch (error) {
      return res.status(500).json({ error: "Error while getting a reply" })
    }
  }

  createReply = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { content, threadId } = req.body
      const loginSession = res.locals.loginSession

      const reply = this.ReplyRepository.create({
        content,
        thread: {
          id: Number(threadId),
        },
        user: {
          id: loginSession.userId,
        },
      })

      const saveReply = await this.ReplyRepository.save(reply)
      return res.status(201).json(saveReply)

      // const { content, threadId } = req.body
      // const userId = res.locals.loginSession.userId
      // let image = null
      // if (req.file) {
      //   const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      //     folder: `/circle-app/thread/${threadId}/reply`,
      //     tags: "circle-app,user,thread",
      //   })
      //   image = cloudinaryResponse.secure_url
      //   fs.unlinkSync(req.file.path)
      // }

      // const data = {
      //   content,
      //   userId,
      //   threadId,
      //   image: image,
      // }
      // const { error, value } = createReplySchema.validate(data)
      // if (error) {
      //   return res.status(400).json({ error: `${error.message}` })
      // }
      // const reply = this.ReplyRepository.create({
      //   ...value,
      // })
      // const createdReply = await this.ReplyRepository.save(reply)
      // return res.status(201).json(createdReply)
    } catch (error) {
      console.error("Error while creating reply:", error.message)
      return res.status(500).json({ error: "Error while creating reply" })
    }
  }
})()
