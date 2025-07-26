"use client"

import { Waves } from "lucide-react"

interface BorderPanelProps {
  borderWidth: number
  setBorderWidth: (width: number) => void
  borderColor: string
  setBorderColor: (color: string) => void
  borderOpacity: number
  setBorderOpacity: (opacity: number) => void
  borderType: "solid" | "gradient"
  setBorderType: (type: "solid" | "gradient") => void
  borderGradientColors: { start: string; end: string }
  setBorderGradientColors: (colors: { start: string; end: string }) => void
  borderGradientDirection: string
  setBorderGradientDirection: (direction: string) => void
  borderOffset: number
  setBorderOffset: (offset: number) => void
  borderAmount: number
  setBorderAmount: (amount: number) => void
  borderRotation: number
  setBorderRotation: (rotation: number) => void
  borderCapStyle: "rounded" | "square" | "beveled"
  setBorderCapStyle: (style: "rounded" | "square" | "beveled") => void
}

const borderColors = [
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
  { id: "gold", start: "#FFD700", end: "#FFA500" },
  { id: "silver", start: "#C0C0C0", end: "#808080" },
  { id: "rainbow", start: "#FF6B6B", end: "#4ECDC4" },
  { id: "sunset", start: "#FF8E53", end: "#FF6B6B" },
  { id: "ocean", start: "#4ECDC4", end: "#45B7D1" },
]

const gradientDirections = [
  { label: "Right", value: "to right" },
  { label: "Bottom", value: "to bottom" },
  { label: "Diagonal", value: "45deg" },
  { label: "Radial", value: "circle" },
]

export default function BorderPanel({
  borderWidth,
  setBorderWidth,
  borderColor,
  setBorderColor,
  borderOpacity,
  setBorderOpacity,
  borderType,
  setBorderType,
  borderGradientColors,
  setBorderGradientColors,
  borderGradientDirection,
  setBorderGradientDirection,
  borderOffset,
  setBorderOffset,
  borderAmount,
  setBorderAmount,
  borderRotation,
  setBorderRotation,
  borderCapStyle,
  setBorderCapStyle,
}: BorderPanelProps) {
  return (
    <div className="p-3 space-y-3">
      <div>
        <h3 className="font-bold text-sm mb-1">Border</h3>
        <p className="text-gray-600 text-xs mb-2">Add stylish borders to make your profile picture stand out.</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-xs">Border Width</span>
            <span className="text-xs text-gray-600">{borderWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={borderWidth}
            onChange={(e) => setBorderWidth(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-xs">Border Opacity</span>
            <span className="text-xs text-gray-600">{borderOpacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={borderOpacity}
            onChange={(e) => setBorderOpacity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div>
          <span className="font-medium text-xs mb-2 block">Border Cap Style</span>
          <div className="grid grid-cols-3 gap-1">
            {["rounded", "square", "beveled"].map((style) => (
              <button
                key={style}
                onClick={() => setBorderCapStyle(style as "rounded" | "square" | "beveled")}
                className={`px-2 py-1 border border-black rounded text-xs font-medium transition-all ${
                  borderCapStyle === style
                    ? "bg-blue-500 text-white shadow-[1px_1px_0_rgba(0,0,0,1)]"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-xs">Border Offset</span>
            <span className="text-xs text-gray-600">{borderOffset}px</span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            value={borderOffset}
            onChange={(e) => setBorderOffset(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="mt-1 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 <strong>Offset:</strong> Small adjustments to border position (-10px to +10px).
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-xs">Border Amount</span>
            <span className="text-xs text-gray-600">{borderAmount}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={borderAmount}
            onChange={(e) => setBorderAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="mt-1 p-2 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700">
              🎯 <strong>Amount:</strong> Controls the visible circular segment of the border (50% = half-circle).
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-xs">Border Rotation</span>
            <span className="text-xs text-gray-600">{borderRotation}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={borderRotation}
            onChange={(e) => setBorderRotation(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="mt-1 p-2 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-xs text-purple-700">
              🔄 <strong>Rotation:</strong> Rotates the starting position of the border segment.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-xs mb-2">Border Type</h4>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setBorderType("solid")}
              className={`p-2 border border-black rounded-lg flex items-center justify-center gap-1 transition-all ${
                borderType === "solid"
                  ? "bg-blue-500 text-white shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <span className="w-3 h-3 bg-current rounded"></span>
              <span className="text-xs font-medium">Solid</span>
            </button>
            <button
              onClick={() => setBorderType("gradient")}
              className={`p-2 border border-black rounded-lg flex items-center justify-center gap-1 transition-all ${
                borderType === "gradient"
                  ? "bg-blue-500 text-white shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <Waves className="w-3 h-3" />
              <span className="text-xs font-medium">Gradient</span>
            </button>
          </div>
        </div>

        {borderType === "solid" && (
          <div>
            <h4 className="font-medium text-xs mb-2">Border Color</h4>
            <div className="grid grid-cols-5 gap-1">
              {borderColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBorderColor(color)}
                  className={`w-8 h-8 rounded-full border transition-all ${
                    borderColor === color
                      ? "border-black shadow-[1px_1px_0_rgba(0,0,0,1)]"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {borderType === "gradient" && (
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-xs mb-2">Gradient Presets</h4>
              <div className="grid grid-cols-3 gap-1">
                {gradientPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setBorderGradientColors({ start: preset.start, end: preset.end })}
                    className={`h-8 rounded border border-black transition-all ${
                      borderGradientColors.start === preset.start && borderGradientColors.end === preset.end
                        ? "shadow-[1px_1px_0_rgba(0,0,0,1)]"
                        : "hover:shadow-[1px_1px_0_rgba(0,0,0,1)]"
                    }`}
                    style={{ backgroundImage: `linear-gradient(to right, ${preset.start}, ${preset.end})` }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-xs mb-2">Gradient Direction</h4>
              <div className="grid grid-cols-2 gap-1">
                {gradientDirections.map((dir) => (
                  <button
                    key={dir.value}
                    onClick={() => setBorderGradientDirection(dir.value)}
                    className={`px-2 py-1 border border-black rounded text-xs font-medium transition-all ${
                      borderGradientDirection === dir.value
                        ? "bg-blue-500 text-white shadow-[1px_1px_0_rgba(0,0,0,1)]"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {dir.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
