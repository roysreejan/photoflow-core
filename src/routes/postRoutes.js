const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = require("../middleware/multer");
const { createPost, getAllPosts, getUserPosts, saveOrUnsavePost } = require("../controllers/postController");

const router = express.Router();

router.post(
  "/create-post",
  isAuthenticated,
  upload.single("image"),
  createPost
);
router.get("/all", getAllPosts);
router.get("/user-post/:id", getUserPosts);
router.post("/save-unsave-post/:postId", isAuthenticated, saveOrUnsavePost);

module.exports = router;
