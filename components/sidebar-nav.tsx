"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Video, Bell, BarChart3, Settings, Shield, Activity } from "lucide-react"

const navItems = [
  {
    title: "Live Feed",
    href: "/",
    icon: Video,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Zones",
    href: "/zones",
    icon: Shield,
  },
  {
    title: "System",
    href: "/system",
    icon: Activity,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-black">
      <div className="flex h-16 items-center border-b border-zinc-800 px-6">
        <Shield className="h-6 w-6 text-blue-500" />
        <span className="ml-3 text-lg font-semibold text-white">Surveillance</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm text-zinc-400">System Active</span>
        </div>
      </div>
    </div>
  )
}
