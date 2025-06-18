const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = require("../middleware/multer");
const { createPost, getAllPosts, getUserPosts } = require("../controllers/postController");

const router = express.Router();

router.post(
  "/create-post",
  isAuthenticated,
  upload.single("image"),
  createPost
);
router.get("/all", getAllPosts);
router.get("/user-post/:id", getUserPosts);

module.exports = router;
