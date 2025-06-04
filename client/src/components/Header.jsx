"use client"

import { Link } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { User, Home, Info } from "lucide-react"

export default function Header() {
  const { currentUser } = useUser()

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-slate-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/" className="group">
          <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-500 transition-all duration-300">
            Autenticación
          </h1>
        </Link>

        <nav>
          <ul className="flex gap-6 items-center">
            <Link
              to="/"
              className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200"
            >
              <Home size={18} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:block font-medium">Inicio</span>
            </Link>

            <Link
              to="/about"
              className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200"
            >
              <Info size={18} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:block font-medium">Acerca de</span>
            </Link>

            <Link to="/profile" className="group flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <img
                    src={currentUser.profilePicture || "/placeholder.svg"}
                    alt="profile"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500 group-hover:ring-purple-500 transition-all duration-200"
                  />
                  <span className="hidden sm:block text-slate-300 group-hover:text-white font-medium transition-colors duration-200">
                    Perfil
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200">
                  <User size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Iniciar Sesión</span>
                </div>
              )}
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  )
}
