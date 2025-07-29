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
  setGridSnap,
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
     
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-bold text-sm mb-1">Position</h3>
        <p className="text-xs text-gray-500 mb-2">
          Move, rotate, and resize your image to get the perfect framing and angle.
        </p>
       
        <div className="space-y-6">
          {/* Zoom Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs">Zoom</span>
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
                <span className="font-bold text-xs">Rotate</span>
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
            <h4 className="font-bold text-xs">Position Presets</h4>
            <div className="grid grid-cols-5 gap-1">
              {positionPresets.map((preset, index) => {
                const positions = [
                  { top: "10%", left: "10%" }, // TL
                  { top: "10%", left: "50%", transform: "translateX(-50%)" }, // TC
                  { top: "10%", right: "10%" }, // TR
                  { top: "50%", left: "10%", transform: "translateY(-50%)" }, // CL
                  { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }, // C
                  { top: "50%", right: "10%", transform: "translateY(-50%)" }, // CR
                  { bottom: "10%", left: "10%" }, // BL
                  { bottom: "10%", left: "50%", transform: "translateX(-50%)" }, // BC
                  { bottom: "10%", right: "10%" }, // BR
                ]
                const style = positions[index]
                return (
                  <button
                    key={preset.label}
                    onClick={() => setPosition({ x: preset.x, y: preset.y })}
                    className={`relative aspect-square border-2 border-black rounded-md transition-all text-[10px] font-medium overflow-hidden w-10 h-10 flex items-center justify-center ${
                      position.x === preset.x && position.y === preset.y
                        ? "bg-blue-500 text-white dark-shadow"
                        : "bg-white hover:bg-gray-50 dark-shadow"
                    }`}
                  >
                    {/* Visual position indicator */}
                    <div
                      style={{
                        position: "absolute",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: position.x === preset.x && position.y === preset.y ? "#fff" : "#222",
                        border: position.x === preset.x && position.y === preset.y ? "2px solid #fff" : "2px solid #222",
                        boxShadow: position.x === preset.x && position.y === preset.y ? "0 0 0 2px #2563eb" : "0 0 0 1px #222",
                        ...style,
                      }}
                    />
                  </button>
                )
              })}
            </div>
            
          </div>

          {/* Manual Position */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs">Manual Position</h4>
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

          {/* Flip Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs">Flip Image</h4>
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
                      ? "bg-blue-500 text-white dark-shadow"
                      : "bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] dark-shadow"
                  }`}
                >
                  <FlipHorizontal className="w-4 h-4" />
                  <span className="text-xs font-bold">Horizontal</span>
                </button>
                <button
                  onClick={() => setFlipVertical(!flipVertical)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-black rounded-lg transition-all ${
                    flipVertical
                      ? "bg-blue-500 text-white dark-shadow"
                      : "bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] dark-shadow"
                  }`}
                >
                  <FlipVertical className="w-4 h-4" />
                  <span className="text-xs font-bold">Vertical</span>
                </button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={resetAll}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-black rounded-lg dark-shadow bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-medium text-sm"
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
