"use client"

import { useState, useEffect, useCallback } from "react"
import {
  type Detection,
  type TrackedObject,
  type Alert,
  type SystemMetrics,
  type CameraView,
  generateDetection,
  generateTrackedObjects,
  generateAlert,
  generateMetrics,
} from "./mock-data"

export function useDetectionEngine() {
  const [detections, setDetections] = useState<Map<CameraView, Detection[]>>(new Map())
  const [trackedObjects, setTrackedObjects] = useState<TrackedObject[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [metrics, setMetrics] = useState<SystemMetrics>(generateMetrics())
  const [isRunning, setIsRunning] = useState(true)

  // Simulate detection updates
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const cameras: CameraView[] = ["front", "rear", "left", "right"]
      const newDetections = new Map<CameraView, Detection[]>()

      cameras.forEach((camera) => {
        const detectionCount = Math.floor(Math.random() * 5)
        const cameraDetections = Array.from({ length: detectionCount }, () => generateDetection(camera))
        newDetections.set(camera, cameraDetections)
      })

      setDetections(newDetections)
      setMetrics(generateMetrics())
    }, 100) // Update at ~10 FPS

    return () => clearInterval(interval)
  }, [isRunning])

  // Simulate tracked objects updates
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const count = Math.floor(3 + Math.random() * 7)
      const objects = generateTrackedObjects(count)
      setTrackedObjects(objects)

      // Randomly generate alerts
      if (Math.random() > 0.9 && objects.length > 0) {
        const randomObject = objects[Math.floor(Math.random() * objects.length)]
        const newAlert = generateAlert(randomObject)
        setAlerts((prev) => [newAlert, ...prev].slice(0, 50))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isRunning])

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }, [])

  const clearAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }, [])

  const toggleEngine = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  return {
    detections,
    trackedObjects,
    alerts,
    metrics,
    isRunning,
    acknowledgeAlert,
    clearAlert,
    toggleEngine,
  }
}
