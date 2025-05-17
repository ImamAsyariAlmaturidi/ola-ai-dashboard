"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  // Note: Authentication check is disabled for preview purposes
  // Normally, we would redirect unauthenticated users to the login page
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login")
  //   }
  // }, [user, router])

  // Remove this conditional check to allow preview without authentication
  // if (!user) {
  //   return null
  // }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </div>
  )
}
