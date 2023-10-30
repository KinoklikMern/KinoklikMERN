import User from "../models/User.js";
import Chat from "../models/chatModel.js";

//@description     Get access Chat/ create new chat
//@route           post /chat
//@access          Protected
const accessChat = async (req, res) => {
  const { userId } = req.body;
  const {chatName} = req.body
  console.log("req", req.user)

  // if (!userId) {
  //   console.log("UserId param not sent with request");
  //   return res.sendStatus(400);
  // }
  if (!userId || !chatName) {
    console.log("UserId or chatName not sent with request");
    return res.sendStatus(400);
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "firstName lastName role picture email")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "firstName lastName role picture email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: chatName,
      isGroupChat: false,
      users: [req.user.id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (error) {
      // res.status(400);
      // throw new Error(error.message);
      return res.status(400).json({ error: error.message });
    }
  }
};

//@description     fetch all chat
//@route           get /chat
//@access          Protected
const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "firstName lastName role picture email")
      .populate("latestMessage")
      .sort({ updateAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "firstName lastName role picture email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export { accessChat, fetchChats };
