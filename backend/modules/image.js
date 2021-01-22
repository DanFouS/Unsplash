const mongoose = require("mongoose");

const imageUpload = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
    required: true,
    cloudinary_id: { type: String },
  },
});

module.exports = mongoose.model("imageUpload", imageUpload);
