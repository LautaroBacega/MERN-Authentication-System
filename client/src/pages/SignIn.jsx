"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LogIn, Mail, Lock } from "lucide-react"
import { useUser } from "../hooks/useUser"
import OAuth from "../components/OAuth"

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const { signIn, loading } = useUser()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      await signIn(formData)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">¡Bienvenido de nuevo!</h1>
          <p className="text-slate-600">Iniciá sesión en tu cuenta para continuar.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Lock size={16} />
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                id="password"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                onChange={handleChange}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors duration-200"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            {/* OAuth */}
            <OAuth />
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              No tienes una cuenta?{" "}
              <Link
                to="/sign-up"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
              >
                Registrarme
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
