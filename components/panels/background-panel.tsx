"use client"

import type React from "react"
import { Grid3X3, Waves, ImageIcon } from "lucide-react"

interface BackgroundPanelProps {
  backgroundType: "solid" | "gradient" | "pattern" | "image"
  setBackgroundType: (type: "solid" | "gradient" | "pattern" | "image") => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  gradientColors: { start: string; end: string }
  setGradientColors: (colors: { start: string; end: string }) => void
  gradientDirection: string
  setGradientDirection: (direction: string) => void
  backgroundPattern: string
  setBackgroundPattern: (patternUrl: string) => void
  backgroundImage: string
  setBackgroundImage: (imageUrl: string) => void
  backgroundSize: string
  setBackgroundSize: (size: string) => void
  backgroundPosition: string
  setBackgroundPosition: (position: string) => void
}

const backgroundTypes = [
  { id: "solid", label: "Solid", icon: "●" },
  { id: "gradient", label: "Gradient", icon: Waves },
  { id: "pattern", label: "Pattern", icon: Grid3X3 },
  { id: "image", label: "Image", icon: ImageIcon },
]

const solidColors = [
  "#FF6B6B",
  "#FF8E53",
  "#FFD93D",
  "#6BCF7F",
  "#4ECDC4",
  "#45B7D1",
  "#5B9BD5",
  "#8E7CC3",
  "#C77DFF",
  "#FF69B4",
  "#9E9E9E",
  "#757575",
  "#424242",
  "#FFFFFF",
  "#000000",
]

const gradientPresets = [
  { id: "blue-purple", start: "#4ECDC4", end: "#45B7D1" },
  { id: "red-orange", start: "#FF6B6B", end: "#FF8E53" },
  { id: "green-yellow", start: "#6BCF7F", end: "#FFD93D" },
  { id: "pink-violet", start: "#C77DFF", end: "#FF69B4" },
  { id: "gray-dark", start: "#9E9E9E", end: "#424242" },
]

const gradientDirections = [
  { label: "Right", value: "to right" },
  { label: "Bottom", value: "to bottom" },
  { label: "Top Right", value: "to top right" },
  { label: "Bottom Left", value: "to bottom left" },
]

const patternImages = [
  { id: "geometric", url: "/placeholder.svg?height=60&width=60" },
  { id: "lines", url: "/placeholder.svg?height=60&width=60" },
  { id: "dots", url: "/placeholder.svg?height=60&width=60" },
  { id: "waves", url: "/placeholder.svg?height=60&width=60" },
  { id: "grid", url: "/placeholder.svg?height=60&width=60" },
  { id: "honeycomb", url: "/placeholder.svg?height=60&width=60" },
  { id: "stripes", url: "/placeholder.svg?height=60&width=60" },
  { id: "circles", url: "/placeholder.svg?height=60&width=60" },
  { id: "triangles", url: "/placeholder.svg?height=60&width=60" },
  { id: "floral", url: "/placeholder.svg?height=60&width=60" },
]

const backgroundImages = [
  { id: "abstract-blue", url: "/placeholder.svg?height=100&width=100" },
  { id: "minimal-white", url: "/placeholder.svg?height=100&width=100" },
  { id: "city-lights", url: "/placeholder.svg?height=100&width=100" },
  { id: "pastel-gradient", url: "/placeholder.svg?height=100&width=100" },
  { id: "forest", url: "/placeholder.svg?height=100&width=100" },
  { id: "mountain", url: "/placeholder.svg?height=100&width=100" },
  { id: "ocean", url: "/placeholder.svg?height=100&width=100" },
  { id: "space", url: "/placeholder.svg?height=100&width=100" },
  { id: "wood", url: "/placeholder.svg?height=100&width=100" },
  { id: "brick", url: "/placeholder.svg?height=100&width=100" },
]

export default function BackgroundPanel({
  backgroundType,
  setBackgroundType,
  backgroundColor,
  setBackgroundColor,
  gradientColors,
  setGradientColors,
  gradientDirection,
  setGradientDirection,
  backgroundPattern,
  setBackgroundPattern,
  backgroundImage,
  setBackgroundImage,
  backgroundSize,
  setBackgroundSize,
  backgroundPosition,
  setBackgroundPosition,
}: BackgroundPanelProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setBackgroundImage(url)
      setBackgroundType("image")
    }
  }

  return (
    <div className="p-3 space-y-3">
      <div>
        <h3 className="font-bold text-sm mb-1">Background</h3>
        <p className="text-gray-600 text-xs mb-2">
          Add solid colors, gradients, or reimagine your background using AI-generated scenes.
        </p>
      </div>

      <div>
        <h4 className="font-medium text-xs mb-2">Background Type</h4>
        <div className="grid grid-cols-4 gap-1">
          {backgroundTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setBackgroundType(type.id as "solid" | "gradient" | "pattern" | "image")}
              className={`p-2 border border-black rounded-md flex flex-col items-center gap-1 transition-all ${
                backgroundType === type.id
                  ? "bg-blue-500 text-white shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {typeof type.icon === "string" ? (
                <span className="text-xs">{type.icon}</span>
              ) : (
                <type.icon className="w-3 h-3" />
              )}
              <span className="text-xs font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {backgroundType === "solid" && (
        <div>
          <h4 className="font-medium text-xs mb-2">Solid Colors</h4>
          <div className="grid grid-cols-5 gap-2">
            {solidColors.map((color, index) => (
              <button
                key={`${color}-${index}`}
                onClick={() => setBackgroundColor(color)}
                className={`w-8 h-8 rounded-full border transition-all ${
                  backgroundColor === color
                    ? "border-black shadow-[1px_1px_0_rgba(0,0,0,1)]"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {backgroundType === "gradient" && (
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-xs mb-2">Gradient Presets</h4>
            <div className="grid grid-cols-3 gap-2">
              {gradientPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setGradientColors({ start: preset.start, end: preset.end })}
                  className={`h-10 rounded-md border-2 border-black transition-all ${
                    gradientColors.start === preset.start && gradientColors.end === preset.end
                      ? "shadow-[2px_2px_0_rgba(0,0,0,1)]"
                      : "hover:shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  }`}
                  style={{ backgroundImage: `linear-gradient(to right, ${preset.start}, ${preset.end})` }}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-2">Gradient Direction</h4>
            <div className="grid grid-cols-2 gap-2">
              {gradientDirections.map((dir) => (
                <button
                  key={dir.value}
                  onClick={() => setGradientDirection(dir.value)}
                  className={`px-3 py-2 border-2 border-black rounded-lg text-xs font-medium transition-all ${
                    gradientDirection === dir.value
                      ? "bg-blue-500 text-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-gray-50 shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  }`}
                >
                  {dir.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {backgroundType === "pattern" && (
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-xs mb-2">Patterns</h4>
            <div className="grid grid-cols-4 gap-2">
              {patternImages.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => setBackgroundPattern(pattern.url)}
                  className={`aspect-square border-2 border-black rounded-lg overflow-hidden flex items-center justify-center transition-all ${
                    backgroundPattern === pattern.url
                      ? "bg-blue-500 shadow-[2px_2px_0_rgba(0,0,0,1)]"
                      : "bg-gray-100 hover:bg-gray-50 shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <img
                    src={pattern.url || "/placeholder.svg"}
                    alt={pattern.id}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-2">Pattern Size</h4>
            <select
              value={backgroundSize}
              onChange={(e) => setBackgroundSize(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-xl bg-white text-sm"
            >
              <option value="auto">Auto</option>
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="50%">50%</option>
              <option value="100%">100%</option>
              <option value="200%">200%</option>
            </select>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-2">Pattern Position</h4>
            <select
              value={backgroundPosition}
              onChange={(e) => setBackgroundPosition(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-xl bg-white text-sm"
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      )}

      {backgroundType === "image" && (
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-xs mb-2">Background Images</h4>
            <div className="grid grid-cols-3 gap-2">
              {backgroundImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setBackgroundImage(img.url)}
                  className={`aspect-video border-2 border-black rounded-lg overflow-hidden flex items-center justify-center transition-all ${
                    backgroundImage === img.url
                      ? "bg-blue-500 shadow-[2px_2px_0_rgba(0,0,0,1)]"
                      : "bg-gray-100 hover:bg-gray-50 shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <img src={img.url || "/placeholder.svg"} alt={img.id} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="bg-image-upload" />
            <label
              htmlFor="bg-image-upload"
              className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-xs cursor-pointer"
            >
              <ImageIcon className="w-3 h-3" />
              Upload Custom Image
            </label>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-2">Image Size</h4>
            <select
              value={backgroundSize}
              onChange={(e) => setBackgroundSize(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-xl bg-white text-sm"
            >
              <option value="auto">Auto</option>
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </div>
          <div>
            <h4 className="font-medium text-xs mb-2">Image Position</h4>
            <select
              value={backgroundPosition}
              onChange={(e) => setBackgroundPosition(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-xl bg-white text-sm"
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
