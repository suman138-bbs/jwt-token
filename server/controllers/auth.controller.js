import bcrypt from "bcrypt";

import JWT from "jsonwebtoken";

import User from "../model/user.model.js";

import { verifyUser } from "../middlewares/app.middleware.js";

export const register = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;

    // Check if the user with the provided username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists" });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a password",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });
    console.log(user);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(404)
        .json({ success: false, message: "Password doesn't match" });
    }

    const token = await JWT.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    if (token) {
      return res.status(200).json({
        message: "User Login Successfully",
        username: user.username,
        token,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error generating token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(404).json({
        success: false,
        message: "please provide a user name",
      });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(501)
        .json({ success: false, message: "Couldn't found username" });
    } else {
      user.password = null;
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "please provide id",
      });
    } else {
      const body = req.body;
      const user = await User.updateOne({ _id: userId }, body);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const generateOtp = async (req, res) => {};
export const verifyOtp = async (req, res) => {};
export const createResetSession = async (req, res) => {};
export const resetPassword = async (req, res) => {};
