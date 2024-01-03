import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default new (class AuthenticationMiddleware {
  Authentication(req: Request, res: Response, next: NextFunction): Response {
    const authorizanationHeader = req.headers.authorization

    if (!authorizanationHeader || !authorizanationHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authorizanationHeader.split(" ")[1]

    try {
      const loginSession = jwt.verify(token, "tajul-ganteng")
      res.locals.loginSession = loginSession

      next()
    } catch (error) {
      return res.status(401).json({ message: "token not valid" })
    }
  }
})()
