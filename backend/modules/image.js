const mongoose = require("mongoose");

const imageUpload = mongoose.Schema({
  name: {
    type: String,
  },
  ImageUrl: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("imageUpload", imageUpload);
