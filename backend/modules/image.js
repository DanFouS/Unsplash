const mongoose = require("mongoose");

const imageUpload = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("imageUpload", imageUpload);
