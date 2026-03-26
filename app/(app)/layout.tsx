"use client"

import { AuthProvider } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { CloudsBackground } from "@/components/floating-elements"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        <CloudsBackground />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
