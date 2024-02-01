import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const newMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    await newMessage.save();

    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
    });

    return res.status(200).json({
      success: false,
      message: "Message has been sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params._id });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
