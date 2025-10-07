import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({ title, value, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <div className={cn("rounded-lg border border-zinc-800 bg-zinc-950 p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-zinc-900 p-2">
            <Icon className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">{title}</p>
            <p className="text-2xl font-semibold text-white">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={cn("text-sm font-medium", trend.isPositive ? "text-green-500" : "text-red-500")}>
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </div>
        )}
      </div>
    </div>
  )
}
