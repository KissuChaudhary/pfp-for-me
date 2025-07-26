"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react" // Import useRef
import Header from "@/components/header"
import ImageCanvas from "@/components/image-canvas"
import ToolBar from "@/components/tool-bar"
import ActionButtons from "@/components/action-buttons"
import RightPanel from "@/components/right-panel"
import MobileUnifiedPanel from "@/components/mobile-unified-panel"

export default function ProfilePictureEditor() {
  const [activePanel, setActivePanel] = useState<string | null>("position")
  const [hasImage, setHasImage] = useState(false)

  // Position controls state
  const [zoom, setZoom] = useState(1.0)
  const [rotate, setRotate] = useState(0)
  const [flipHorizontal, setFlipHorizontal] = useState(false)
  const [flipVertical, setFlipVertical] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Grid snapping state
  const [gridSnap, setGridSnap] = useState(false)
  const [gridSize, setGridSize] = useState(20)

  // Background controls state
  const [backgroundType, setBackgroundType] = useState<"solid" | "gradient" | "pattern" | "image">("solid")
  const [backgroundColor, setBackgroundColor] = useState("#5B9BD5")
  const [gradientColors, setGradientColors] = useState({ start: "#4ECDC4", end: "#45B7D1" })
  const [gradientDirection, setGradientDirection] = useState("to right")
  const [backgroundPattern, setBackgroundPattern] = useState("/placeholder.svg?height=60&width=60")
  const [backgroundImage, setBackgroundImage] = useState("/placeholder.svg?height=100&width=100")
  const [backgroundSize, setBackgroundSize] = useState("cover")
  const [backgroundPosition, setBackgroundPosition] = useState("center")

  // Filter controls state
  const [useFilters, setUseFilters] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [grayscale, setGrayscale] = useState(0)
  const [hueRotate, setHueRotate] = useState(0)
  const [invert, setInvert] = useState(0)
  const [sepia, setSepia] = useState(0)

  // Border controls state
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderColor, setBorderColor] = useState("#FF6B6B")
  const [borderOpacity, setBorderOpacity] = useState(100)
  const [borderType, setBorderType] = useState<"solid" | "gradient">("solid")
  const [borderGradientColors, setBorderGradientColors] = useState({ start: "#FFD700", end: "#FFA500" })
  const [borderGradientDirection, setBorderGradientDirection] = useState("to right")
  const [borderOffset, setBorderOffset] = useState(0)
  const [borderAmount, setBorderAmount] = useState(100)
  const [borderRotation, setBorderRotation] = useState(0)
  const [borderCapStyle, setBorderCapStyle] = useState<"rounded" | "square" | "beveled">("rounded")

  // Refs for ImageCanvas actions
  const imageCanvasRef = useRef<React.ElementRef<typeof ImageCanvas> | null>(null) // Corrected to useRef

  // Function to reset all settings (except the image itself)
  const handleResetAllSettings = useCallback(() => {
    // Reset Position controls
    setZoom(1.0)
    setRotate(0)
    setFlipHorizontal(false)
    setFlipVertical(false)
    setPosition({ x: 0, y: 0 })
    setGridSnap(false)
    setGridSize(20)

    // Reset Background controls
    setBackgroundType("solid")
    setBackgroundColor("#5B9BD5")
    setGradientColors({ start: "#4ECDC4", end: "#45B7D1" })
    setGradientDirection("to right")
    setBackgroundPattern("/placeholder.svg?height=60&width=60")
    setBackgroundImage("/placeholder.svg?height=100&width=100")
    setBackgroundSize("cover")
    setBackgroundPosition("center")

    // Reset Filter controls
    setUseFilters(false)
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setBlur(0)
    setGrayscale(0)
    setHueRotate(0)
    setInvert(0)
    setSepia(0)

    // Reset Border controls
    setBorderWidth(0)
    setBorderColor("#FF6B6B")
    setBorderOpacity(100)
    setBorderType("solid")
    setBorderGradientColors({ start: "#FFD700", end: "#FFA500" })
    setBorderGradientDirection("to right")
    setBorderOffset(0)
    setBorderAmount(100)
    setBorderRotation(0)
    setBorderCapStyle("rounded")
  }, [])

  // Callbacks for ActionButtons
  const handleUploadClick = useCallback(() => {
    imageCanvasRef.current?.triggerFileInput()
  }, []) // No need to depend on imageCanvasRef as it's a stable ref

  const handleExportClick = useCallback(() => {
    imageCanvasRef.current?.exportImage()
  }, []) // No need to depend on imageCanvasRef as it's a stable ref

  const positionProps = {
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
  }

  const backgroundProps = {
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
  }

  const filterProps = {
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
  }

  const borderProps = {
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
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header />

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <ToolBar activePanel={activePanel} setActivePanel={setActivePanel} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <ImageCanvas
              ref={imageCanvasRef} // Attach ref here
              hasImage={hasImage}
              setHasImage={setHasImage}
              zoom={zoom}
              rotate={rotate}
              flipHorizontal={flipHorizontal}
              flipVertical={flipVertical}
              position={position}
              setPosition={setPosition}
              gridSnap={gridSnap}
              gridSize={gridSize}
              {...backgroundProps}
              {...filterProps}
              {...borderProps}
            />
            <ActionButtons
              onUploadClick={handleUploadClick}
              onResetClick={handleResetAllSettings}
              onExportClick={handleExportClick}
            />
          </div>
        </div>
        <div className="md:block">
          <RightPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            positionProps={positionProps}
            backgroundProps={backgroundProps}
            filterProps={filterProps}
            borderProps={borderProps}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col flex-1 overflow-hidden">
        {/* Image Area - Moved to top with less space */}
        <div className="flex-[4] flex flex-col justify-start items-center pt-4 px-2">
          <ImageCanvas
            ref={imageCanvasRef} // Attach ref here
            hasImage={hasImage}
            setHasImage={setHasImage}
            zoom={zoom}
            rotate={rotate}
            flipHorizontal={flipHorizontal}
            flipVertical={flipVertical}
            position={position}
            setPosition={setPosition}
            gridSnap={gridSnap}
            gridSize={gridSize}
            {...backgroundProps}
            {...filterProps}
            {...borderProps}
          />
          <ActionButtons
            onUploadClick={handleUploadClick}
            onResetClick={handleResetAllSettings}
            onExportClick={handleExportClick}
          />
        </div>

        {/* Control Panel - More space and moved up */}
        <div className="flex-[6] min-h-0 px-4 pb-4">
          <MobileUnifiedPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            positionProps={positionProps}
            backgroundProps={backgroundProps}
            filterProps={filterProps}
            borderProps={borderProps}
          />
        </div>
      </div>
    </div>
  )
}
