const multer = require("multer");
const path = require("path")

const dirname = path.resolve()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(dirname,"client/public/profileImage"))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
