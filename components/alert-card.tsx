"use client"

import type { Alert } from "@/lib/mock-data"
import { AlertTriangle, Bell, CheckCircle, X, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AlertCardProps {
  alert: Alert
  onAcknowledge: (id: string) => void
  onClear: (id: string) => void
}

const severityConfig = {
  low: {
    icon: Bell,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  medium: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  high: {
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  critical: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
}

export function AlertCard({ alert, onAcknowledge, onClear }: AlertCardProps) {
  const config = severityConfig[alert.severity]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "rounded-lg border bg-zinc-950 p-4 transition-all",
        config.border,
        alert.acknowledged && "opacity-50",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={cn("rounded-lg p-2", config.bg)}>
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">{alert.message}</h3>
              {alert.acknowledged && (
                <span className="flex items-center gap-1 text-xs text-green-500">
                  <CheckCircle className="h-3 w-3" />
                  Acknowledged
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
              <span className="capitalize">{alert.severity} severity</span>
              <span>•</span>
              <span className="capitalize">{alert.camera} camera</span>
              <span>•</span>
              <span>Track #{alert.trackId}</span>
              <span>•</span>
              <span className="capitalize">{alert.objectClass}</span>
            </div>
            <div className="mt-1 text-xs text-zinc-500">{new Date(alert.timestamp).toLocaleString()}</div>
          </div>
        </div>
        <div className="flex gap-2">
          {!alert.acknowledged && (
            <Button size="sm" variant="outline" onClick={() => onAcknowledge(alert.id)}>
              Acknowledge
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => onClear(alert.id)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
