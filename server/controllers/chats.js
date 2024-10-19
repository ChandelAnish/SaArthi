const chats = require("../model/chats");


//patch chat
const patchChat = async (req, res) => {
  try {
    // findOneAndUpdate(filter,update data,options)
    const allChats = await chats.findOneAndUpdate(
      { user1: req.body.sender, user2: req.body.receiver },
      { $push: { messages: req.body } },
      { new: true, useFindAndModify: false }
    );

    if (!allChats) {
      const allChats = await chats.findOneAndUpdate(
        { user1: req.body.receiver, user2: req.body.sender },
        { $push: { messages: req.body } },
        { new: true, useFindAndModify: false }
      );
    }
    res.status(200).json(allChats);
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

//get all chats
const getAllChats = async (req, res) => {
  try {
    // console.log(req.params);
    let allChats = await chats.findOne(req.params);
    if (!allChats) {
      allChats = await chats.findOne({
        user1: req.params.user2,
        user2: req.params.user1,
      });
    }
    if (allChats) {
      return res.status(200).json(allChats);
    } else {
      const newConversation = await chats.create({
        ...req.params,
        messages: [],
      });
      return res.status(200).json(newConversation);
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ msg: "some error occurred" });
  }
};

module.exports = { getAllChats, patchChat };
