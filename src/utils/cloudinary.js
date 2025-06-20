const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});

const uploadToCloudinary = async (fileUri) => {
  try {
    const uri = typeof fileUri === "string" ? fileUri : fileUri.content;
    const response = await cloudinary.uploader.upload(uri);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

module.exports = { uploadToCloudinary, cloudinary };
