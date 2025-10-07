"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2 } from "lucide-react"

export interface Zone {
  id: string
  name: string
  camera: string
  enabled: boolean
  alertOnEntry: boolean
  coordinates: { x: number; y: number }[]
}

interface ZoneEditorProps {
  zones: Zone[]
  onZonesChange: (zones: Zone[]) => void
}

export function ZoneEditor({ zones, onZonesChange }: ZoneEditorProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  const addZone = () => {
    const newZone: Zone = {
      id: `zone_${Date.now()}`,
      name: `Zone ${zones.length + 1}`,
      camera: "front",
      enabled: true,
      alertOnEntry: true,
      coordinates: [
        { x: 0.2, y: 0.2 },
        { x: 0.8, y: 0.2 },
        { x: 0.8, y: 0.8 },
        { x: 0.2, y: 0.8 },
      ],
    }
    onZonesChange([...zones, newZone])
    setSelectedZone(newZone.id)
  }

  const deleteZone = (id: string) => {
    onZonesChange(zones.filter((z) => z.id !== id))
    if (selectedZone === id) {
      setSelectedZone(null)
    }
  }

  const updateZone = (id: string, updates: Partial<Zone>) => {
    onZonesChange(zones.map((z) => (z.id === id ? { ...z, ...updates } : z)))
  }

  const selected = zones.find((z) => z.id === selectedZone)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Detection Zones</h3>
              <Button size="sm" onClick={addZone}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="divide-y divide-zinc-800">
            {zones.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-zinc-500">No zones configured</p>
                <Button size="sm" variant="outline" className="mt-4 bg-transparent" onClick={addZone}>
                  Create First Zone
                </Button>
              </div>
            ) : (
              zones.map((zone) => (
                <div
                  key={zone.id}
                  className={`flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-zinc-900/50 ${
                    selectedZone === zone.id ? "bg-zinc-900" : ""
                  }`}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${zone.enabled ? "bg-green-500" : "bg-zinc-600"}`} />
                    <div>
                      <p className="font-medium text-white">{zone.name}</p>
                      <p className="text-xs capitalize text-zinc-400">{zone.camera} camera</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteZone(zone.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        {selected ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">Zone Configuration</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="zone-name">Zone Name</Label>
                <Input
                  id="zone-name"
                  value={selected.name}
                  onChange={(e) => updateZone(selected.id, { name: e.target.value })}
                  className="bg-zinc-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone-camera">Camera</Label>
                <select
                  id="zone-camera"
                  value={selected.camera}
                  onChange={(e) => updateZone(selected.id, { camera: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="front">Front Camera</option>
                  <option value="rear">Rear Camera</option>
                  <option value="left">Left Camera</option>
                  <option value="right">Right Camera</option>
                </select>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <div>
                  <Label htmlFor="zone-enabled" className="text-base">
                    Zone Enabled
                  </Label>
                  <p className="text-sm text-zinc-400">Activate detection in this zone</p>
                </div>
                <Switch
                  id="zone-enabled"
                  checked={selected.enabled}
                  onCheckedChange={(checked) => updateZone(selected.id, { enabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <div>
                  <Label htmlFor="zone-alert" className="text-base">
                    Alert on Entry
                  </Label>
                  <p className="text-sm text-zinc-400">Trigger alert when object enters zone</p>
                </div>
                <Switch
                  id="zone-alert"
                  checked={selected.alertOnEntry}
                  onCheckedChange={(checked) => updateZone(selected.id, { alertOnEntry: checked })}
                />
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <Label className="mb-3 block">Zone Preview</Label>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-800">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-600">Camera Preview</div>
                  <svg className="absolute inset-0 h-full w-full">
                    <polygon
                      points={selected.coordinates.map((c) => `${c.x * 100}%,${c.y * 100}%`).join(" ")}
                      fill="rgba(59, 130, 246, 0.2)"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="2"
                    />
                    {selected.coordinates.map((coord, i) => (
                      <circle
                        key={i}
                        cx={`${coord.x * 100}%`}
                        cy={`${coord.y * 100}%`}
                        r="6"
                        fill="rgb(59, 130, 246)"
                        className="cursor-pointer"
                      />
                    ))}
                  </svg>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Click and drag points to adjust zone boundaries</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 p-12">
            <div className="text-center">
              <p className="text-zinc-500">Select a zone to configure</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
