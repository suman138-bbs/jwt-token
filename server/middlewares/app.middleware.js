/**Middleware for verify user */

import User from "../model/user.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    let exist = await User.findOne({ username });
    if (!exist) {
      return res
        .status(404)
        .json({ success: false, error: "Can't find  User!" });
    }
    next();
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
