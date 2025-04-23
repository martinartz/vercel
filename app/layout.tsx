import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import DashboardLayout from "@/components/dashboard-layout"
import { UserManagementProvider } from "@/contexts/user-management-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Cakesify - Bakery Dashboard",
  description: "Manage your bakery business with Cakesify",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserManagementProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </UserManagementProvider>
      </body>
    </html>
  )
}
