const { Post } = require("../models/PostModel");
const { User } = require("../models/UserModel");

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find all blogs uploaded by the user
    const userPosts = await Post.find({ uploader: userId });

    // Delete all blogs uploaded by the user
    await Post.deleteMany({ uploader: userId });

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    return res
      .status(200)
      .json({ message: "User and associated blogs deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if the blog exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Find the user who uploaded the blog
    const user = await User.findById(post.uploader);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the blog ID from the user's uploaded Blogs array
    user.uploadedPosts = user.uploadedPosts.filter(
      (id) => id.toString() !== postId
    );
    await user.save();

    // Delete the post from the database
    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { deleteUser, deletePost };
