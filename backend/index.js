// const cors = require("cors");
// const { url } = require("inspector");
const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const fs = require("fs");
const app = express();

// app.use(cors({ origin: "*" }));
// app.use(bodyParser.json);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("IT WORKS!");
});

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
    console.warn("test");
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
