"use client"

import type React from "react"
import { Grid3X3, Waves, ImageIcon } from "lucide-react"
import { PatternPicker } from "@/components/ui/pattern-picker"
import { patterns, Pattern } from "@/lib/patterns"

interface BackgroundPanelProps {
  backgroundType: "solid" | "gradient" | "pattern" | "image"
  setBackgroundType: (type: "solid" | "gradient" | "pattern" | "image") => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  gradientColors: { start: string; end: string }
  setGradientColors: (colors: { start: string; end: string }) => void
  gradientDirection: string
  setGradientDirection: (direction: string) => void
  backgroundPattern: Pattern | null
  setBackgroundPattern: (pattern: Pattern | null) => void
  backgroundImage: string
  setBackgroundImage: (imageUrl: string) => void
  backgroundSize: string
  setBackgroundSize: (size: string) => void
  backgroundPosition: string
  setBackgroundPosition: (position: string) => void
  patternScale: number
  setPatternScale: (scale: number) => void
  usePatternOverlay: boolean
  solidPatternOverlay: boolean
  setSolidPatternOverlay: (overlay: boolean) => void
  gradientPatternOverlay: boolean
  setGradientPatternOverlay: (overlay: boolean) => void
}

const backgroundTypes = [
  { id: "solid", label: "Solid", icon: "●" },
  { id: "gradient", label: "Gradient", icon: Waves },
  { id: "pattern", label: "Pattern", icon: Grid3X3 },
  { id: "image", label: "Image", icon: ImageIcon },
]

const solidColors = [
  // Vibrant Colors
  "#FF6B6B", // Coral Red
  "#FF8E53", // Orange
  "#FFD93D", // Golden Yellow
  "#6BCF7F", // Mint Green
  "#4ECDC4", // Turquoise
  "#45B7D1", // Sky Blue
  "#5B9BD5", // Royal Blue
  "#8E7CC3", // Lavender
  "#C77DFF", // Purple
  "#FF69B4", // Hot Pink
  
  // Neutral & Professional
  "#F8F9FA", // Light Gray
  "#E9ECEF", // Silver
  "#DEE2E6", // Pearl
  "#CED4DA", // Platinum
  "#ADB5BD", // Steel Gray
  "#6C757D", // Charcoal
  "#495057", // Dark Gray
  "#343A40", // Slate
  "#212529", // Almost Black
  "#FFFFFF", // Pure White

  "#FFB347", // Amber
  "#FF7F50", // Sunset Coral
  "#FFA07A", // Light Salmon
  "#F08080", // Soft Red
  "#E9967A", // Pale Copper
  "#FFD700", // Sun Yellow
  "#B0E57C", // Lime Green
  "#98FB98", // Pale Green
  "#00CED1", // Deep Turquoise
  "#40E0D0", // Aqua Blue
  "#87CEFA", // Baby Blue
  "#6495ED", // Cool Blue
  "#7B68EE", // Medium Purple
  "#DA70D6", // Orchid
  "#FF1493", // Neon Pink
  "#DC143C", // Crimson
  "#2F4F4F", // Deep Slate
  "#708090", // Muted Gray
  "#DCDCDC", // Soft Silver
  "#FAFAFA", // Off White
]

const gradientPresets = [
  // Sunset & Warm Gradients
  { id: "sunset-orange", start: "#FF8E53", end: "#FF6B6B" },
  { id: "golden-hour", start: "#FFD93D", end: "#FF8E53" },
  { id: "coral-sunset", start: "#FF6B6B", end: "#FF69B4" },
  { id: "warm-fire", start: "#FF4757", end: "#FFA502" },
  { id: "autumn-leaves", start: "#FF8E53", end: "#FFD93D" },
  
  // Ocean & Cool Gradients
  { id: "ocean-depths", start: "#4ECDC4", end: "#45B7D1" },
  { id: "sky-blue", start: "#54A0FF", end: "#1E90FF" },
  { id: "deep-sea", start: "#2C3E50", end: "#34495E" },
  { id: "azure-waves", start: "#87CEEB", end: "#4682B4" },
  { id: "marine-blue", start: "#5B9BD5", end: "#8E7CC3" },
  
  // Nature & Earth Gradients
  { id: "forest-green", start: "#2ED573", end: "#10AC84" },
  { id: "emerald-garden", start: "#00D2D3", end: "#10AC84" },
  { id: "mountain-sage", start: "#6BCF7F", end: "#4ECDC4" },
  { id: "earth-tone", start: "#8B4513", end: "#D2691E" },
  { id: "desert-sand", start: "#F4A460", end: "#DEB887" },
  
  // Purple & Magical Gradients
  { id: "royal-purple", start: "#9C88FF", end: "#5F27CD" },
  { id: "magical-pink", start: "#F368E0", end: "#FF9FF3" },
  { id: "lavender-dream", start: "#8E7CC3", end: "#C77DFF" },
  { id: "mystic-violet", start: "#5F27CD", end: "#FF69B4" },
  { id: "cosmic-purple", start: "#C77DFF", end: "#9C88FF" },
  
  // Modern & Professional Gradients
  { id: "steel-gray", start: "#6C757D", end: "#495057" },
  { id: "silver-lining", start: "#E9ECEF", end: "#CED4DA" },
  { id: "charcoal-smoke", start: "#495057", end: "#343A40" },
  { id: "platinum-shine", start: "#DEE2E6", end: "#ADB5BD" },
  { id: "midnight-blue", start: "#2C3E50", end: "#34495E" },
]

const gradientDirections = [
  { label: "Right", value: "to right" },
  { label: "Bottom", value: "to bottom" },
  { label: "Top Right", value: "to top right" },
  { label: "Bottom Left", value: "to bottom left" },
]

const patternImages = [
  { id: "dots", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23222'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%23222'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%23222'/%3E%3C/svg%3E" },
  { id: "grid", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='60' height='60' fill='none' stroke='%23222' stroke-width='1'/%3E%3Cline x1='20' y1='0' x2='20' y2='60' stroke='%23222' stroke-width='1'/%3E%3Cline x1='40' y1='0' x2='40' y2='60' stroke='%23222' stroke-width='1'/%3E%3Cline x1='0' y1='20' x2='60' y2='20' stroke='%23222' stroke-width='1'/%3E%3Cline x1='0' y1='40' x2='60' y2='40' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "waves", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 10 30 30 T60 30' stroke='%23222' stroke-width='2' fill='none'/%3E%3C/svg%3E" },
  { id: "stripes", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='60' height='60' fill='none'/%3E%3Crect x='0' y='0' width='10' height='60' fill='%23222' fill-opacity='0.1'/%3E%3Crect x='20' y='0' width='10' height='60' fill='%23222' fill-opacity='0.1'/%3E%3Crect x='40' y='0' width='10' height='60' fill='%23222' fill-opacity='0.1'/%3E%3C/svg%3E" },
  { id: "chevrons", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,10 30,30 60,10' stroke='%23222' stroke-width='2' fill='none'/%3E%3Cpolyline points='0,30 30,50 60,30' stroke='%23222' stroke-width='2' fill='none'/%3E%3C/svg%3E" },
  { id: "crosses", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='10' y1='10' x2='20' y2='20' stroke='%23222' stroke-width='2'/%3E%3Cline x1='20' y1='10' x2='10' y2='20' stroke='%23222' stroke-width='2'/%3E%3Cline x1='40' y1='40' x2='50' y2='50' stroke='%23222' stroke-width='2'/%3E%3Cline x1='50' y1='40' x2='40' y2='50' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "triangles", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='10,50 30,10 50,50' fill='none' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "hexagons", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,10 50,20 50,40 30,50 10,40 10,20' fill='none' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "circles", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='10' fill='none' stroke='%23222' stroke-width='2'/%3E%3Ccircle cx='45' cy='45' r='10' fill='none' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "diagonal-lines", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='60' x2='60' y2='0' stroke='%23222' stroke-width='2'/%3E%3Cline x1='0' y1='30' x2='30' y2='0' stroke='%23222' stroke-width='2'/%3E%3Cline x1='30' y1='60' x2='60' y2='30' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "minimal-leaf", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 Q40 30 30 50 Q20 30 30 10' stroke='%23222' stroke-width='2' fill='none'/%3E%3C/svg%3E" },
  { id: "waves-2", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 Q15 20 30 40 T60 40' stroke='%23222' stroke-width='2' fill='none'/%3E%3C/svg%3E" },
  { id: "dots-2", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='3' fill='%23222'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23222'/%3E%3C/svg%3E" },
  { id: "grid-2", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='10' width='40' height='40' fill='none' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "crosshatch", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='60' y2='60' stroke='%23222' stroke-width='1'/%3E%3Cline x1='60' y1='0' x2='0' y2='60' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "minimal-star", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,10 35,25 50,25 38,35 42,50 30,40 18,50 22,35 10,25 25,25' fill='none' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "minimal-flower", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23222' stroke-width='1'/%3E%3Ccircle cx='30' cy='15' r='4' fill='none' stroke='%23222' stroke-width='1'/%3E%3Ccircle cx='30' cy='45' r='4' fill='none' stroke='%23222' stroke-width='1'/%3E%3Ccircle cx='15' cy='30' r='4' fill='none' stroke='%23222' stroke-width='1'/%3E%3Ccircle cx='45' cy='30' r='4' fill='none' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "minimal-diamond", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,10 50,30 30,50 10,30' fill='none' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "minimal-zigzag", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,30 10,10 20,50 30,10 40,50 50,10 60,30' stroke='%23222' stroke-width='2' fill='none'/%3E%3C/svg%3E" },
  { id: "minimal-arrow", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='10,30 30,10 50,30' stroke='%23222' stroke-width='2' fill='none'/%3E%3Cline x1='30' y1='10' x2='30' y2='50' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "minimal-mountain", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,50 20,20 40,40 60,10' stroke='%23222' stroke-width='2' fill='none'/%3E%3C/svg%3E" },
  { id: "minimal-sun", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23222' stroke-width='2'/%3E%3Cline x1='30' y1='5' x2='30' y2='15' stroke='%23222' stroke-width='1'/%3E%3Cline x1='30' y1='45' x2='30' y2='55' stroke='%23222' stroke-width='1'/%3E%3Cline x1='5' y1='30' x2='15' y2='30' stroke='%23222' stroke-width='1'/%3E%3Cline x1='45' y1='30' x2='55' y2='30' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "minimal-square", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='15' y='15' width='30' height='30' fill='none' stroke='%23222' stroke-width='2'/%3E%3C/svg%3E" },
  { id: "minimal-pyramid", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='10,50 30,10 50,50' fill='none' stroke='%23222' stroke-width='2'/%3E%3Cline x1='30' y1='10' x2='30' y2='50' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "minimal-spiral", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 m-20 0 a20 20 0 1 1 40 0 a10 10 0 1 0 -20 0' stroke='%23222' stroke-width='2' fill='none'/%3E%3C/svg%3E" },
  { id: "minimal-rings", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23222' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23222' stroke-width='1'/%3E%3C/svg%3E" },
  { id: "minimal-bars", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='10' width='40' height='8' fill='%23222' fill-opacity='0.1'/%3E%3Crect x='10' y='26' width='40' height='8' fill='%23222' fill-opacity='0.1'/%3E%3Crect x='10' y='42' width='40' height='8' fill='%23222' fill-opacity='0.1'/%3E%3C/svg%3E" },
  { id: "minimal-checker", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='30' height='30' fill='%23222' fill-opacity='0.1'/%3E%3Crect x='30' y='30' width='30' height='30' fill='%23222' fill-opacity='0.1'/%3E%3C/svg%3E" },
  { id: "minimal-polka", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='5' fill='%23222' fill-opacity='0.1'/%3E%3Ccircle cx='45' cy='45' r='5' fill='%23222' fill-opacity='0.1'/%3E%3C/svg%3E" },
  { id: "minimal-mesh", url: "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q30 30 50 10 Q30 50 10 10' stroke='%23222' stroke-width='1' fill='none'/%3E%3C/svg%3E" },
]

const backgroundImages = [
  { id: "bg-1", url: "/assets/bg/1.webp" },
  { id: "bg-2", url: "/assets/bg/2.webp" },
  { id: "bg-3", url: "/assets/bg/3.webp" },
  { id: "bg-4", url: "/assets/bg/4.webp" },
  { id: "bg-5", url: "/assets/bg/5.webp" },
  { id: "bg-6", url: "/assets/bg/6.webp" },
  { id: "bg-7", url: "/assets/bg/7.webp" },
  { id: "bg-8", url: "/assets/bg/8.webp" },
  { id: "bg-9", url: "/assets/bg/9.webp" },
  { id: "bg-10", url: "/assets/bg/10.webp" },
  { id: "bg-11", url: "/assets/bg/11.webp" },
  { id: "bg-12", url: "/assets/bg/12.webp" },
  { id: "bg-13", url: "/assets/bg/13.webp" },
  { id: "bg-14", url: "/assets/bg/14.webp" },
  { id: "bg-15", url: "/assets/bg/15.webp" },
  { id: "bg-16", url: "/assets/bg/16.webp" },
  { id: "bg-17", url: "/assets/bg/17.webp" },
  { id: "bg-18", url: "/assets/bg/18.webp" },
  { id: "bg-19", url: "/assets/bg/19.webp" },
  { id: "bg-20", url: "/assets/bg/20.webp" },
  { id: "bg-21", url: "/assets/bg/21.webp" },
  { id: "bg-22", url: "/assets/bg/22.webp" },
  { id: "bg-23", url: "/assets/bg/23.webp" },
  { id: "bg-24", url: "/assets/bg/24.webp" },
  { id: "bg-25", url: "/assets/bg/25.webp" },
  { id: "bg-26", url: "/assets/bg/26.webp" },
  { id: "bg-27", url: "/assets/bg/27.webp" },
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
  patternScale,
  setPatternScale,
  usePatternOverlay,
  solidPatternOverlay,
  setSolidPatternOverlay,
  gradientPatternOverlay,
  setGradientPatternOverlay,
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
        <h4 className="font-bold text-xs mb-2">Background Type</h4>
        <div className="grid grid-cols-4 gap-1">
          {backgroundTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setBackgroundType(type.id as "solid" | "gradient" | "pattern" | "image")}
              className={`p-2 border-2 border-black rounded-md flex flex-col items-center gap-1 transition-all ${
                backgroundType === type.id
                  ? "bg-blue-500 text-white light-shadow"
                  : "bg-white hover:bg-gray-50 dark-shadow"
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
          <h4 className="font-bold text-xs mb-2">Solid Colors</h4>
          <div className="grid grid-cols-7 gap-2">
            {solidColors.map((color, index) => (
              <button
                key={`${color}-${index}`}
                onClick={() => setBackgroundColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  backgroundColor === color
                    ? "border-black dark-shadow"
                    : "border-black z-50 hover:border-gray-400 light-shadow hover:light-shadow"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="mt-3">
            <h4 className="font-bold text-xs mb-2">Add Pattern Overlay</h4>
            <div className="flex items-center justify-between p-2 border-2 border-black rounded-lg bg-white dark-shadow">
              <span className="text-xs">Add pattern on top of solid color</span>
              <button
                onClick={() => setSolidPatternOverlay(!solidPatternOverlay)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  solidPatternOverlay ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    solidPatternOverlay ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {backgroundType === "gradient" && (
        <div className="space-y-3">
          <div>
            <h4 className="font-bold text-xs mb-2">Gradient Presets</h4>
            <div className="grid grid-cols-4 gap-2">
              {gradientPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setGradientColors({ start: preset.start, end: preset.end })}
                  className={`h-10 rounded-md border-2 border-black transition-all ${
                    gradientColors.start === preset.start && gradientColors.end === preset.end
                      ? "dark-shadow"
                      : "hover:light-shadow"
                  }`}
                  style={{ backgroundImage: `linear-gradient(to right, ${preset.start}, ${preset.end})` }}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs mb-2">Gradient Direction</h4>
            <div className="grid grid-cols-2 gap-2">
              {gradientDirections.map((dir) => (
                <button
                  key={dir.value}
                  onClick={() => setGradientDirection(dir.value)}
                  className={`px-3 py-2 border-2 border-black rounded-lg text-xs font-medium transition-all ${
                    gradientDirection === dir.value
                      ? "bg-blue-500 text-white light-shadow"
                      : "bg-white hover:bg-gray-50 dark-shadow"
                  }`}
                >
                  {dir.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs mb-2">Add Pattern Overlay</h4>
            <div className="flex items-center justify-between p-2 border-2 border-black rounded-lg bg-white">
              <span className="text-xs">Add pattern on top of gradient</span>
              <button
                onClick={() => setGradientPatternOverlay(!gradientPatternOverlay)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  gradientPatternOverlay ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    gradientPatternOverlay ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {backgroundType === "pattern" && (
        <div className="space-y-3">
          <div>
            <p className="text-gray-600 text-xs mb-2">
              Create a pure pattern background. Use pattern overlays in other sections to add patterns on top of gradients or solid colors.
            </p>
          </div>
          <PatternPicker
            value={backgroundPattern}
            onChange={(pattern) => {
              setBackgroundPattern(pattern)
              setBackgroundType("pattern")
            }}
            baseColor={backgroundPattern?.color || "#000000"}
            patternScale={patternScale}
          />
          <div>
            <h4 className="font-bold text-xs mb-2">Pattern Density</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Sparse</span>
                <span>Dense</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={patternScale}
                onChange={(e) => setPatternScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-center text-gray-500">
                Scale: {patternScale.toFixed(1)}x
              </div>
            </div>
          </div>
          <div>
              <h4 className="font-bold text-xs mb-2">Pattern Size</h4>
            <select
              value={backgroundSize}
              onChange={(e) => setBackgroundSize(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-lg dark-shadow bg-white text-sm"
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
            <h4 className="font-bold text-xs mb-2">Pattern Position</h4>
            <select
              value={backgroundPosition}
              onChange={(e) => setBackgroundPosition(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-lg dark-shadow bg-white text-sm"
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

      {/* Pattern Overlay Section - Shows when not in pattern mode but pattern overlay is enabled */}
      {backgroundType !== "pattern" && backgroundType !== "image" && 
       ((backgroundType === "solid" && solidPatternOverlay) || 
        (backgroundType === "gradient" && gradientPatternOverlay)) && (
        <div className="space-y-3 border-t pt-3">
          <div>
            <h4 className="font-bold text-xs mb-2">Pattern Overlay</h4>
            <p className="text-gray-600 text-xs mb-2">
              Add a pattern on top of your solid color or gradient background. For pure pattern backgrounds, use the Pattern tab instead.
            </p>
          </div>
          <PatternPicker
            value={backgroundPattern}
            onChange={(pattern) => {
              setBackgroundPattern(pattern)
            }}
            baseColor={backgroundPattern?.color || "#000000"}
            patternScale={patternScale}
          />
          <div>
            <h4 className="font-bold text-xs mb-2">Pattern Density</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Sparse</span>
                <span>Dense</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={patternScale}
                onChange={(e) => setPatternScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-center text-gray-500">
                Scale: {patternScale.toFixed(1)}x
              </div>
            </div>
          </div>
        </div>
      )}

      {backgroundType === "image" && (
        <div className="space-y-3">
          <div>
            <h4 className="font-bold text-xs mb-2">Background Images</h4>
            <div className="grid grid-cols-5 gap-2">
              {backgroundImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setBackgroundImage(img.url)}
                  className={`aspect-square border-2 border-black rounded-lg overflow-hidden flex items-center justify-center transition-all ${
                    backgroundImage === img.url
                      ? "bg-blue-500 dark-shadow"
                      : "bg-gray-100 hover:bg-gray-50 shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <img src={img.url} alt={img.id} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="bg-image-upload" />
            <label
              htmlFor="bg-image-upload"
              className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg border-2 border-black dark-shadow hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-xs cursor-pointer"
            >
              <ImageIcon className="w-3 h-3" />
              Upload Custom Image
            </label>
          </div>
          <div>
            <h4 className="font-bold text-xs mb-2">Image Size</h4>
            <select
              value={backgroundSize}
              onChange={(e) => setBackgroundSize(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-lg dark-shadow bg-white text-sm"
            >
              <option value="auto">Auto</option>
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </div>
          <div>
            <h4 className="font-bold text-xs mb-2">Image Position</h4>
            <select
              value={backgroundPosition}
              onChange={(e) => setBackgroundPosition(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-lg dark-shadow bg-white text-sm"
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
