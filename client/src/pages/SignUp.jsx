"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserPlus, Mail, Lock, User } from "lucide-react"
import OAuth from "../components/OAuth"

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(true)
        return
      }
      navigate("/sign-in")
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Crear Cuenta</h1>
          <p className="text-slate-600">Integrá autenticación segura en tus proyectos en minutos.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User size={16} />
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre"
                id="username"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={handleChange}
              />
            </div>

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
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? "Creando cuenta..." : "Registrarme"}
            </button>

            {/* OAuth */}
            <OAuth />
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Ya tenes una cuenta?{" "}
              <Link
                to="/sign-in"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm text-center">Algo salió mal! Por favor intentá de nuevo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
