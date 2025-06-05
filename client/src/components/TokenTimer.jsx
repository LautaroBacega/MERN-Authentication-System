"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, RefreshCw } from "lucide-react"
import { apiInterceptor } from "../utils/apiInterceptor"
import { useUser } from "../hooks/useUser"
import TokenExpiryNotification from "./TokenExpiryNotification"

export default function TokenTimer() {
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60) // 15 minutos iniciales
  const [isVisible, setIsVisible] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { isLoggedIn, tokenRefreshEvent } = useUser()

  // Función para formatear segundos como mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Función para refrescar manualmente el token
  const handleManualRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true)
      await apiInterceptor.refreshToken()
      // Reiniciar el temporizador
      setSecondsRemaining(15 * 60)
      setIsRefreshing(false)
    } catch (error) {
      console.error("Error al refrescar token:", error)
      setIsRefreshing(false)
    }
  }, [])

  // Efecto para reiniciar el temporizador cuando se refresca el token
  useEffect(() => {
    if (tokenRefreshEvent > 0) {
      setSecondsRemaining(15 * 60) // Reiniciar a 15 minutos
    }
  }, [tokenRefreshEvent])

  // Efecto para iniciar el temporizador cuando se monta el componente
  useEffect(() => {
    // Solo mostrar el temporizador si el usuario está logueado
    if (!isLoggedIn) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    setSecondsRemaining(15 * 60) // Reiniciar a 15 minutos al iniciar sesión

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Cuando llega a cero, intentamos refrescar automáticamente
          handleManualRefresh()
          return 15 * 60 // Reiniciar a 15 minutos
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLoggedIn, handleManualRefresh])

  // Determinar el color basado en el tiempo restante
  const getColorClass = () => {
    if (secondsRemaining <= 60) return "text-red-600 bg-red-50 border-red-200" // Último minuto
    if (secondsRemaining <= 5 * 60) return "text-orange-600 bg-orange-50 border-orange-200" // Últimos 5 minutos
    return "text-blue-600 bg-blue-50 border-blue-200" // Normal
  }

  // No mostrar nada si no está visible
  if (!isVisible) return null

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full shadow-md border ${getColorClass()} transition-all duration-300 z-40`}
      >
        <Clock size={16} className="flex-shrink-0" />
        <span className="text-sm font-medium">{formatTime(secondsRemaining)}</span>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="ml-1 p-1 rounded-full hover:bg-white/50 transition-colors"
          title="Refrescar sesión"
        >
          <RefreshCw size={14} className={`${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Notificación cuando está a punto de expirar */}
      <TokenExpiryNotification secondsRemaining={secondsRemaining} />
    </>
  )
}
