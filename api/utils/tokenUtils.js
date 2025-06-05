import jwt from "jsonwebtoken"
import crypto from "crypto"

// Generate access token (short-lived)
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m", // 15 minutes
  })
}

// Generate refresh token (long-lived)
export const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex")
}

// Verify access token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error("Invalid or expired access token")
  }
}

// Calculate refresh token expiry (7 days)
export const getRefreshTokenExpiry = () => {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
}
