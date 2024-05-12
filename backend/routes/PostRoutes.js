const express = require("express");
const router = express.Router();
const {
  fetchAllPosts,
  fetchOnePost,
  fetchAllPostsOfUser,
} = require("../controller/FetchingControllers");
const { userAuth } = require("../middlewares/userauth");
const { adminAuth } = require("../middlewares/adminauth");

const { addPost } = require("../controller/AddControllers");
const { deletePost } = require("../controllers/DeleteControllers");

router.get("/getAllPosts", fetchAllPosts);
router.get("/user/getAllPosts", userAuth, fetchAllPostsOfUser);
router.get("/getOnePosts/:id", fetchOnePost);
router.post("/addpost", userAuth, addPost);
router.delete("/deletepost/:id", adminAuth, deletePost);

module.exports = router;
