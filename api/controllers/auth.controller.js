import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { sendPasswordResetEmail, sendPasswordResetConfirmation } from "../services/email.service.js"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword })
  try {
    await newUser.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, "Usuario no encontrado"))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, "Contraseña incorrecta"))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: hashedPassword, ...rest } = validUser._doc
    const expiryDate = new Date(Date.now() + 3600000) // 1 hour
    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: hashedPassword, ...rest } = user._doc
      const expiryDate = new Date(Date.now() + 3600000) // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: hashedPassword2, ...rest } = newUser._doc
      const expiryDate = new Date(Date.now() + 3600000) // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!")
}

// Request password reset
export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return next(errorHandler(400, "El email es requerido"))
    }

    console.log("🔍 Password reset requested for:", email)

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      console.log("❌ User not found for email:", email)
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        message: "Si existe una cuenta con ese email, se ha enviado un enlace de restablecimiento.",
      })
    }

    console.log("✅ User found:", user.username, user.email)

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token to user
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = resetTokenExpiry
    await user.save()

    console.log("🔑 Reset token generated and saved")

    // Create reset URL - Usar la URL base correcta según el entorno
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL || req.protocol + "://" + req.get("host")
        : "http://localhost:5173"

    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`

    // Send email
    try {
      await sendPasswordResetEmail(user.email, resetUrl, user.username)

      res.status(200).json({
        message: "Se ha enviado un enlace de restablecimiento a tu dirección de email.",
      })
    } catch (emailError) {
      // Clear the reset token if email fails
      user.resetPasswordToken = null
      user.resetPasswordExpires = null
      await user.save()

      console.error("❌ Email sending failed:", emailError)
      return next(errorHandler(500, "Error al enviar el email. Por favor intentá de nuevo."))
    }
  } catch (error) {
    console.error("❌ Password reset request error:", error)
    next(errorHandler(500, "Error interno del servidor"))
  }
}

// Verify reset token
export const verifyResetToken = async (req, res, next) => {
  try {
    const { token } = req.params

    if (!token) {
      return next(errorHandler(400, "Token de restablecimiento requerido"))
    }

    console.log("🔍 Verificando token:", token)

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      console.log("❌ Token inválido o expirado")
      return next(errorHandler(400, "Token inválido o expirado"))
    }

    console.log("✅ Token válido para usuario:", user.email)

    res.status(200).json({
      message: "Token válido",
      email: user.email,
    })
  } catch (error) {
    console.error("❌ Token verification error:", error)
    next(errorHandler(500, "Error interno del servidor"))
  }
}

// Reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmPassword } = req.body

    console.log("🔄 Restableciendo contraseña con token:", token)

    // Validate input
    if (!token || !password || !confirmPassword) {
      return next(errorHandler(400, "Todos los campos son requeridos"))
    }

    if (password !== confirmPassword) {
      return next(errorHandler(400, "Las contraseñas no coinciden"))
    }

    if (password.length < 6) {
      return next(errorHandler(400, "La contraseña debe tener al menos 6 caracteres"))
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      console.log("❌ Token inválido o expirado para reset")
      return next(errorHandler(400, "Token inválido o expirado"))
    }

    console.log("✅ Token válido, actualizando contraseña para:", user.email)

    // Hash new password
    const hashedPassword = bcryptjs.hashSync(password, 10)

    // Update user password and clear reset token
    user.password = hashedPassword
    user.resetPasswordToken = null
    user.resetPasswordExpires = null
    await user.save()

    console.log("✅ Contraseña actualizada exitosamente")

    // Send confirmation email (optional, don't fail if this fails)
    try {
      await sendPasswordResetConfirmation(user.email, user.username)
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
    }

    res.status(200).json({
      message: "La contraseña ha sido restablecida exitosamente. Ahora podés iniciar sesión con tu nueva contraseña.",
    })
  } catch (error) {
    console.error("Password reset error:", error)
    next(errorHandler(500, "Error interno del servidor"))
  }
}
