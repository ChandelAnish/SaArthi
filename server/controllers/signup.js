const { uploadOnCloudinary } = require("../cloudinaryFunctions/cloudinaryFunctions");
const user = require("../model/users");
const path = require("path")

const dirname = path.resolve()

//signup
const signup = async (req, res) => {
  // console.log(req.body)
  try {
    const { name, email, password, disability, profileImgName } = req.body;

    // Check if email already exists
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ signup: false, msg: "Email already exists" });
    }

    //upload profile image to cloudinary
    let profileImageURL;
    let newUser;
    if(profileImgName){
        const filePath = path.join(dirname,"client/public/profileImage",profileImgName)
        profileImageURL = await uploadOnCloudinary(filePath)
        // Create new user
        newUser = await user.create({ name, email, password, disability, profileImageURL });
      }
      else{
      newUser = await user.create({ name, email, password, disability });
    }


    res.status(200).json({ signup: true, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

module.exports = { signup };
