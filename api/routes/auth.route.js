import express from "express"
import {
  signin,
  signup,
  google,
  signout,
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
  refreshToken,
} from "../controllers/auth.controller.js"

const router = express.Router()

// Existing routes
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)
router.get("/signout", signout)

// Password reset routes
router.post("/request-password-reset", requestPasswordReset)
router.get("/verify-reset-token/:token", verifyResetToken)
router.post("/reset-password", resetPassword)

// Refresh token route
router.post("/refresh-token", refreshToken)

export default router
