"use client"

import { useState } from "react"
import { FlipHorizontal, FlipVertical, RotateCcw } from "lucide-react"

interface PositionPanelProps {
  zoom: number
  setZoom: (zoom: number) => void
  rotate: number
  setRotate: (rotate: number) => void
  flipHorizontal: boolean
  setFlipHorizontal: (flip: boolean) => void
  flipVertical: boolean
  setFlipVertical: (flip: boolean) => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
  gridSnap: boolean
  setGridSnap: (snap: boolean) => void
  gridSize: number
  setGridSize: (size: number) => void
}

const positionPresets = [
  { label: "Top Left", x: -50, y: -50 },
  { label: "Top Center", x: 0, y: -50 },
  { label: "Top Right", x: 50, y: -50 },
  { label: "Center Left", x: -50, y: 0 },
  { label: "Center", x: 0, y: 0 },
  { label: "Center Right", x: 50, y: 0 },
  { label: "Bottom Left", x: -50, y: 50 },
  { label: "Bottom Center", x: 0, y: 50 },
  { label: "Bottom Right", x: 50, y: 50 },
]

export default function PositionPanel({
  zoom,
  setZoom,
  rotate,
  setRotate,
  flipHorizontal,
  setFlipHorizontal,
  flipVertical,
  setFlipVertical,
  position,
  setPosition,
  gridSnap,
  setGridSnap,
  gridSize,
  setGridSize,
}: PositionPanelProps) {
  const [showFlip, setShowFlip] = useState(false)

  const resetAll = () => {
    setZoom(1.0)
    setRotate(0)
    setFlipHorizontal(false)
    setFlipVertical(false)
    setPosition({ x: 0, y: 0 })
    setGridSnap(false)
    setGridSize(20)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <h3 className="font-bold text-lg mb-1">Position</h3>
        <p className="text-xs text-gray-500">
          Move, rotate, and resize your image to get the perfect framing and angle.
        </p>
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 <strong>Tip:</strong> Click and drag the image to reposition it manually!
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Zoom Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Zoom</span>
              <span className="text-sm text-gray-500">{zoom.toFixed(1)}x</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Rotate Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Rotate</span>
              <span className="text-sm text-gray-500">{rotate}°</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={rotate}
                onChange={(e) => setRotate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Position Presets */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Position Presets</h4>
            <div className="grid grid-cols-3 gap-2">
              {positionPresets.map((preset, index) => (
                <button
                  key={preset.label}
                  onClick={() => setPosition({ x: preset.x, y: preset.y })}
                  className={`aspect-square border-2 border-black rounded-lg flex items-center justify-center transition-all text-xs font-medium ${
                    position.x === preset.x && position.y === preset.y
                      ? "bg-blue-500 text-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-gray-50 shadow-[1px_1px_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      position.x === preset.x && position.y === preset.y ? "bg-white" : "bg-black"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1 text-xs text-gray-500 text-center">
              <span>TL</span>
              <span>TC</span>
              <span>TR</span>
              <span>CL</span>
              <span>C</span>
              <span>CR</span>
              <span>BL</span>
              <span>BC</span>
              <span>BR</span>
            </div>
          </div>

          {/* Manual Position */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Manual Position</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">X Position</label>
                <input
                  type="range"
                  min="-200"
                  max="200"
                  value={position.x}
                  onChange={(e) => setPosition({ ...position, x: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-gray-500 text-center mt-1">{position.x}px</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Y Position</label>
                <input
                  type="range"
                  min="-200"
                  max="200"
                  value={position.y}
                  onChange={(e) => setPosition({ ...position, y: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-gray-500 text-center mt-1">{position.y}px</div>
              </div>
            </div>
          </div>

          {/* Grid Snapping */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Grid Snapping</h4>
              <button
                onClick={() => setGridSnap(!gridSnap)}
                className={`w-10 h-5 rounded-full border-2 border-black transition-colors relative ${
                  gridSnap ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white border border-black rounded-full absolute top-0.5 transition-transform ${
                    gridSnap ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {gridSnap && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Grid Size</span>
                  <span className="text-xs text-gray-500">{gridSize}px</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex gap-1 mt-2">
                  {[10, 20, 25, 50].map((size) => (
                    <button
                      key={size}
                      onClick={() => setGridSize(size)}
                      className={`flex-1 px-2 py-1 text-xs border border-black rounded transition-all ${
                        gridSize === size ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-700">
                    🎯 Grid snapping is active! Your image will snap to {gridSize}px intervals.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Flip Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Flip Image</h4>
              <button onClick={() => setShowFlip(!showFlip)} className="text-xs text-blue-500 hover:text-blue-600">
                {showFlip ? "Hide" : "Show"}
              </button>
            </div>

            {showFlip && (
              <div className="flex gap-2">
                <button
                  onClick={() => setFlipHorizontal(!flipHorizontal)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-black rounded-lg transition-all ${
                    flipHorizontal
                      ? "bg-blue-500 text-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                      : "bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] shadow-[2px_2px_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <FlipHorizontal className="w-4 h-4" />
                  <span className="text-xs font-medium">Horizontal</span>
                </button>
                <button
                  onClick={() => setFlipVertical(!flipVertical)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-black rounded-lg transition-all ${
                    flipVertical
                      ? "bg-blue-500 text-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                      : "bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] shadow-[2px_2px_0_rgba(0,0,0,1)]"
                  }`}
                >
                  <FlipVertical className="w-4 h-4" />
                  <span className="text-xs font-medium">Vertical</span>
                </button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={resetAll}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0_rgba(0,0,0,1)] bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-medium text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
