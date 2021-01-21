const express = require("express");
const router = express.Router();
const imageUpload = require("../modules/image");

router.get("/fetched", async (req, res) => {
  try {
    const imageFetched = await imageUpload.find();
    console.log("image fetched :", imageFetched);
    res
      .status(200)
      .json({ message: "Fetched from db successfully", imageFetched });
  } catch (err) {
    res.status(500).json({ errorGettingFromDB: err.message });
  }
});

module.exports = router;
