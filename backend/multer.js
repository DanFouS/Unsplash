const multer = require("multer");

const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    let x = path.extname(file.originalname);
    if (x !== ".jpg" && x !== ".png" && x !== ".jpeg") {
      callback(new Error("File type is not supported"), false);
      return;
    }
    callback(null, true);
  },
});
