const user = require("../model/users");

//get logged User Details
const getloggedUserDetails = async (req, res) => {
  try {
    // console.log(req.userDetails)
    res.status(200).json(req.userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "some error occurred" });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    // console.log(req.userDetails)
    let allUsers = await user.find({});
    allUsers = allUsers.filter((item) => {
      return item.email != req.userDetails.email;
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

//update user info
const updateUserInfo = async (req,res)=>{
  try {
    const updateUserInfo = await user.findOneAndUpdate({email: req.userDetails.email},req.body,{ new: true, runValidators: true })
    // console.log(updateUserInfo)
    res.status(201).json({msg: "user updated successfully", updatation: true ,updateUserInfo})
  } catch (error) {
    res.status(201).json({msg: "user updatation unsuccessfully", updatation: false})
    console.log(error)
    console.log(error.response.data)
  }
}

module.exports = { getAllUsers, getloggedUserDetails, updateUserInfo };
