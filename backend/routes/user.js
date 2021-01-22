const router = require("express").Router();
const cloudinary = require("../cloudinary");
const upload = require("../multer");
const imageUpload = require("../modules/image");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let image = new imageUpload({
      name: req.body.name,
      ImageUrl: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await image.save();
    res.json(image);
    // res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let image = await imageUpload.find();
    res.json(image);
    console.log("image  :", image);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let image = await imageUpload.findById(req.params.id);
    await cloudinary.uploader.destroy(image.cloudinary_id);
    await image.remove();
    res.json(image);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
