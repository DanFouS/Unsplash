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
const fetchRoute = require("../backend/routes/user-routes");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("IT WORKS!");
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;

db.once("open", function () {
  console.log("mongoose connected successfully");
});

db.on("error", function (error) {
  console.error("error mongoose didnt connect", error);
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
//mw
app.use(express.json());

//R
app.use("/upload-images", require("./routes/user-routes"));

app.use("/", fetchRoute);

app.listen(5000, () => console.warn("server is running on port 5000"));
module.exports.db = db;
