const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("IT WORKS!");
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

//mw
app.use(express.json());

//R
app.use("/upload-images", require("./routes/user"));

app.listen(5000, () => console.warn("server is running on port 5000"));
