"use client"

import { CameraFeed } from "@/components/camera-feed"
import { SystemStatus } from "@/components/system-status"
import { TrackedObjectsList } from "@/components/tracked-objects-list"
import { useDetectionEngine } from "@/lib/detection-engine"
import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"

export default function HomePage() {
  const { detections, trackedObjects, metrics, isRunning, toggleEngine } = useDetectionEngine()

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Surveillance Feed</h1>
          <p className="mt-1 text-zinc-400">Real-time perimeter threat detection system</p>
        </div>
        <Button onClick={toggleEngine} variant={isRunning ? "destructive" : "default"} size="lg">
          {isRunning ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause System
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start System
            </>
          )}
        </Button>
      </div>

      <div className="mb-6">
        <SystemStatus metrics={metrics} isRunning={isRunning} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CameraFeed camera="front" detections={detections.get("front") || []} />
        <CameraFeed camera="rear" detections={detections.get("rear") || []} />
        <CameraFeed camera="left" detections={detections.get("left") || []} />
        <CameraFeed camera="right" detections={detections.get("right") || []} />
      </div>

      <TrackedObjectsList objects={trackedObjects} />
    </div>
  )
}
