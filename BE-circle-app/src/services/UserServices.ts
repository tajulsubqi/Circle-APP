import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import * as bcrypt from "bcrypt"
import { createUserSchema, updateUserSchema } from "../utils/validators/Thread"

export default new (class UserService {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.find({
        relations: ["following", "followers"],
      })

      return res.status(200).json({ code: 200, data: user })
    } catch (error) {
      return res.status(500).json({ error: "Error while getting users" })
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession

      if (!loginSession) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      // const redisKey = loginSession.user.id.toString()
      // const RedisCache = await RedisClient.get(redisKey)
    } catch (error) {
      return res.status(500).json({ error: "Error while getting user" })
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      const { error, value } = createUserSchema.validate(data)
      if (error) {
        return res.status(400).json({ Error: error.details[0].message })
      }

      const users = this.userRepository.create({
        fullname: value.fullname,
        username: value.username,
        email: value.email,
        password: value.password,
        profile_picture: value.profile_picture,
        profile_description: value.profile_description,
      })

      const createUsers = await this.userRepository.save(users)
      res.status(200).json({ code: 200, data: createUsers })
    } catch (error) {
      return res.status(500).json({ error: "Error while creating user" })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userRepository.findOne({
        where: { id: id },
      })

      const data = req.body
      const { error, value } = updateUserSchema.validate(data)

      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      // Hash the new password before saving it
      if (value.password) {
        const hashedPassword = await bcrypt.hash(value.password, 10)
        user.password = hashedPassword
      }

      user.email = value.email
      user.username = value.username
      user.fullname = value.fullname
      user.profile_picture = value.profile_picture
      user.profile_description = value.profile_description

      const update = await this.userRepository.save(user)
      return res.status(200).json(update)
    } catch (error) {
      res.status(500).json({ error: "Error while updating user" })
    }
  }

  async updatebyJWT(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession
      const user = await this.userRepository.findOne({
        where: { id: loginSession.user.id },
      })
      const data = req.body
      const { error, value } = updateUserSchema.validate(data)

      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }

      // Hash the new password before saving it
      if (value.password) {
        const hashedPassword = await bcrypt.hash(value.password, 10)
        user.password = hashedPassword
      }

      user.email = value.email
      user.username = value.username
      user.fullname = value.fullname
      user.profile_picture = value.profile_picture
      user.profile_description = value.profile_description

      const update = await this.userRepository.save(user)
      // RedisClient.del(loginSession.user.id.toString());
      return res.status(200).json(update)
    } catch (error) {
      res.status(500).json({ error: "Error while updating user" })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const thread = await this.userRepository.findOne({
        where: { id: id },
      })

      if (!thread) return res.status(404).json({ Error: "User ID not found" })

      const response = await this.userRepository.delete({ id: id })
      return res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error: "Bad Request" })
    }
  }

  async follow(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession
      // const followingId = Number(req.body.followingId)

      const follower = await this.userRepository.findOne({
        where: { id: loginSession.user.id },
        relations: ["following"],
      })

      // const following = await this.userRepository.findOne({
      //   where: { id: followingId },
      // })

      await this.userRepository.save(follower)
      return res.status(200).json(follower)
    } catch (error) {
      return res.status(500).json({ error: "Error while following/unfollowing user" })
    }
  }
})()
