import Conversation from "../model/conversation.model.js";

export const newConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const existingConversation = await Conversation.findOne({
      members: { $all: [receiverId, senderId] },
    });

    if (existingConversation) {
      return res.status(200).json({
        success: true,
        message: "Conversation already exists",
      });
    }

    const newConver = new Conversation({
      members: [senderId, receiverId],
    });

    await newConver.save();
    return res.status(200).json({
      success: true,
      message: "Conversation saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: `${error.message}`,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const conversation = await Conversation.findOne({
      members: { $all: [receiverId, senderId] },
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched conversation",
      conversation: conversation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
