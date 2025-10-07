"use client"

import type { TrackedObject } from "@/lib/mock-data"
import { Clock, MapPin, TrendingUp } from "lucide-react"
import { StatusBadge } from "./status-badge"

interface TrackedObjectsListProps {
  objects: TrackedObject[]
}

export function TrackedObjectsList({ objects }: TrackedObjectsListProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Active Tracks</h2>
        <p className="text-sm text-zinc-400">Currently tracked objects across all cameras</p>
      </div>
      <div className="divide-y divide-zinc-800">
        {objects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-zinc-500">No objects currently tracked</p>
          </div>
        ) : (
          objects.slice(0, 10).map((obj) => (
            <div key={obj.trackId} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  #{obj.trackId}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize text-white">{obj.class}</span>
                    {obj.inZone && <StatusBadge status="warning">In Zone</StatusBadge>}
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {obj.camera}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Math.floor((Date.now() - obj.firstSeen) / 1000)}s
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {obj.velocity.toFixed(1)} m/s
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white">{(obj.avgConfidence * 100).toFixed(0)}%</div>
                <div className="text-xs text-zinc-400">{obj.detectionCount} detections</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
