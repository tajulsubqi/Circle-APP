import * as express from "express"
import ThreadsController from "../controllers/ThreadsController"
import upload from "../middlewares/multer/multer"

const threadRouter = express.Router()

// Routes for threads
threadRouter.get("/threads", ThreadsController.getAllThreads)
threadRouter.get("/threads/:id", ThreadsController.getThreadById)
threadRouter.post("/threads", upload.single("image"), ThreadsController.createThread)
threadRouter.put("/threads/:id", ThreadsController.updateThread)
threadRouter.delete("/threads/:id", ThreadsController.deleteThread)

export default threadRouter
