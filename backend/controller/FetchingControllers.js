const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/AdminModel");
const { Post } = require("../models/PostModel");
const { User } = require("../models/UserModel");

const fetchAllPosts = async (req, res) => {
  try {
    const Posts = await Post.find().populate("uploader", "username"); // Populate uploader field with username

    return res.status(200).json(Posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
const fetchOnePost = async (req, res) => {
  // Res id
  try {
    const PostId = req.params.id; // Assuming the Blog ID is passed in the request URL

    // Find the Blog by ID
    const Posts = await Post.findById(PostId).populate(
      "uploader",
      "username name"
    );

    if (!Posts) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // If the Blog is found, send it to the client
    return res.status(200).json({ Posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
const fetchAllUsers = async (req, res) => {
  try {
    // Ensure the user accessing this endpoint is an admin
    const adminUsername = req.username;
    const admin = await Admin.findOne({ username: adminUsername });
    if (!admin) {
      return res
        .status(401)
        .json({ error: "Unauthorized access. Admin privileges required." });
    }

    // Fetch all users data
    const users = await User.find({}, { password: 0 }); // Excluding password from the response

    // Send the users data to the client
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const fetchAllPostsOfUser = async (req, res) => {
  try {
    // Assuming req.username is set by your middleware
    const username = req.username;

    // Find the user based on the username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find all Blogs by the user
    const Posts = await Post.find({ uploader: user._id });

    return res.status(200).json(Posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userdata = async (req, res) => {
  try {
    const username = req.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ uploader: user._id });

    return res.status(200).json({ user, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  fetchAllPosts,
  fetchAllUsers,
  fetchOnePost,
  fetchAllPostsOfUser,
  userdata,
};
