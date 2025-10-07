"use client"

import { useDetectionEngine } from "@/lib/detection-engine"
import { AlertCard } from "@/components/alert-card"
import { AlertStats } from "@/components/alert-stats"
import { Button } from "@/components/ui/button"
import { Filter, Download } from "lucide-react"
import { useState } from "react"
import type { ThreatLevel } from "@/lib/mock-data"

export default function AlertsPage() {
  const { alerts, acknowledgeAlert, clearAlert } = useDetectionEngine()
  const [filter, setFilter] = useState<ThreatLevel | "all">("all")

  const filteredAlerts = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter)

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Alert Management</h1>
          <p className="mt-1 text-zinc-400">Monitor and respond to security alerts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <AlertStats alerts={alerts} />
      </div>

      <div className="mb-4 flex gap-2">
        <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All ({alerts.length})
        </Button>
        <Button size="sm" variant={filter === "critical" ? "default" : "outline"} onClick={() => setFilter("critical")}>
          Critical
        </Button>
        <Button size="sm" variant={filter === "high" ? "default" : "outline"} onClick={() => setFilter("high")}>
          High
        </Button>
        <Button size="sm" variant={filter === "medium" ? "default" : "outline"} onClick={() => setFilter("medium")}>
          Medium
        </Button>
        <Button size="sm" variant={filter === "low" ? "default" : "outline"} onClick={() => setFilter("low")}>
          Low
        </Button>
      </div>

      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-12 text-center">
            <p className="text-zinc-500">No alerts to display</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onAcknowledge={acknowledgeAlert} onClear={clearAlert} />
          ))
        )}
      </div>
    </div>
  )
}
