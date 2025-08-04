"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const aiStyles = [
  "Adventure Time",
  "American Dragon",
  "Arcane",
  "Attack on Titan",
  "Avatar",
  "Barbie",
  "Bojack",
  "Brooklyn Nine-Nine",
  "Courage",
  "Ed Edd & Eddy",
  "Final Fantasy",
  "Genshin",
  "Gravity Falls",
  "GTA",
  "Harvest Moon",
  "Hey Arnold",
  "Lego",
  "Mario Kart",
  "Minecraft",
  "Naruto",
  "Pixar",
  "Pokemon",
  "Powerpuff",
  "Rick and Morty",
  "Rugrats",
  "Samurai Champloo",
  "Samurai Jack",
  "South Park",
  "Spongebob",
  "Stardew Valley",
  "Studio Ghibli",
  "The Simpsons",
  "Totally Spies",
  "Yu-Gi-Oh!",
]

interface StylesPanelProps {
  exportProps?: {
    exportMultiplier: number
    setExportMultiplier: (value: number) => void
  }
}

export default function StylesPanel({ exportProps }: StylesPanelProps) {
  const [quality, setQuality] = useState(true)

  const getExportResolution = (multiplier: number, baseSize: number = 384) => {
    // Use desktop size as default for calculation
    return baseSize * multiplier
  }

  const getExportLabel = (multiplier: number) => {
    const resolution = getExportResolution(multiplier)
    switch (multiplier) {
      case 1: return `Standard (${resolution}px)`
      case 2: return `HD (${resolution}px)`
      case 4: return `Ultra HD (${resolution}px)`
      case 6: return `4K+ (${resolution}px)`
      default: return `${multiplier}x (${resolution}px)`
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm">AI Styles</h3>
          <div className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-2 py-0.5 rounded-full flex items-center">
            Pro ✨
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Reimagine yourself into a completely different character using AI.
          <span className="text-blue-500 ml-1 cursor-pointer hover:underline">Learn more</span>
        </p>
      </div>

      {/* Quality Toggle */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-medium">AI Quality</h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-700">Standard</span>
            <Switch
              checked={quality}
              onCheckedChange={setQuality}
            />
            <span className="text-xs text-gray-700">Ultra</span>
          </div>
          <span className="text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-0.5 border">10 credits</span>
        </div>
      </div>

      {/* Export Quality */}
      {exportProps && (
        <div className="p-3 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-medium">Export Quality</h4>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Free
            </div>
          </div>
          <div className="space-y-2">
            <Select
              value={exportProps.exportMultiplier.toString()}
              onValueChange={(value) => exportProps.setExportMultiplier(parseInt(value))}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{getExportLabel(1)}</SelectItem>
                <SelectItem value="2">{getExportLabel(2)}</SelectItem>
                <SelectItem value="4">{getExportLabel(4)}</SelectItem>
                <SelectItem value="6">{getExportLabel(6)}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Higher resolution exports maintain image quality but take longer to process.
            </p>
          </div>
        </div>
      )}

      {/* Scrollable Styles Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-5 gap-2">
          {aiStyles.map((style, index) => (
            <button
              key={style}
              className="aspect-square border-2 border-black rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 hover:border-gray-500 transition-all light-shadow"
            >
              <img
                src={`/placeholder.svg?height=60&width=60&text=${style.slice(0, 2)}`}
                alt={style}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex gap-1">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg border-2 border-black dark-shadow hover:light-shadow hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-xs">
            Generate Style
          </button>
          <button className="w-8 h-8 border-2 border-black rounded-lg bg-gray-50 flex items-center justify-center">
            <span className="text-xs">⌄</span>
          </button>
        </div>
      </div>
    </div>
  )
}
