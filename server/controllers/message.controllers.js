import Chat from "../models/chatModel.js";
import User from "../models/User.js";
import Message from "../models/messageModel.js";

//@description     Get all Messages
//@route           GET /message/:chatId
//@access          Protected
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstName lastName role picture email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//@description     Create New Message
//@route           POST /message/
//@access          Protected
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name picture");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "firstName lastName role picture email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    console.log("message", message);
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


export {allMessages,sendMessage}