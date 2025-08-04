"use client"

import { Minus, LoaderCircle, AlignLeft, Palette, Rainbow } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TextPanelProps {
  showText: boolean
  setShowText: (show: boolean) => void
  textContent: string
  setTextContent: (text: string) => void
  fontSize: number
  setFontSize: (size: number) => void
  textStyle: "straight" | "curved" | "vertical"
  setTextStyle: (style: "straight" | "curved" | "vertical") => void
  textPositionX: number
  setTextPositionX: (x: number) => void
  textPositionY: number
  setTextPositionY: (y: number) => void
  fontFamily: string
  setFontFamily: (family: string) => void
  fontWeight: string
  setFontWeight: (weight: string) => void
  letterSpacing: number
  setLetterSpacing: (spacing: number) => void
  textColorType: "solid" | "gradient"
  setTextColorType: (type: "solid" | "gradient") => void
  textColor: string
  setTextColor: (color: string) => void
  textGradientColors: { start: string; end: string }
  setTextGradientColors: (colors: { start: string; end: string }) => void
  textOpacity: number
  setTextOpacity: (opacity: number) => void
  // Curved text specific props
  curveRadius: number
  setCurveRadius: (radius: number) => void
  startAngle: number
  setStartAngle: (angle: number) => void
  arcDirection: "clockwise" | "counterclockwise"
  setArcDirection: (direction: "clockwise" | "counterclockwise") => void
}

const fontFamilies = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
  { value: "Courier New", label: "Courier New" },
  { value: "Impact", label: "Impact" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
  { value: "Lucida Sans", label: "Lucida Sans" },
]

const fontWeights = [
  { value: "normal", label: "Normal" },
  { value: "bold", label: "Bold" },
  { value: "100", label: "Thin" },
  { value: "200", label: "Extra Light" },
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
]

const colorPalette = [
  { name: "Red", color: "#f87171" },
  { name: "Orange", color: "#fb923c" },
  { name: "Amber", color: "#fbbf24" },
  { name: "Lime", color: "#a3e635" },
  { name: "Emerald", color: "#34d399" },
  { name: "Sky", color: "#38bdf8" },
  { name: "Blue", color: "#60a5fa" },
  { name: "Indigo", color: "#818cf8" },
  { name: "Violet", color: "#a78bfa" },
  { name: "Pink", color: "#f472b6" },
  { name: "Gray", color: "#9ca3af" },
  { name: "Brown", color: "#a8a29e" },
  { name: "Black", color: "#171717" },
  { name: "White", color: "#f3f4f6" },
]

export default function TextPanel({
  showText,
  setShowText,
  textContent,
  setTextContent,
  fontSize,
  setFontSize,
  textStyle,
  setTextStyle,
  textPositionX,
  setTextPositionX,
  textPositionY,
  setTextPositionY,
  fontFamily,
  setFontFamily,
  fontWeight,
  setFontWeight,
  letterSpacing,
  setLetterSpacing,
  textColorType,
  setTextColorType,
  textColor,
  setTextColor,
  textGradientColors,
  setTextGradientColors,
  textOpacity,
  setTextOpacity,
  curveRadius,
  setCurveRadius,
  startAngle,
  setStartAngle,
  arcDirection,
  setArcDirection,
}: TextPanelProps) {
  return (
    <div className="flex flex-col h-full">
     
      {/* Scrollable Content */}
      <section className="flex-grow overflow-y-auto px-2.5 py-1.5 md:p-4">
         {/* Header */}
      <div className="flex flex-col items-start gap-x-2 mb-2 flex-col">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold text-sm mb-1">Text</h3>
        </div>
        <p className="text-xs text-gray-500">Add words, names, or captions with full font controls.</p>
      </div>
        {/* Show Text Toggle - Reduced size */}
        <div className="flex items-center space-x-1 mb-3 py-0.5">
          <Switch
            checked={showText}
            onCheckedChange={setShowText}
            id="show-text-switch"
          />
          <label htmlFor="show-text-switch" className="text-xs font-medium leading-none">
            Show Text
          </label>
        </div>

        {/* Text Controls - Disabled when text is off */}
        <div className={`space-y-4 ${!showText ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Text Input */}
          <div className="space-y-2">
            <Input
              id="text-input"
              placeholder="Enter your text"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="h-8 text-xs dark-shadow border-black border-2"
            />
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold">Font Size</span>
              <span className="text-xs text-gray-500">{fontSize}px</span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              min={8}
              max={72}
              step={1}
              className="w-full"
            />
          </div>

          {/* Text Style */}
          <div className="space-y-2">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold">Text Style</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={textStyle === "straight" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextStyle("straight")}
                className="flex flex-col items-center justify-center border-2 border-black py-2 h-12 gap-1 dark-shadow"
              >
                <Minus className="h-3 w-3 mb-1" />
                <span className="text-xs font-medium">Straight</span>
              </Button>
              <Button
                variant={textStyle === "curved" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextStyle("curved")}
                className="flex flex-col items-center border-2 border-black justify-center py-1 h-12 gap-1 dark-shadow"
              >
                <LoaderCircle className="h-3 w-3 mb-1 rotate-[10deg]" />
                <span className="text-xs font-medium">Curved</span>
              </Button>
              <Button
                variant={textStyle === "vertical" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextStyle("vertical")}
                className="flex flex-col items-center justify-center border-2 border-black py-1 h-12 gap-1 dark-shadow"
              >
                <AlignLeft className="h-3 w-3 mb-1 rotate-90" />
                <span className="text-xs font-medium">Vertical</span>
              </Button>
            </div>
          </div>

          {/* Position Controls - Only show for straight and vertical text */}
          {textStyle !== "curved" && (
            <>
              {/* Position X */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-bold">Position X</span>
                  <span className="text-xs text-gray-500">{textPositionX}%</span>
                </div>
                <Slider
                  value={[textPositionX]}
                  onValueChange={(value) => setTextPositionX(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Position Y */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-bold">Position Y</span>
                  <span className="text-xs text-gray-500">{textPositionY}%</span>
                </div>
                <Slider
                  value={[textPositionY]}
                  onValueChange={(value) => setTextPositionY(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </>
          )}

          {/* Curved Text Controls - Only show for curved text */}
          {textStyle === "curved" && (
            <>
              {/* Curve Radius */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-bold">Curve Radius</span>
                  <span className="text-xs text-gray-500">{curveRadius}%</span>
                </div>
                <Slider
                  value={[curveRadius]}
                  onValueChange={(value) => setCurveRadius(value[0])}
                  min={10}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Start Angle */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-bold">Start Angle</span>
                  <span className="text-xs text-gray-500">{startAngle}°</span>
                </div>
                <Slider
                  value={[startAngle]}
                  onValueChange={(value) => setStartAngle(value[0])}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Arc Direction */}
              <div className="space-y-2">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold">Arc Direction</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={arcDirection === "clockwise" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setArcDirection("clockwise")}
                    className="flex items-center justify-center border-2 border-black py-2 h-10 gap-1 dark-shadow"
                  >
                    <span className="text-xs font-medium">Clockwise</span>
                  </Button>
                  <Button
                    variant={arcDirection === "counterclockwise" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setArcDirection("counterclockwise")}
                    className="flex items-center justify-center border-2 border-black py-2 h-10 gap-1 dark-shadow"
                  >
                    <span className="text-xs font-medium">Counter</span>
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Font Family */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold">Font Family</span>
            </div>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="w-full h-8 text-xs dark-shadow border-black border-2">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value} className="text-xs">
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold">Font Weight</span>
            </div>
            <Select value={fontWeight} onValueChange={setFontWeight}>
              <SelectTrigger className="w-full h-8 text-xs dark-shadow border-black border-2">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                {fontWeights.map((weight) => (
                  <SelectItem key={weight.value} value={weight.value} className="text-xs">
                    {weight.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Letter Spacing */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold">Letter Spacing</span>
              <span className="text-xs text-gray-500">{letterSpacing}px</span>
            </div>
            <Slider
              value={[letterSpacing]}
              onValueChange={(value) => setLetterSpacing(value[0])}
              min={-10}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Text Color Type */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold">Text Color</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={textColorType === "solid" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextColorType("solid")}
                className="flex flex-col items-center justify-center border-2 border-black py-1 h-12 dark-shadow"
              >
                <Palette className="h-3 w-3 mb-1" />
                <span className="text-xs">Solid</span>
              </Button>
              <Button
                variant={textColorType === "gradient" ? "default" : "outline"}
                size="sm"
                onClick={() => setTextColorType("gradient")}
                className="flex flex-col items-center justify-center py-1 h-12"
              >
                <Rainbow className="h-3 w-3 mb-1" />
                <span className="text-xs">Gradient</span>
              </Button>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold">Text Color</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {colorPalette.map((color) => (
                <div
                  key={color.name}
                  className={`h-8 w-8 md:h-8 md:w-8 border-2 py-2 border-black rounded-md z-50 cursor-pointer hover:border-gray-400 ${
                    textColor === color.color ? "dark-shadow" : "light-shadow"
                  }`}
                  title={color.name}
                  style={{ backgroundColor: color.color }}
                  onClick={() => setTextColor(color.color)}
                />
              ))}
              <div className="h-8 w-8 md:h-8 md:w-8 bg-rainbow border-2 border-black rounded-full flex items-center justify-center cursor-pointer hover:text-gray-400 hover:border-gray-400 light-shadow">
                <span className="text-sm">+</span>
              </div>
            </div>
          </div>

          {/* Text Opacity */}
          <div className="space-y-2">
            <div className="flex justify-between">
                    <span className="text-xs font-bold">Text Opacity</span>
              <span className="text-xs text-gray-500">{textOpacity}%</span>
            </div>
            <Slider
              value={[textOpacity]}
              onValueChange={(value) => setTextOpacity(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  )
} 