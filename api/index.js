import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"

dotenv.config()

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Determine if we're in development or production
const isDevelopment = process.env.NODE_ENV !== "production"

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // En producción, permitir solicitudes sin origin (mismo dominio)
    if (!origin) return callback(null, true)

    // Lista de orígenes permitidos
    const allowedOrigins = [
      "http://localhost:5173", // Vite dev server
      "http://localhost:3000", // Backend local
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
      "https://mern-auth-complete-3kwj.onrender.com", // Tu dominio de Render
      process.env.FRONTEND_URL, // Variable de entorno para flexibilidad
    ].filter(Boolean) // Filtrar valores undefined

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log("❌ CORS blocked origin:", origin)
      // En producción, ser más permisivo para archivos estáticos
      if (!isDevelopment) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
}

// Aplicar CORS solo en desarrollo o para rutas API específicas
if (isDevelopment) {
  app.use(cors(corsOptions))
  console.log("🔧 Running in DEVELOPMENT mode")
} else {
  console.log("🚀 Running in PRODUCTION mode")
  // En producción, aplicar CORS solo a rutas API
  app.use("/api", cors(corsOptions))
}

// Middleware para parsear JSON y cookies
app.use(express.json())
app.use(cookieParser())

// Logging middleware para debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.get("Origin")}`)
  next()
})

// API routes
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

// En producción, servir archivos estáticos
if (!isDevelopment) {
  // Servir archivos estáticos desde client/dist
  app.use(express.static(path.join(__dirname, "../client/dist")))

  // Manejar todas las rutas que no son API (SPA routing)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"))
  })
}

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  console.error(`❌ Error ${statusCode}: ${message}`)
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
  if (isDevelopment) {
    console.log(`🌐 CORS enabled for development origins`)
  } else {
    console.log(`🌐 Production mode - serving static files`)
  }
})
