import multer = require("multer")
import path = require("path")

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"))
  },
})

const upload = multer({ storage: storage })

export default upload
