import nodemailer from "nodemailer"

// Create email transporter with Brevo configuration
const createTransporter = () => {
  console.log("🔧 Creating Brevo transporter...")

  // Obtener la URL base para los enlaces de restablecimiento
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL || "https://tu-dominio.com"
      : "http://localhost:5173"

  console.log("🌐 Base URL para enlaces:", baseUrl)

  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    debug: true,
    logger: true,
  })
}

// Email template for password reset
const createResetEmailTemplate = (resetUrl, username) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Restablecer Contraseña</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background-color: white; }
            .button { 
                display: inline-block; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white !important; 
                padding: 14px 28px; 
                text-decoration: none; 
                border-radius: 6px; 
                margin: 20px 0;
                font-weight: bold;
            }
            .footer { 
                background-color: #f8f9fa; 
                padding: 20px; 
                font-size: 14px; 
                color: #666; 
                border-radius: 0 0 8px 8px; 
            }
            .warning { color: #dc3545; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1 style="margin: 0; color: white;">Restablecer Contraseña</h1>
        </div>
        <div class="content">
            <p>Hola <strong>${username}</strong>,</p>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si no realizaste esta solicitud, podés ignorar este email.</p>
            <p>Para restablecer tu contraseña, hacé click en el siguiente botón:</p>
            <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Restablecer Contraseña</a>
            </div>
            <p>O copiá y pegá este enlace en tu navegador:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 4px;">
                <a href="${resetUrl}">${resetUrl}</a>
            </p>
            <p class="warning">⚠️ Este enlace expirará en 1 hora por razones de seguridad.</p>
        </div>
        <div class="footer">
            <p><strong>Consejos de Seguridad:</strong></p>
            <ul style="margin: 10px 0;">
                <li>Nunca compartas tu contraseña con nadie</li>
                <li>Usá una contraseña fuerte y única</li>
                <li>Si no solicitaste este restablecimiento, contactá a soporte</li>
            </ul>
            <p style="margin-top: 20px;">Este es un email automático, por favor no respondas directamente.</p>
        </div>
    </body>
    </html>
  `
}

// Send password reset email
export const sendPasswordResetEmail = async (email, resetUrl, username) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: {
      name: "Sistema de Autenticación",
      address: process.env.SENDER_EMAIL,
    },
    to: email,
    subject: "Restablecer Contraseña - Acción Requerida",
    html: createResetEmailTemplate(resetUrl, username),
  }

  try {
    console.log("📧 Attempting to send email to:", email)
    console.log("📤 From:", process.env.SENDER_EMAIL)
    console.log("🔗 Reset URL:", resetUrl)

    const info = await transporter.sendMail(mailOptions)

    console.log("✅ Password reset email sent successfully!")
    console.log("📧 To:", email)
    console.log("🆔 Message ID:", info.messageId)
    console.log("📋 Response:", info.response)

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Error sending password reset email:", error)
    console.error("📧 Failed recipient:", email)
    throw new Error("Failed to send password reset email")
  }
}

// Send password reset confirmation email
export const sendPasswordResetConfirmation = async (email, username) => {
  const transporter = createTransporter()

  const confirmationTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Contraseña Restablecida</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background-color: #28a745; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background-color: white; }
            .footer { background-color: #f8f9fa; padding: 20px; font-size: 14px; color: #666; border-radius: 0 0 8px 8px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1 style="margin: 0;">✅ Contraseña Restablecida</h1>
        </div>
        <div class="content">
            <p>Hola <strong>${username}</strong>,</p>
            <p>Tu contraseña ha sido restablecida exitosamente. Ahora podés iniciar sesión con tu nueva contraseña.</p>
            <p>Si no realizaste este cambio, por favor contactá a nuestro equipo de soporte inmediatamente.</p>
            <p><strong>Para tu seguridad:</strong></p>
            <ul>
                <li>Mantené tu nueva contraseña segura</li>
                <li>No compartas tus credenciales con nadie</li>
                <li>Considerá habilitar la autenticación de dos factores si está disponible</li>
            </ul>
        </div>
        <div class="footer">
            <p>¡Gracias por usar nuestro servicio!</p>
            <p>Este es un email automático, por favor no respondas directamente.</p>
        </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: {
      name: "Sistema de Autenticación",
      address: process.env.SENDER_EMAIL,
    },
    to: email,
    subject: "Contraseña Restablecida Exitosamente",
    html: confirmationTemplate,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Password reset confirmation sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return { success: false, error: error.message }
  }
}
