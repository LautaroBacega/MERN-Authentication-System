"use client"

import { createContext, useEffect, useState } from "react"
import { apiInterceptor } from "../utils/apiInterceptor"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokenRefreshEvent, setTokenRefreshEvent] = useState(0)

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setCurrentUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        localStorage.removeItem("currentUser")
      }
    }
  }, [])

  // Register token refresh callback
  useEffect(() => {
    apiInterceptor.onTokenRefreshed(() => {
      // Trigger a state update to notify components
      setTokenRefreshEvent((prev) => prev + 1)
    })
  }, [])

  // Save user to localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  const signIn = async (formData) => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        throw new Error(data.message || "Sign in failed")
      }

      setCurrentUser(data)
      setIsLoggedIn(true)
      setLoading(false)

      // Trigger token refresh event to reset timer
      setTokenRefreshEvent((prev) => prev + 1)

      return { success: true, data }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signInWithGoogle = async (userData) => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })
      const data = await res.json()

      setCurrentUser(data)
      setIsLoggedIn(true)
      setLoading(false)

      // Trigger token refresh event to reset timer
      setTokenRefreshEvent((prev) => prev + 1)

      return { success: true, data }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const updateUser = async (userId, formData) => {
    try {
      setLoading(true)
      const res = await apiInterceptor.fetchWithAuth(`/api/user/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        throw new Error(data.message || "Update failed")
      }

      setCurrentUser(data)
      setLoading(false)
      return { success: true, data }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const deleteUser = async (userId) => {
    try {
      setLoading(true)
      const res = await apiInterceptor.fetchWithAuth(`/api/user/delete/${userId}`, {
        method: "DELETE",
      })
      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        throw new Error(data.message || "Delete failed")
      }

      setCurrentUser(null)
      setIsLoggedIn(false)
      setLoading(false)
      return { success: true, data }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await fetch("/api/auth/signout", {
        credentials: "include",
      })
      setCurrentUser(null)
      setIsLoggedIn(false)
    } catch (error) {
      console.log("Sign out error:", error)
      // Still clear local state even if API call fails
      setCurrentUser(null)
      setIsLoggedIn(false)
    }
  }

  const value = {
    currentUser,
    loading,
    isLoggedIn,
    tokenRefreshEvent,
    signIn,
    signInWithGoogle,
    updateUser,
    deleteUser,
    signOut,
    setCurrentUser,
    setLoading,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
