"use client"

import type { SystemMetrics } from "@/lib/mock-data"
import { Activity, Cpu, Gauge, Target } from "lucide-react"
import { MetricCard } from "./metric-card"

interface SystemStatusProps {
  metrics: SystemMetrics
  isRunning: boolean
}

export function SystemStatus({ metrics, isRunning }: SystemStatusProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Frame Rate"
        value={`${metrics.fps.toFixed(1)} FPS`}
        icon={Activity}
        trend={{ value: 2.3, isPositive: true }}
      />
      <MetricCard
        title="Latency"
        value={`${metrics.latency.toFixed(0)}ms`}
        icon={Gauge}
        trend={{ value: -5.2, isPositive: true }}
      />
      <MetricCard
        title="GPU Usage"
        value={`${metrics.gpuUtilization.toFixed(0)}%`}
        icon={Cpu}
        trend={{ value: 3.1, isPositive: false }}
      />
      <MetricCard title="Active Tracks" value={metrics.trackingCount} icon={Target} />
    </div>
  )
}
