import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarNav } from "@/components/sidebar-nav"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Surveillance Perception System",
  description: "Real-time vehicle perimeter threat detection",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-black font-sans antialiased">
        <div className="flex">
          <SidebarNav />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
