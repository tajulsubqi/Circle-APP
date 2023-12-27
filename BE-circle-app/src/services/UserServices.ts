import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"

export default new (class UserService {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  getAllUsers = async () => {
    try {
      return await this.userRepository.find()
    } catch (error) {
      console.log(error)

      throw new Error("Error fetching users")
    }
  }

  getUserById = async (userId: number) => {
    try {
      return await this.userRepository.findOneBy({
        id: userId,
      })
    } catch (error) {
      throw new Error("Error fetching user by ID")
    }
  }

  updateUser = async (userId: number, userData: Partial<User>) => {
    try {
      const user = await this.userRepository.findOneBy({
        id: userId,
      })

      if (!user) {
        throw new Error("User not found")
      }

      Object.assign(user, userData)

      return await this.userRepository.save(user)
    } catch (error) {
      throw new Error("Error updating user")
    }
  }

  deleteUser = async (userId: number) => {
    try {
      const user = await this.userRepository.findOneBy({
        id: userId,
      })

      if (!user) {
        throw new Error("User not found")
      }

      await this.userRepository.remove(user)
    } catch (error) {
      throw new Error("Error deleting user")
    }
  }
})()
