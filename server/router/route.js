import { Router } from "express";
import {
  register,
  login,
  getUser,
  generateOtp,
  updateUser,
  verifyOtp,
  createResetSession,
  resetPassword,
} from "../controllers/auth.controller.js";
import Auth from "../middlewares/auth.js";

import { verifyUser } from "../middlewares/app.middleware.js";

const router = Router();

/**Post method */
router.post("/register", register);

router.post("/login", verifyUser, login);
// router.post("/register-mail", );

// router.post("/authenticate", );

/**Get method */

router.get("/user/:username", getUser);

router.get("/generate-otp", generateOtp);
router.get("/verify-otp", verifyOtp);
router.get("/create-reset-session", createResetSession);

/**Put method */

router.put("/update-user", Auth, updateUser);
router.put("/reset-password", resetPassword);
export default router;
