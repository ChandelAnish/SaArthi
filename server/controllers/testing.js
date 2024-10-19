const chats = require("../model/chats");
const user = require("../model/users");

const testing = (req, res) => {
  res.send("hello");
};

const authenticatedUser = (req, res) => {
  res.json({login: true});
};



module.exports = { testing, authenticatedUser };