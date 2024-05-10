import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400);
    throw new Error("Invalid message data");
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "userName picture");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "userName picture",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Message not sent");
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "userName picture")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Messages not found");
  }
});

export { sendMessage, allMessages };
