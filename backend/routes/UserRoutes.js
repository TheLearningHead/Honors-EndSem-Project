const express = require("express");
const router = express.Router();
const { userLogin, userSignIn } = require("../controller/AuthControllers");
const {
  fetchAllUsers,
  userdata,
} = require("../controller/FetchingControllers");
const { deleteUser } = require("../controller/DeleteControllers");
const { userAuth } = require("../middlewares/userauth");

const { adminAuth } = require("../middlewares/adminauth");

router.post("/user/signin", userSignIn);
router.post("/user/login", userLogin);

router.get("/getAllUsers", adminAuth, fetchAllUsers);

router.get("/fetchuser", userAuth, userdata);
router.delete("/deleteUser/:id", adminAuth, deleteUser);

module.exports = router;
