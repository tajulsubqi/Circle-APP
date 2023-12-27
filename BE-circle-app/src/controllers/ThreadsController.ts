import { Request, Response } from "express"
import ThreadServices from "../services/ThreadServices"

class ThreadController {
  getAllThreads = async (req: Request, res: Response) => {
    try {
      const threads = await ThreadServices.getAllThreads()
      res.json(threads)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  getThreadById = async (req: Request, res: Response) => {
    const threadId = parseInt(req.params.id, 10)

    try {
      const thread = await ThreadServices.getThreadById(threadId)

      if (!thread) {
        return res.status(404).json({ error: "Thread not found" })
      }

      res.json(thread)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  createThread(req: Request, res: Response) {
    ThreadServices.createThreadWithImage(req, res)
  }

  updateThread = async (req: Request, res: Response) => {
    const threadId = parseInt(req.params.id, 10)
    const threadData = req.body

    try {
      const thread = await ThreadServices.updateThread(threadId, threadData)
      res.json(thread)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  deleteThread = async (req: Request, res: Response) => {
    const threadId = parseInt(req.params.id, 10)

    try {
      await ThreadServices.deleteThread(threadId)
      res.json({ message: "Thread deleted successfully" })
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}

export default new ThreadController()
