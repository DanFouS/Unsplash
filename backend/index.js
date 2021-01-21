const cors = require("cors");
// const { url } = require("inspector");
const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("IT WORKS!");
});

// mngdb

// mongoose.connect("mongodb://localhost:27017/taswira");

// const taswira = new imageSchema({ img: { data: Buffer, contentType: String } });
// const image = mongoose.model("image", taswira);

// app.use(
//   multer({
//     dest: "./uploads/",
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//   })
// );

// app.post("/upload-image", function (req, res) {
//   var newImage = new image();
//   newImage.img.data = fs.readFileSync(req.files.userPhoto.path);
//   newImage.img.contentType = "image/png";
//   newImage.save();
// });

// post request to cloudinary
app.use("/upload-images", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "images");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);

      fs.unlinkSync(path);
    }
    console.warn("IT WORKS I SWEAR IT WORKS");
    res.status(200).json({
      message: "image uploaded successfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: "error check again your image wasn't uploaded",
    });
  }
});
app.listen(5000, () => console.warn("server is running on port 5000"));
