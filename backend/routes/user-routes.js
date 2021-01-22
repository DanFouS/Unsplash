const express = require("express");
const router = express.Router();
const imageUpload = require("../modules/image");

router.get("/fetched", async (req, res) => {
  try {
    const imageFetched = await imageUpload.find();

    let image = new imageUpload({
      ImageUrl: result.secure_url,
      label: req.body.label,
      cloudinary_id: result.public_id,
    });
    console.log(result);

    //save image
    await image.save();
    res.json(image);

    console.log("image fetched :", imageFetched);
    res
      .status(200)
      .json({ message: "Fetched from db successfully", imageFetched });
  } catch (err) {
    res.status(500).json({ errorGettingFromDB: err.message });
  }
});

module.exports = router;
