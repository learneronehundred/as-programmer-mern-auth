import express from "express";
import {
  checkAuthController,
  forgotPasswordController,
  logInController,
  logOutController,
  resetPasswordController,
  signUpController,
  verifyEmailController,
} from "../controllers/authController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const router = express.Router();

router.get("/check-auth", verifyTokenMiddleware, checkAuthController);

router.post("/signup", signUpController);
router.post("/login", logInController);
router.post("/logout", logOutController);

router.post("/verify-email", verifyEmailController);
router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password/:token", resetPasswordController);

export default router;
