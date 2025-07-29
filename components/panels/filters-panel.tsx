"use client"

import { Switch } from "@/components/ui/switch"

interface FiltersPanelProps {
  useFilters: boolean
  setUseFilters: (use: boolean) => void
  brightness: number
  setBrightness: (value: number) => void
  contrast: number
  setContrast: (value: number) => void
  saturation: number
  setSaturation: (value: number) => void
  blur: number
  setBlur: (value: number) => void
  grayscale: number
  setGrayscale: (value: number) => void
  hueRotate: number
  setHueRotate: (value: number) => void
  invert: number
  setInvert: (value: number) => void
  sepia: number
  setSepia: (value: number) => void
}

// Filter presets - Instagram-like filters
const filterPresets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    sepia: 0,
  },
  vintage: {
    brightness: 110,
    contrast: 95,
    saturation: 85,
    blur: 0,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    sepia: 30,
  },
  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 120,
    blur: 0,
    grayscale: 0,
    hueRotate: 180,
    invert: 0,
    sepia: 0,
  },
  warm: {
    brightness: 105,
    contrast: 105,
    saturation: 110,
    blur: 0,
    grayscale: 0,
    hueRotate: 15,
    invert: 0,
    sepia: 10,
  },
  dramatic: {
    brightness: 90,
    contrast: 140,
    saturation: 130,
    blur: 0,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    sepia: 0,
  },
  blackwhite: {
    brightness: 105,
    contrast: 115,
    saturation: 100,
    blur: 0,
    grayscale: 100,
    hueRotate: 0,
    invert: 0,
    sepia: 0,
  },
  soft: {
    brightness: 110,
    contrast: 85,
    saturation: 90,
    blur: 1,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    sepia: 5,
  },
  sharp: {
    brightness: 100,
    contrast: 130,
    saturation: 110,
    blur: 0,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    sepia: 0,
  },
}

export default function FiltersPanel({
  useFilters,
  setUseFilters,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  saturation,
  setSaturation,
  blur,
  setBlur,
  grayscale,
  setGrayscale,
  hueRotate,
  setHueRotate,
  invert,
  setInvert,
  sepia,
  setSepia,
}: FiltersPanelProps) {
  const filterControls = [
    { label: "Brightness", value: brightness, setter: setBrightness, min: 0, max: 200, unit: "%" },
    { label: "Contrast", value: contrast, setter: setContrast, min: 0, max: 200, unit: "%" },
    { label: "Saturation", value: saturation, setter: setSaturation, min: 0, max: 200, unit: "%" },
    { label: "Blur", value: blur, setter: setBlur, min: 0, max: 20, unit: "px" },
    { label: "Grayscale", value: grayscale, setter: setGrayscale, min: 0, max: 100, unit: "%" },
    { label: "Hue Rotate", value: hueRotate, setter: setHueRotate, min: 0, max: 360, unit: "deg" },
    { label: "Invert", value: invert, setter: setInvert, min: 0, max: 100, unit: "%" },
    { label: "Sepia", value: sepia, setter: setSepia, min: 0, max: 100, unit: "%" },
  ]

  const applyPreset = (presetName: keyof typeof filterPresets) => {
    const preset = filterPresets[presetName]
    setBrightness(preset.brightness)
    setContrast(preset.contrast)
    setSaturation(preset.saturation)
    setBlur(preset.blur)
    setGrayscale(preset.grayscale)
    setHueRotate(preset.hueRotate)
    setInvert(preset.invert)
    setSepia(preset.sepia)
    setUseFilters(true) // Auto-enable filters when applying preset
  }

  return (
    <div className="p-3 space-y-3">
      <div>
        <h3 className="font-bold text-sm mb-1">Filters</h3>
        <p className="text-gray-600 text-xs mb-2">
          Fine-tune your look with effects like brightness, contrast, and blur.
        </p>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span className="font-bold text-xs">Use Filters</span>
        <Switch checked={useFilters} onCheckedChange={setUseFilters} />
      </div>

     

      {/* Filter Presets */}
      <div className="space-y-2">
        <h4 className="font-medium text-xs">Filter Presets</h4>
        <div className="grid grid-cols-2 gap-1">
          {Object.keys(filterPresets).map((presetName) => (
            <button
              key={presetName}
              onClick={() => applyPreset(presetName as keyof typeof filterPresets)}
              className="px-2 py-1 border-2 border-black rounded-md text-xs font-medium transition-all bg-white hover:bg-gray-50 dark-shadow capitalize"
            >
              {presetName === "blackwhite" ? "B&W" : presetName}
            </button>
          ))}
        </div>
      
      </div>

      {/* Manual Filter Controls */}
      <div className="space-y-4">
        <h4 className="font-bold text-xs border-t border-gray-200 pt-3">Manual Adjustments</h4>
        {filterControls.map((control) => (
          <div key={control.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-xs">{control.label}</span>
              <span className="text-xs text-gray-600">
                {control.value}
                {control.unit}
              </span>
            </div>
            <input
              type="range"
              min={control.min}
              max={control.max}
              value={control.value}
              onChange={(e) => control.setter(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              disabled={!useFilters}
            />
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="pt-3 border-t border-gray-200">
        <button
          onClick={() => applyPreset("normal")}
          className="w-full px-3 py-2 border-2 border-black rounded-lg dark-shadow bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-medium text-xs"
          disabled={!useFilters}
        >
          Reset to Normal
        </button>
      </div>
    </div>
  )
}
