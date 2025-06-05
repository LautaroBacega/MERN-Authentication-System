"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { apiInterceptor } from "../utils/apiInterceptor"

export default function TokenExpiryNotification({ secondsRemaining }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Mostrar notificación cuando queden menos de 2 minutos
    if (secondsRemaining <= 120 && secondsRemaining > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [secondsRemaining])

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)
      await apiInterceptor.refreshToken()
      setIsVisible(false)
      setIsRefreshing(false)
    } catch (error) {
      console.error("Error al refrescar token:", error)
      setIsRefreshing(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 max-w-sm w-full bg-orange-50 border border-orange-200 rounded-lg shadow-lg p-4 z-50 animate-slideIn">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-orange-800">Tu sesión está a punto de expirar</p>
          <p className="mt-1 text-sm text-orange-700">
            {secondsRemaining < 60
              ? `Expira en ${secondsRemaining} segundos.`
              : `Expira en ${Math.floor(secondsRemaining / 60)} minutos y ${secondsRemaining % 60} segundos.`}
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {isRefreshing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Refrescando...
                </>
              ) : (
                "Extender sesión"
              )}
            </button>
          </div>
        </div>
        <button onClick={handleClose} className="flex-shrink-0 ml-2 text-orange-400 hover:text-orange-600">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
