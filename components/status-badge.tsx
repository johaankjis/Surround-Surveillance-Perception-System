import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "active" | "inactive" | "warning" | "error"
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium", {
        "bg-green-500/10 text-green-500": status === "active",
        "bg-zinc-800 text-zinc-400": status === "inactive",
        "bg-yellow-500/10 text-yellow-500": status === "warning",
        "bg-red-500/10 text-red-500": status === "error",
      })}
    >
      <div
        className={cn("h-1.5 w-1.5 rounded-full", {
          "bg-green-500": status === "active",
          "bg-zinc-400": status === "inactive",
          "bg-yellow-500": status === "warning",
          "bg-red-500": status === "error",
        })}
      />
      {children}
    </div>
  )
}
