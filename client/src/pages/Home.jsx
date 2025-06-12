"use client"

import { Link } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { Shield, Users, Zap, Lock, Mail, Key } from "lucide-react"

export default function Home() {
  const { currentUser } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Sistema de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Autenticación
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Una solución completa de autenticación con registro, inicio de sesión, OAuth con Google, gestión de perfiles
            y restablecimiento de contraseñas.
          </p>

          {!currentUser ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sign-up"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Comenzar Ahora
              </Link>
              <Link
                to="/sign-in"
                className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
              >
                Iniciar Sesión
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={currentUser.profilePicture || "/placeholder.svg?height=48&width=48"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-slate-800">¡Hola, {currentUser.username}!</h3>
                  <p className="text-sm text-slate-600">{currentUser.email}</p>
                </div>
              </div>
              <Link
                to="/profile"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 inline-block text-center"
              >
                Ver Perfil
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Seguridad Avanzada</h3>
            <p className="text-slate-600">
              Autenticación segura con JWT, encriptación de contraseñas y protección contra ataques comunes.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">OAuth Integrado</h3>
            <p className="text-slate-600">
              Inicio de sesión rápido con Google OAuth para una experiencia de usuario fluida.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Fácil Implementación</h3>
            <p className="text-slate-600">
              API REST bien documentada y componentes React listos para usar en tus proyectos.
            </p>
          </div>
        </div>

        {/* Password Reset Feature Highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restablecimiento de Contraseñas</h2>
            <p className="text-xl mb-8 opacity-90">
              Sistema completo de recuperación de contraseñas con emails seguros y tokens temporales.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <Mail className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Email Seguro</h3>
                <p className="text-sm opacity-80">Envío de enlaces de restablecimiento por email con Brevo SMTP</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <Key className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Tokens Seguros</h3>
                <p className="text-sm opacity-80">Generación de tokens únicos con expiración automática</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <Lock className="h-8 w-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Validación Robusta</h3>
                <p className="text-sm opacity-80">Verificación de tokens y validación de contraseñas</p>
              </div>
            </div>

            {!currentUser && (
              <div className="mt-8">
                <Link
                  to="/forgot-password"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
                >
                  Probar Restablecimiento
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Tecnologías Utilizadas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS", "Firebase", "Nodemailer", "Brevo"].map(
              (tech) => (
                <span
                  key={tech}
                  className="bg-white px-4 py-2 rounded-full shadow-md border border-slate-200 text-slate-700 font-medium"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
