// Mock data generator for surveillance system

export type ObjectClass = "person" | "car" | "bicycle" | "motorcycle" | "dog" | "cat"
export type CameraView = "front" | "rear" | "left" | "right"
export type ThreatLevel = "low" | "medium" | "high" | "critical"

export interface Detection {
  id: string
  trackId: number
  class: ObjectClass
  confidence: number
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
  camera: CameraView
  timestamp: number
}

export interface TrackedObject {
  trackId: number
  class: ObjectClass
  camera: CameraView
  firstSeen: number
  lastSeen: number
  detectionCount: number
  avgConfidence: number
  trajectory: { x: number; y: number; timestamp: number }[]
  velocity: number
  inZone: boolean
}

export interface Alert {
  id: string
  type: "zone_intrusion" | "loitering" | "rapid_approach" | "multiple_objects"
  severity: ThreatLevel
  camera: CameraView
  trackId: number
  objectClass: ObjectClass
  timestamp: number
  message: string
  acknowledged: boolean
}

export interface SystemMetrics {
  fps: number
  latency: number
  gpuUtilization: number
  detectionCount: number
  trackingCount: number
  alertCount: number
}

// Generate random detections
export function generateDetection(camera: CameraView): Detection {
  const classes: ObjectClass[] = ["person", "car", "bicycle", "motorcycle", "dog", "cat"]
  const objectClass = classes[Math.floor(Math.random() * classes.length)]

  return {
    id: `det_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    trackId: Math.floor(Math.random() * 100),
    class: objectClass,
    confidence: 0.7 + Math.random() * 0.3,
    bbox: {
      x: Math.random() * 0.8,
      y: Math.random() * 0.8,
      width: 0.1 + Math.random() * 0.2,
      height: 0.1 + Math.random() * 0.2,
    },
    camera,
    timestamp: Date.now(),
  }
}

// Generate tracked objects
export function generateTrackedObjects(count: number): TrackedObject[] {
  const cameras: CameraView[] = ["front", "rear", "left", "right"]
  const classes: ObjectClass[] = ["person", "car", "bicycle", "motorcycle", "dog", "cat"]

  return Array.from({ length: count }, (_, i) => {
    const firstSeen = Date.now() - Math.random() * 30000
    return {
      trackId: i + 1,
      class: classes[Math.floor(Math.random() * classes.length)],
      camera: cameras[Math.floor(Math.random() * cameras.length)],
      firstSeen,
      lastSeen: Date.now(),
      detectionCount: Math.floor(10 + Math.random() * 50),
      avgConfidence: 0.75 + Math.random() * 0.2,
      trajectory: [],
      velocity: Math.random() * 5,
      inZone: Math.random() > 0.7,
    }
  })
}

// Generate alerts
export function generateAlert(trackedObject: TrackedObject): Alert {
  const alertTypes: Alert["type"][] = ["zone_intrusion", "loitering", "rapid_approach", "multiple_objects"]
  const severities: ThreatLevel[] = ["low", "medium", "high", "critical"]
  const type = alertTypes[Math.floor(Math.random() * alertTypes.length)]

  const messages = {
    zone_intrusion: `${trackedObject.class} detected in restricted zone`,
    loitering: `${trackedObject.class} loitering near vehicle`,
    rapid_approach: `${trackedObject.class} approaching rapidly`,
    multiple_objects: `Multiple objects detected near vehicle`,
  }

  return {
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    severity: severities[Math.floor(Math.random() * severities.length)],
    camera: trackedObject.camera,
    trackId: trackedObject.trackId,
    objectClass: trackedObject.class,
    timestamp: Date.now(),
    message: messages[type],
    acknowledged: false,
  }
}

// Generate system metrics
export function generateMetrics(): SystemMetrics {
  return {
    fps: 28 + Math.random() * 4,
    latency: 30 + Math.random() * 20,
    gpuUtilization: 55 + Math.random() * 15,
    detectionCount: Math.floor(Math.random() * 20),
    trackingCount: Math.floor(Math.random() * 10),
    alertCount: Math.floor(Math.random() * 5),
  }
}

// Get camera placeholder with simulated feed
export function getCameraPlaceholder(camera: CameraView): string {
  const queries = {
    front: "front view car camera surveillance",
    rear: "rear view car camera surveillance",
    left: "left side car camera surveillance",
    right: "right side car camera surveillance",
  }
  return `/placeholder.svg?height=480&width=640&query=${queries[camera]}`
}
