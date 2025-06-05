import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(errorHandler(401, "Access token required"))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Check if token is expired
      if (err.name === "TokenExpiredError") {
        return next(errorHandler(401, "Access token expired"))
      }
      return next(errorHandler(403, "Invalid access token"))
    }

    req.user = user
    next()
  })
}
