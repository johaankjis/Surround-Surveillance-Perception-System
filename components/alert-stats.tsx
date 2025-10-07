"use client"

import type { Alert } from "@/lib/mock-data"
import { AlertTriangle, Bell, XCircle } from "lucide-react"

interface AlertStatsProps {
  alerts: Alert[]
}

export function AlertStats({ alerts }: AlertStatsProps) {
  const stats = {
    total: alerts.length,
    critical: alerts.filter((a) => a.severity === "critical").length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
    acknowledged: alerts.filter((a) => a.acknowledged).length,
    unacknowledged: alerts.filter((a) => !a.acknowledged).length,
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
        <div className="flex items-center gap-3">
          <XCircle className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.critical}</p>
            <p className="text-sm text-zinc-400">Critical</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-orange-500" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.high}</p>
            <p className="text-sm text-zinc-400">High</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.medium}</p>
            <p className="text-sm text-zinc-400">Medium</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.low}</p>
            <p className="text-sm text-zinc-400">Low</p>
          </div>
        </div>
      </div>
    </div>
  )
}
