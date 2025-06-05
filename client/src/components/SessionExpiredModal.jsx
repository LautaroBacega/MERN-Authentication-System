"use client"

import { useState, useEffect } from "react"
import { AlertCircle, X } from "lucide-react"

export default function SessionExpiredModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleSessionExpired = (event) => {
      setMessage(event.detail.message)
      setIsVisible(true)
    }

    window.addEventListener("sessionExpired", handleSessionExpired)

    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-2">Sesión Expirada</h2>

          <p className="text-slate-600 mb-6">{message}</p>

          <div className="text-sm text-slate-500">Serás redirigido al inicio de sesión en unos segundos...</div>
        </div>
      </div>
    </div>
  )
}
