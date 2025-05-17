"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  username: string
  email: string
  avatar: string
  connected?: boolean
  accountId?: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  connectInstagram: (connected: boolean, accountId?: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("instagram_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("instagram_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("instagram_user")
  }

  const connectInstagram = (connected: boolean, accountId?: string) => {
    if (user) {
      const updatedUser = { ...user, connected, accountId }
      setUser(updatedUser)
      localStorage.setItem("instagram_user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, connectInstagram }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
