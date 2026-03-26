"use client"

import { AuthProvider } from "@/lib/auth-context"
import { CloudsBackground } from "@/components/floating-elements"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        <CloudsBackground />
        {children}
      </div>
    </AuthProvider>
  )
}
