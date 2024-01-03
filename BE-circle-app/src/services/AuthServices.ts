import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { Request, Response } from "express"
import { createUserSchema } from "../utils/validators/Thread"

export default new (class AuthServices {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)

  // Fungsi autentikasi
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      // Validasi input menggunakan Joi
      const { error, value } = createUserSchema.validate(body)
      if (error) return res.status(400).json({ message: error.message })

      // Cek apakah username sudah ada di basis data
      const existingUser = await this.userRepository.findOne({
        where: { email: value.email },
      })

      if (existingUser) {
        return res.status(409).json({ message: "Email is already taken" })
      }

      // Hash kata sandi
      const hashedPassword = await bcrypt.hash(value.password, 10)

      // Buat objek pengguna baru
      const newUser = this.userRepository.create({
        fullname: value.fullname,
        username: value.username,
        email: value.email,
        password: hashedPassword,
      })

      // Simpan pengguna baru ke basis data
      const savedUser = await this.userRepository.save(newUser)

      // Kirim respons berhasil bersama dengan token
      return res.status(201).json({ user: savedUser })
    } catch (error) {
      console.error(error)
      return res.status(500).json(error.message)
    }
  }

  // Fungsi login
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      // Temukan pengguna berdasarkan nama pengguna
      const user = await this.userRepository.findOne({
        where: { email },
      })

      // Jika pengguna tidak ditemukan atau kata sandi tidak cocok, kembalikan respons error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid username or password" })
      }

      // Buat token JWT untuk autentikasi
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          fullname: user.fullname,
          username: user.username,
          profile_picture: user.profile_picture,
          profile_description: user.profile_description,
        },
        "tajul-ganteng",
        {
          expiresIn: "1h",
        },
      )

      // res.locals.loginSession = user

      // Kirim respons berhasil bersama dengan token
      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
})()
