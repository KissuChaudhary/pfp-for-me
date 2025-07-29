"use client"

import { Waves, Image } from "lucide-react"

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
  // New props for static borders
  borderMode: "dynamic" | "static"
  setBorderMode: (mode: "dynamic" | "static") => void
  selectedStaticBorder: string | null
  setSelectedStaticBorder: (border: string | null) => void
}

const borderColors = [
  "#FF6B6B", // Red
  "#FF8E53", // Orange
  "#FFD93D", // Yellow
  "#6BCF7F", // Green
  "#4ECDC4", // Teal
  "#45B7D1", // Light Blue
  "#5B9BD5", // Blue
  "#8E7CC3", // Purple
  "#C77DFF", // Violet
  "#FF69B4", // Pink
  "#FF4757", // Bright Red
  "#FFA502", // Dark Orange
  "#FF6348", // Tomato
  "#2ED573", // Bright Green
  "#1E90FF", // Dodger Blue
  "#9C88FF", // Light Purple
  "#F368E0", // Magenta
  "#FF9FF3", // Light Pink
  "#54A0FF", // Sky Blue
  "#5F27CD", // Deep Purple
  "#00D2D3", // Cyan
  "#FF9F43", // Orange
  "#10AC84", // Emerald
  "#EE5A24", // Dark Orange
  "#9E9E9E", // Gray
  "#757575", // Dark Gray
  "#424242", // Very Dark Gray
  "#FFFFFF", // White
  "#000000", // Black
]

const gradientPresets = [
  { id: "gold", start: "#FFD700", end: "#FFA500" },
  { id: "silver", start: "#C0C0C0", end: "#808080" },
  { id: "rainbow", start: "#FF6B6B", end: "#4ECDC4" },
  { id: "sunset", start: "#FF8E53", end: "#FF6B6B" },
  { id: "ocean", start: "#4ECDC4", end: "#45B7D1" },
  { id: "fire", start: "#FF4757", end: "#FFA502" },
  { id: "forest", start: "#2ED573", end: "#10AC84" },
  { id: "sky", start: "#54A0FF", end: "#1E90FF" },
  { id: "purple", start: "#9C88FF", end: "#5F27CD" },
  { id: "pink", start: "#F368E0", end: "#FF9FF3" },
  { id: "copper", start: "#FF6348", end: "#EE5A24" },
  { id: "emerald", start: "#00D2D3", end: "#10AC84" },
  { id: "midnight", start: "#2C3E50", end: "#34495E" },
  { id: "rose", start: "#FF69B4", end: "#FF1493" },
  { id: "azure", start: "#87CEEB", end: "#4682B4" },
]

const gradientDirections = [
  { label: "Right", value: "to right" },
  { label: "Bottom", value: "to bottom" },
  { label: "Diagonal", value: "45deg" },
  { label: "Radial", value: "circle" },
]

// Static border categories and assets
const staticBorderCategories = [
  {
    id: "badge",
    label: "Badge",
    assets: Array.from({ length: 22 }, (_, i) => `/assets/badge/${i + 1}.webp`)
  },
  {
    id: "cute",
    label: "Cute",
    assets: Array.from({ length: 23 }, (_, i) => `/assets/cute/${i + 1}.webp`)
  },
  {
    id: "flag",
    label: "Flag",
    assets: Array.from({ length: 48 }, (_, i) => `/assets/flag/${i + 1}.webp`)
  },
  {
    id: "floral",
    label: "Floral",
    assets: Array.from({ length: 47 }, (_, i) => `/assets/floral/${i + 1}.webp`)
  },
  {
    id: "frame",
    label: "Frame",
    assets: Array.from({ length: 45 }, (_, i) => `/assets/frame/${i + 1}.webp`)
  },
  {
    id: "neon",
    label: "Neon",
    assets: Array.from({ length: 32 }, (_, i) => `/assets/neon/${i + 1}.webp`)
  },
  {
    id: "nature",
    label: "Nature",
    assets: Array.from({ length: 25 }, (_, i) => `/assets/nature/${i + 1}.webp`)
  },
  {
    id: "nft",
    label: "NFT",
    assets: Array.from({ length: 25 }, (_, i) => `/assets/nft/${i + 1}.webp`)
  },
  {
    id: "solid",
    label: "Solid",
    assets: Array.from({ length: 26 }, (_, i) => `/assets/solid/${i + 1}.webp`)
  },
  {
    id: "text",
    label: "Text",
    assets: Array.from({ length: 33 }, (_, i) => `/assets/text/${i + 1}.webp`)
  }
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
  borderMode,
  setBorderMode,
  selectedStaticBorder,
  setSelectedStaticBorder,
}: BorderPanelProps) {
  return (
    <div className="p-3 space-y-3">
      <div>
        <h3 className="font-bold text-sm mb-1">Border</h3>
        <p className="text-gray-600 text-xs mb-2">Add stylish borders to make your profile picture stand out.</p>

      </div>

      {/* Border Mode Selector */}
      <div>
        <h4 className="font-bold text-xs mb-2">Border Mode</h4>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => {
              setBorderMode("dynamic")
              setSelectedStaticBorder(null)
            }}
            className={`p-2 border-2 border-black rounded-md z-50 flex items-center justify-center gap-1 transition-all ${
              borderMode === "dynamic"
                ? "bg-gray-200 text-black dark-shadow"
                : "bg-white hover:bg-gray-50 dark-shadow"
            }`}
          >
            <Waves className="w-3 h-3" />
            <span className="text-xs font-medium">Dynamic</span>
          </button>
          <button
            onClick={() => {
              setBorderMode("static")
              setBorderCapStyle("rounded") // Force rounded for static borders
            }}
            className={`p-2 border-2 border-black rounded-md z-50 flex items-center justify-center gap-1 transition-all ${
              borderMode === "static"
                ? "bg-gray-200 text-black dark-shadow"
                : "bg-white hover:bg-gray-50 dark-shadow"
            }`}
          >
            <Image className="w-3 h-3" />
            <span className="text-xs font-medium">Static</span>
          </button>
        </div>
      </div>

      {/* Static Border Selector */}
      {borderMode === "static" && (
        <div className="space-y-3">
          <div>
            <h4 className="font-bold text-xs mb-2">Static Border Assets</h4>
            <p className="text-gray-600 text-xs mb-2">Choose from pre-made circular border designs.</p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1">
            {staticBorderCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedStaticBorder(category.assets[0])}
                className={`px-2 py-1 border-2 border-black rounded-md text-xs font-medium transition-all ${
                  selectedStaticBorder && selectedStaticBorder.startsWith(`/assets/${category.id}/`)
                    ? "bg-blue-500 text-white dark-shadow"
                    : "bg-white hover:bg-gray-50 dark-shadow"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Asset Grid */}
          {selectedStaticBorder && (
            <div className="grid grid-cols-4 gap-1">
              {staticBorderCategories
                .find(cat => selectedStaticBorder.startsWith(`/assets/${cat.id}/`))
                ?.assets.map((asset, index) => (
                  <button
                    key={asset}
                    onClick={() => setSelectedStaticBorder(asset)}
                    className={`aspect-square border-2 border-black rounded-md overflow-hidden transition-all ${
                      selectedStaticBorder === asset
                        ? "border-blue-500 dark-shadow"
                        : "hover:border-gray-400 light-shadow"
                    }`}
                  >
                    <img
                      src={asset}
                      alt={`Border ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Dynamic Border Controls */}
      {borderMode === "dynamic" && (
        <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-xs">Border Width</span>
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
            <span className="font-bold text-xs">Border Opacity</span>
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
          <span className="font-bold text-xs mb-2 block">Border Cap Style</span>
          <div className="grid grid-cols-3 gap-1">
            {["rounded", "square", "beveled"].map((style) => (
              <button
                key={style}
                onClick={() => setBorderCapStyle(style as "rounded" | "square" | "beveled")}
                className={`px-2 py-1 border-2 border-black rounded-md z-50 text-xs font-medium transition-all ${
                  borderCapStyle === style
                    ? "bg-gray-200 text-black light-shadow "
                    : "bg-white hover:bg-gray-50 dark-shadow"
                }`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs">Border Offset</span>
            <span className="text-xs text-gray-600">{borderOffset}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={borderOffset}
            onChange={(e) => setBorderOffset(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          

        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs">Border Amount</span>
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
       
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs">Border Rotation</span>
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
         
        </div>

        <div>
          <h4 className="font-bold text-xs mb-2">Border Type</h4>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setBorderType("solid")}
              className={`p-2 border-2 border-black rounded-md z-50 flex items-center justify-center gap-1 transition-all ${
                borderType === "solid"
                  ? "bg-gray-200 text-black dark-shadow"
                  : "bg-white hover:bg-gray-50 dark-shadow"
              }`}
            >
              <span className="w-3 h-3 bg-current rounded"></span>
              <span className="text-xs font-medium">Solid</span>
            </button>
            <button
              onClick={() => setBorderType("gradient")}
              className={`p-2 border-2 border-black rounded-md z-50 flex items-center justify-center gap-1 transition-all ${
                borderType === "gradient"
                  ? "bg-gray-200 text-black dark-shadow"
                  : "bg-white hover:bg-gray-50 dark-shadow"
              }`}
            >
              <Waves className="w-3 h-3" />
              <span className="text-xs font-medium">Gradient</span>
            </button>
          </div>
        </div>

        {borderType === "solid" && (
          <div>
            <h4 className="font-bold text-xs mb-2">Border Color</h4>
            <div className="grid grid-cols-6 gap-1">
              {borderColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBorderColor(color)}
                  className={`w-8 h-8 rounded-full border-2 z-50 transition-all ${
                    borderColor === color
                      ? "border-black dark-shadow"
                      : "border-black z-50 hover:border-gray-400 light-shadow hover:light-shadow"
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
              <h4 className="font-bold text-xs mb-2">Gradient Presets</h4>
              <div className="grid grid-cols-5 gap-1">
                {gradientPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setBorderGradientColors({ start: preset.start, end: preset.end })}
                      className={`h-8 rounded border-2 border-black z-50 transition-all ${
                      borderGradientColors.start === preset.start && borderGradientColors.end === preset.end
                        ? "border-black z-50 dark-shadow"
                        : "hover:border-gray-400 light-shadow hover:light-shadow"
                    }`}
                    style={{ backgroundImage: `linear-gradient(to right, ${preset.start}, ${preset.end})` }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-2">Gradient Direction</h4>
              <div className="grid grid-cols-4 gap-1">
                {gradientDirections.map((dir) => (
                  <button
                    key={dir.value}
                    onClick={() => setBorderGradientDirection(dir.value)}
                      className={`px-2 py-1 border-2 border-black rounded-md z-50 text-[10px] font-medium transition-all ${
                      borderGradientDirection === dir.value
                        ? "bg-gray-200 text-black dark-shadow"
                        : "bg-white hover:bg-gray-50 dark-shadow"
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
      )}
    </div>
  )
}
