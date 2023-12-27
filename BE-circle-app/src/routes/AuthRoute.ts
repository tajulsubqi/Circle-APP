import * as express from "express"
import AuthControllers from "../controllers/AuthControllers"
import AuthMiddlewares from "../middlewares/jwt/AuthJwt"

const router = express.Router()

// Routes for auth
router.post("/register", AuthControllers.register)
router.post("/login", AuthControllers.login)
router.get("/check", AuthMiddlewares.Authentication)

export default router
