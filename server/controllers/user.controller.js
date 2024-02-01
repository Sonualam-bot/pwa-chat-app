import User from "../model/user.model.js";

export const addUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ sub: req.body.sub });

    if (userExist) {
      res.status(200).json({
        success: true,
        message: "User Already exist",
      });
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User added",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to add user ${error.message} `,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      success: true,
      message: "Successfully fetched Users",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `users doesn't exist ${error.message}`,
    });
  }
};
