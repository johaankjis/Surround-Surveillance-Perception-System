"use client"

import { useState } from "react"
import { ZoneEditor, type Zone } from "@/components/zone-editor"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"

const defaultZones: Zone[] = [
  {
    id: "zone_1",
    name: "Front Door Zone",
    camera: "front",
    enabled: true,
    alertOnEntry: true,
    coordinates: [
      { x: 0.3, y: 0.3 },
      { x: 0.7, y: 0.3 },
      { x: 0.7, y: 0.7 },
      { x: 0.3, y: 0.7 },
    ],
  },
  {
    id: "zone_2",
    name: "Trunk Area",
    camera: "rear",
    enabled: true,
    alertOnEntry: true,
    coordinates: [
      { x: 0.2, y: 0.4 },
      { x: 0.8, y: 0.4 },
      { x: 0.8, y: 0.9 },
      { x: 0.2, y: 0.9 },
    ],
  },
]

export default function ZonesPage() {
  const [zones, setZones] = useState<Zone[]>(defaultZones)
  const [hasChanges, setHasChanges] = useState(false)

  const handleZonesChange = (newZones: Zone[]) => {
    setZones(newZones)
    setHasChanges(true)
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving zones:", zones)
    setHasChanges(false)
  }

  const handleReset = () => {
    setZones(defaultZones)
    setHasChanges(false)
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Detection Zones</h1>
          <p className="mt-1 text-zinc-400">Configure restricted areas and alert triggers</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <ZoneEditor zones={zones} onZonesChange={handleZonesChange} />
    </div>
  )
}
