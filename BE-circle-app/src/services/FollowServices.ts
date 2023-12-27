import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { Request, Response } from "express"
import { FollowSchema } from "../utils/validators/Thread"

export default new (class FollowServices {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

  async followUser(req: Request, res: Response): Promise<Response> {
    try {
      const loggedInUserId = res.locals.loginSession.user.id

      const { error, value } = FollowSchema.validate(req.body)

      if (error) {
        return res.status(400).json({
          code: 400,
          message: "Invalid input. Please provide a valid user_id.",
        })
      }

      const loggedInUser = await this.UserRepository.findOne({
        where: { id: loggedInUserId },
        relations: ["following"],
      })

      const userToFollow = await this.UserRepository.findOne({
        where: { id: value.user },
      })

      if (!loggedInUser || !userToFollow) {
        return res.status(404).json({ code: 404, message: "User not found" })
      }

      const isAlreadyFollowing = loggedInUser.following.some(
        (followedUser) => followedUser.id === value.user,
      )

      if (isAlreadyFollowing) {
        loggedInUser.following = loggedInUser.following.filter(
          (followedUser) => followedUser.id !== value.user,
        )
      } else {
        loggedInUser.following.push(userToFollow)
      }

      await this.UserRepository.save(loggedInUser)

      const message = isAlreadyFollowing
        ? "Unfollowed successfully"
        : "Followed successfully"

      return res.status(200).json({ code: 200, message })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ code: 500, message: "Internal server error" })
    }
  }

  async getFollowingUsers(req: Request, res: Response): Promise<Response> {
    try {
      const loggedInUserId = res.locals.loginSession.user.id

      const loggedInUser = await this.UserRepository.findOne({
        where: { id: loggedInUserId },
        relations: ["following"],
      })

      if (!loggedInUser) {
        return res.status(404).json({ code: 404, message: "User not found" })
      }

      return res.status(200).json({ code: 200, data: loggedInUser.following })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ code: 500, message: "Internal server error" })
    }
  }

  async getFollowerUsers(req: Request, res: Response): Promise<Response> {
    try {
      const loggedInUserId = res.locals.loginSession.user.id

      const loggedInUser = await this.UserRepository.findOne({
        where: { id: loggedInUserId },
        relations: ["followers"],
      })

      if (!loggedInUser) {
        return res.status(404).json({ code: 404, message: "User not found" })
      }

      return res.status(200).json({ code: 200, data: loggedInUser.followers })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ code: 500, message: "Internal server error" })
    }
  }
})()
