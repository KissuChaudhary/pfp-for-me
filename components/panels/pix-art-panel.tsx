"use client"

import { useState } from "react"

interface PixArtPanelProps {
  selectedPixArt: string | null
  setSelectedPixArt: (pixArt: string | null) => void
  pixArtSize: number
  setPixArtSize: (size: number) => void
}

// Pix Art assets mapping
const pixArtAssets = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  src: `/assets/pix_art/${i + 1}.webp`,
}))

export default function PixArtPanel({
  selectedPixArt,
  setSelectedPixArt,
  pixArtSize,
  setPixArtSize,
}: PixArtPanelProps) {
  const [showAllPixArt, setShowAllPixArt] = useState(false)
  
  // Show only 60% of pix art effects initially (33 out of 55)
  const initialCount = Math.floor(pixArtAssets.length * 0.6)
  const displayedPixArt = showAllPixArt ? pixArtAssets : pixArtAssets.slice(0, initialCount)

  return (
    <div className="p-3 space-y-3">
      {/* Pix Art Section */}
      <div className="p-3 rounded-lg border-2 border-gray-200">
        <div>
          <h3 className="font-bold text-sm mb-1">Pix Art Effects</h3>
          <p className="text-gray-600 text-xs mb-2">Add pixel art effects to your profile picture.</p>
        </div>

        {/* Pix Art Selection */}
        <div className="space-y-3">
          {/* Pix Art Grid */}
          <div className="grid grid-cols-4 gap-2 overflow-y-auto">
            {/* None Option */}
            <button
              onClick={() => setSelectedPixArt(null)}
              className={`aspect-square border-2 border-black bg-white rounded-md transition-all flex items-center justify-center ${
                selectedPixArt === null
                  ? "border-blue-500 dark-shadow"
                  : "hover:border-gray-400 light-shadow"
              }`}
            >
              <span className="text-xs font-medium text-gray-700">None</span>
            </button>
            
            {displayedPixArt.map((pixArt) => (
              <button
                key={pixArt.id}
                onClick={() => setSelectedPixArt(pixArt.src)}
                className={`aspect-square border-2 border-black bg-black rounded-md overflow-hidden transition-all ${
                  selectedPixArt === pixArt.src
                    ? "border-blue-500 dark-shadow"
                    : "hover:border-gray-400 light-shadow"
                }`}
              >
                <img
                  src={pixArt.src}
                  alt={`Pix Art ${pixArt.id}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Show More/Less Button */}
          {pixArtAssets.length > initialCount && (
            <button
              onClick={() => setShowAllPixArt(!showAllPixArt)}
              className="w-full py-2 px-3 border-2 border-black rounded-md text-xs font-medium transition-all bg-white hover:bg-gray-50 dark-shadow"
            >
              {showAllPixArt ? "Show Less" : "Show More Pix Art Effects"}
            </button>
          )}

          {/* Pix Art Size Control */}
          <div className="space-y-2 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs">Pix Art Size</span>
              <span className="text-xs text-gray-600">{pixArtSize}%</span>
            </div>
            <input
              type="range"
              min="100"
              max="200"
              value={pixArtSize}
              onChange={(e) => setPixArtSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <p className="text-gray-600 text-xs">Increase the size to create more space in the center, revealing more of your uploaded image.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 