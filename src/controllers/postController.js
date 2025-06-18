const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sharp = require("sharp");
const { uploadToCloudinary } = require("../utils/cloudinary");
const Post = require("../models/postModel");
const User = require("../models/userModel");

exports.createPost = catchAsync(async (req, res, next) => {
  const { caption } = req.body;
  const image = req.file;
  const userId = req.user.id;

  if (!image) {
    return next(new AppError("Image is required for the post", 400));
  }

  const optimizedImageBuffer = await sharp(image.buffer)
    .resize({ width: 800, height: 800, fit: "inside" })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();

  const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
    "base64"
  )}`;

  const cloudResponse = await uploadToCloudinary(fileUri);
  let post = await Post.create({
    caption,
    image: {
      url: cloudResponse.secure_url,
      publicId: cloudResponse.public_id,
    },
    user: userId,
  });

  const user = await User.findById(userId);

  if (user) {
    user.posts.push(post.id);
    await user.save({ validateBeforeSave: false });
  }

  post = await post.populate({
    path: "user",
    select: "username email bio profilePicture",
  });

  res.status(201).json({
    status: "success",
    message: "Post created",
    data: {
      post,
    },
  });
});
