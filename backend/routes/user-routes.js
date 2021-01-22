const express = require("express");
const router = express.Router();
const imageUpload = require("../modules/image");
const cloudinary = require("../cloudinary");
const upload = require("../multer");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    let image = new imageUpload({
      label: req.body.label,
      ImageUrl: result.secure_url,
      cloudinary_id: result.public_id,
    });
    console.log(result);

    await image.save();
    res.json(image);

    res.json(result);
  } catch {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let imageFetched = await imageUpload.find();

    console.log("image fetched :", imageFetched);
    res
      .status(200)
      .json({ message: "Fetched from db successfully", imageFetched });
  } catch (err) {
    res.status(500).json({ errorGettingFromDB: err.message });
  }
});



module.exports = router;
