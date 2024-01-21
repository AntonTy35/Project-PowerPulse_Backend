const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "recipe") {
      folder = "recipe";
    } else {
      folder = "misc";
    }

    const width = req.query.width || 350;
    const height = req.query.height || 350;

    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: file.originalname,
      transformation: [{ width: width, height: height }],
    };
  },
});

const updateAvatar = multer({ storage });

module.exports = updateAvatar;
