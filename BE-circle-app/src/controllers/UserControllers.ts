import { Request, Response } from "express"
import UserServices from "../services/UserServices"

export default new (class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserServices.getAllUsers()
      res.json(users)
    } catch (error) {
      console.log(error)

      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10)

    try {
      const user = await UserServices.getUserById(userId)

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      res.json(user)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10)
    const userData = req.body

    try {
      const user = await UserServices.updateUser(userId, userData)
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10)

    try {
      await UserServices.deleteUser(userId)
      res.json({ message: "User deleted successfully" })
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
})()
