const express = require("express");
const loggedInUserOnly = require("../middleware/auth");
const router = express.Router();

const { testing, authenticatedUser } = require("../controllers/testing");
const { login } = require("../controllers/login");
const { signup } = require("../controllers/signup");
const { getAllUsers, getloggedUserDetails } = require("../controllers/user");
const { patchChat, getAllChats } = require("../controllers/chats");
const { saveImage, uploadImage} = require("../controllers/saveAndUploadImage");
const { upload } = require("../multer/multer");

router.get("/", testing);

//sign up
router.route("/signup").post(signup);

//login
router.route("/login").post(login);

// already authenticated User
router.route("/authenticatedUser").get(loggedInUserOnly,authenticatedUser);


//get logged in user details
router.route("/loggedUserDetails").get(loggedInUserOnly, getloggedUserDetails);

//get all users
router.route("/users").get(loggedInUserOnly, getAllUsers);

//upload image to cloudinary
router.route('/upload-img').post(upload.single('profileImage'),saveImage)

//save chats & get chat
router.route("/chats/:user1/:user2").get(loggedInUserOnly, getAllChats);
router.route("/chats").patch(loggedInUserOnly, patchChat);

module.exports = router;
