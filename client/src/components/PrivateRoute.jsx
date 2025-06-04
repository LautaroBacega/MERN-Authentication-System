"use client"

import { useUser } from "../hooks/useUser"
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoute() {
  const { currentUser } = useUser()
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}
