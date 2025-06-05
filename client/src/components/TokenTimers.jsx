"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, Shield, RefreshCw, Calendar } from "lucide-react"
import { apiInterceptor } from "../utils/apiInterceptor"
import { useUser } from "../hooks/useUser"
import TokenExpiryNotification from "./TokenExpiryNotification"

export default function TokenTimers() {
  // Access Token Timer (15 minutos)
  const [accessTokenSeconds, setAccessTokenSeconds] = useState(15 * 60)
  // Refresh Token Timer (7 días)
  const [refreshTokenSeconds, setRefreshTokenSeconds] = useState(7 * 24 * 60 * 60)

  const [isVisible, setIsVisible] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { isLoggedIn, tokenRefreshEvent } = useUser()

  // Función para formatear tiempo según la duración
  const formatTime = (seconds, isLongDuration = false) => {
    if (isLongDuration) {
      const days = Math.floor(seconds / (24 * 60 * 60))
      const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
      const mins = Math.floor((seconds % (60 * 60)) / 60)

      if (days > 0) {
        return `${days}d ${hours}h ${mins}m`
      } else if (hours > 0) {
        return `${hours}h ${mins}m`
      } else {
        return `${mins}m`
      }
    } else {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
  }

  // Función para refrescar manualmente el access token
  const handleManualRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true)
      await apiInterceptor.refreshToken()
      // Reiniciar solo el access token timer
      setAccessTokenSeconds(15 * 60)
      setIsRefreshing(false)
    } catch (error) {
      console.error("Error al refrescar token:", error)
      setIsRefreshing(false)
    }
  }, [])

  // Efecto para reiniciar timers cuando se refresca el token
  useEffect(() => {
    if (tokenRefreshEvent > 0) {
      setAccessTokenSeconds(15 * 60) // Reiniciar access token
      // El refresh token se extiende 7 días más desde ahora
      setRefreshTokenSeconds(7 * 24 * 60 * 60)
    }
  }, [tokenRefreshEvent])

  // Efecto principal para manejar los timers
  useEffect(() => {
    if (!isLoggedIn) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    // Inicializar ambos timers al hacer login
    setAccessTokenSeconds(15 * 60)
    setRefreshTokenSeconds(7 * 24 * 60 * 60)

    const timer = setInterval(() => {
      // Access Token Timer
      setAccessTokenSeconds((prev) => {
        if (prev <= 1) {
          // Cuando el access token expira, se refresca automáticamente
          handleManualRefresh()
          return 15 * 60
        }
        return prev - 1
      })

      // Refresh Token Timer
      setRefreshTokenSeconds((prev) => {
        if (prev <= 1) {
          // Cuando el refresh token expira, se cierra la sesión
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLoggedIn, handleManualRefresh])

  // Determinar colores para access token
  const getAccessTokenColorClass = () => {
    if (accessTokenSeconds <= 60) return "text-red-600 bg-red-50 border-red-200"
    if (accessTokenSeconds <= 5 * 60) return "text-orange-600 bg-orange-50 border-orange-200"
    return "text-blue-600 bg-blue-50 border-blue-200"
  }

  // Determinar colores para refresh token
  const getRefreshTokenColorClass = () => {
    const hoursRemaining = refreshTokenSeconds / (60 * 60)
    if (hoursRemaining <= 24) return "text-red-600 bg-red-50 border-red-200" // Último día
    if (hoursRemaining <= 48) return "text-orange-600 bg-orange-50 border-orange-200" // Últimos 2 días
    return "text-green-600 bg-green-50 border-green-200"
  }

  if (!isVisible) return null

  return (
    <>
      {/* Access Token Timer */}
      <div
        className={`fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg shadow-md border ${getAccessTokenColorClass()} transition-all duration-300 z-40`}
      >
        <Clock size={16} className="flex-shrink-0" />
        <div className="flex flex-col">
          <span className="text-xs font-medium opacity-75">Access Token</span>
          <span className="text-sm font-bold">{formatTime(accessTokenSeconds)}</span>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="ml-1 p-1 rounded-full hover:bg-white/50 transition-colors"
          title="Refrescar access token"
        >
          <RefreshCw size={14} className={`${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Refresh Token Timer */}
      <div
        className={`fixed bottom-20 right-4 flex items-center gap-2 px-3 py-2 rounded-lg shadow-md border ${getRefreshTokenColorClass()} transition-all duration-300 z-40`}
      >
        <Shield size={16} className="flex-shrink-0" />
        <div className="flex flex-col">
          <span className="text-xs font-medium opacity-75">Refresh Token</span>
          <span className="text-sm font-bold">{formatTime(refreshTokenSeconds, true)}</span>
        </div>

        <Calendar size={14} className="ml-1 opacity-60" />
      </div>

      {/* Notificación cuando el access token está a punto de expirar */}
      <TokenExpiryNotification secondsRemaining={accessTokenSeconds} />
    </>
  )
}
