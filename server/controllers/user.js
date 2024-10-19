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
    console.log(req.userDetails)
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

module.exports = { getAllUsers, getloggedUserDetails };
