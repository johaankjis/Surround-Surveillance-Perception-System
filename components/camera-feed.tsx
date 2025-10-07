"use client"

import Image from "next/image"
import { type Detection, type CameraView, getCameraPlaceholder } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface CameraFeedProps {
  camera: CameraView
  detections: Detection[]
  className?: string
}

const cameraLabels: Record<CameraView, string> = {
  front: "Front Camera",
  rear: "Rear Camera",
  left: "Left Camera",
  right: "Right Camera",
}

const objectColors: Record<string, string> = {
  person: "border-red-500 bg-red-500/10",
  car: "border-blue-500 bg-blue-500/10",
  bicycle: "border-yellow-500 bg-yellow-500/10",
  motorcycle: "border-purple-500 bg-purple-500/10",
  dog: "border-green-500 bg-green-500/10",
  cat: "border-pink-500 bg-pink-500/10",
}

export function CameraFeed({ camera, detections, className }: CameraFeedProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950", className)}>
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-black/80 px-3 py-1.5 backdrop-blur-sm">
        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <span className="text-sm font-medium text-white">{cameraLabels[camera]}</span>
      </div>

      <div className="absolute right-4 top-4 z-10 rounded-lg bg-black/80 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-xs text-zinc-400">{detections.length} objects</span>
      </div>

      <div className="relative aspect-video w-full">
        <Image
          src={getCameraPlaceholder(camera) || "/placeholder.svg"}
          alt={cameraLabels[camera]}
          fill
          className="object-cover"
          unoptimized
        />

        {/* Render bounding boxes */}
        {detections.map((detection) => (
          <div
            key={detection.id}
            className={cn(
              "absolute border-2 transition-all",
              objectColors[detection.class] || "border-white bg-white/10",
            )}
            style={{
              left: `${detection.bbox.x * 100}%`,
              top: `${detection.bbox.y * 100}%`,
              width: `${detection.bbox.width * 100}%`,
              height: `${detection.bbox.height * 100}%`,
            }}
          >
            <div className="absolute -top-6 left-0 rounded bg-black/90 px-2 py-0.5 text-xs font-medium text-white">
              {detection.class} #{detection.trackId} ({(detection.confidence * 100).toFixed(0)}%)
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 bg-black/50 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>720p @ 30fps</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}
