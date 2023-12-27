import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Thread } from "../entities/Thread"
import { createTHreadSchema } from "../utils/validators/Thread"
import cloudinary from "../middlewares/cloudinary/configCloudinary"
import * as fs from "fs"
import { log } from "console"

interface MulterFile {
  fileName: string
}

class ThreadService {
  private threadRepository = AppDataSource.getRepository(Thread)

  getAllThreads = async () => {
    try {
      return await this.threadRepository.find({ relations: ["user"] })
    } catch (error) {
      throw new Error("Error fetching threads")
    }
  }

  getThreadById = async (threadId: number) => {
    try {
      return await this.threadRepository.findOne({
        where: {
          id: threadId,
        },
        relations: ["user"],
      })
    } catch (error) {
      throw new Error("Error fetching thread by ID")
    }
  }

  createThreadWithImage = async (req: Request, res: Response): Promise<Response> => {
    try {
      const newData = {
        userId: req.body.userId,
        content: req.body.content,
        image: "",   
      }
      if (req.file) {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: `/circle-app/thread/${newData.userId}`,
          tags: "circle-app,user,thread",
        })
        newData.image = cloudinaryResponse.secure_url;
        await fs.unlinkSync(req.file.path)
      }

      const result = this.threadRepository.create({
        ...newData
      }) 
      console.log(result)
      const saveThread = await this.threadRepository.save(result)
      return res.status(201).json({ code: 201, data: saveThread })
    } catch (error) {
      console.log(error)
    }
  }

  updateThread = async (threadId: number, threadData: Partial<Thread>) => {
    try {
      const thread = await this.threadRepository.findOneBy({
        id: threadId,
      })

      if (!thread) {
        throw new Error("Thread not found")
      }

      Object.assign(thread, threadData)

      return await this.threadRepository.save(thread)
    } catch (error) {
      throw new Error("Error updating thread")
    }
  }

  deleteThread = async (threadId: number) => {
    try {
      const thread = await this.threadRepository.findOneBy({
        id: threadId,
      })

      if (!thread) {
        throw new Error("Thread not found")
      }

      await this.threadRepository.remove(thread)
    } catch (error) {
      throw new Error("Error deleting thread")
    }
  }
}

export default new ThreadService()
