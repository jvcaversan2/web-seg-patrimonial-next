"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { Dashboard } from "@/components/dashboard"
import { AuditProvider } from "@/components/audit-context"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AuditProvider>
      {!isAuthenticated ? <LoginScreen onLogin={() => setIsAuthenticated(true)} /> : <Dashboard />}
    </AuditProvider>
  )
}
