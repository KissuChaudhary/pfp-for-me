"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react" // Import useEffect
import Header from "@/components/header"
import ImageCanvas, { type ImageCanvasRef } from "@/components/image-canvas"
import ToolBar from "@/components/tool-bar"
import ActionButtons from "@/components/action-buttons"
import RightPanel from "@/components/right-panel"
import MobileUnifiedPanel from "@/components/mobile-unified-panel"
import { Pattern } from "@/lib/patterns"

// Add the border radius hook import
import { useImageBorderRadius } from "@/hooks/useImageBorderRadius"

export default function ProfilePictureEditor() {
  const [activePanel, setActivePanel] = useState<string | null>("position")
  const [hasImage, setHasImage] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null) // Add imageUrl state
  const [mobileContainerSize, setMobileContainerSize] = useState(320) // Add mobile container size state

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
  const [backgroundColor, setBackgroundColor] = useState("#e8e8e8")
  const [gradientColors, setGradientColors] = useState({ start: "#4ECDC4", end: "#45B7D1" })
  const [gradientDirection, setGradientDirection] = useState("to right")
  const [backgroundPattern, setBackgroundPattern] = useState<Pattern | null>(null)
  const [backgroundImage, setBackgroundImage] = useState("/placeholder.svg?height=100&width=100")
  const [backgroundSize, setBackgroundSize] = useState("cover")
  const [backgroundPosition, setBackgroundPosition] = useState("center")
  const [patternScale, setPatternScale] = useState(1.0) // New state for pattern density/size
  const [solidPatternOverlay, setSolidPatternOverlay] = useState(false) // Pattern overlay for solid backgrounds
  const [gradientPatternOverlay, setGradientPatternOverlay] = useState(false) // Pattern overlay for gradient backgrounds

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
  const [borderWidth, setBorderWidth] = useState(5)
  const [borderColor, setBorderColor] = useState("#000000")
  const [borderOpacity, setBorderOpacity] = useState(100)
  const [borderType, setBorderType] = useState<"solid" | "gradient">("solid")
  const [borderGradientColors, setBorderGradientColors] = useState({ start: "#FFD700", end: "#FFA500" })
  const [borderGradientDirection, setBorderGradientDirection] = useState("to right")
  const [borderOffset, setBorderOffset] = useState(0)
  const [borderAmount, setBorderAmount] = useState(100)
  const [borderRotation, setBorderRotation] = useState(0)
  const [borderCapStyle, setBorderCapStyle] = useState<"rounded" | "square" | "beveled">("rounded")
  
  // Static border controls state
  const [borderMode, setBorderMode] = useState<"dynamic" | "static">("dynamic")
  const [selectedStaticBorder, setSelectedStaticBorder] = useState<string | null>(null)

  // Pix Art state
  const [selectedPixArt, setSelectedPixArt] = useState<string | null>(null)
  const [pixArtSize, setPixArtSize] = useState<number>(100) // 100% = full size, can only increase

  // Text state
  const [showText, setShowText] = useState(false)
  const [textContent, setTextContent] = useState("")
  const [fontSize, setFontSize] = useState(55)
  const [textStyle, setTextStyle] = useState<"straight" | "curved" | "vertical">("straight")
  const [textPositionX, setTextPositionX] = useState(50)
  const [textPositionY, setTextPositionY] = useState(50)
  const [fontFamily, setFontFamily] = useState("Arial")
  const [fontWeight, setFontWeight] = useState("normal")
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [textColorType, setTextColorType] = useState<"solid" | "gradient">("solid")
  const [textColor, setTextColor] = useState("#171717")
  const [textGradientColors, setTextGradientColors] = useState({ start: "#FF6B6B", end: "#4ECDC4" })
  const [textOpacity, setTextOpacity] = useState(100)
  // Curved text state
  const [curveRadius, setCurveRadius] = useState(25)
  const [startAngle, setStartAngle] = useState(0)
  const [arcDirection, setArcDirection] = useState<"clockwise" | "counterclockwise">("clockwise")

  // Refs for ImageCanvas actions
  const imageCanvasRef = useRef<ImageCanvasRef | null>(null) // Corrected to useRef

  // Calculate border radius based on border cap style
  const imageBorderRadius = useImageBorderRadius(borderCapStyle)

  // Effect to reset usePatternOverlay when backgroundType changes to "image"
  useEffect(() => {
    if (backgroundType === "image") {
      setSolidPatternOverlay(false)
      setGradientPatternOverlay(false)
    }
  }, [backgroundType])

  // Load image from localStorage on mount
  useEffect(() => {
    const storedImageUrl = localStorage.getItem("pfp_editor_image_url")
    if (storedImageUrl) {
      setImageUrl(storedImageUrl)
      setHasImage(true)
    }
  }, [])

  // Calculate mobile container size based on screen width
  useEffect(() => {
    const updateMobileSize = () => {
      const vw = window.innerWidth
      const newSize = Math.min(320, vw * 0.85)
      setMobileContainerSize(newSize)
    }

    updateMobileSize()
    window.addEventListener('resize', updateMobileSize)
    return () => window.removeEventListener('resize', updateMobileSize)
  }, [])

  // Computed pattern overlay state based on current background type
  const usePatternOverlay = backgroundType === "solid" ? solidPatternOverlay : 
                           backgroundType === "gradient" ? gradientPatternOverlay : 
                           false

  // Function to reset all settings (including the image)
  const handleResetAllSettings = useCallback(() => {
    // Clear the image
    setImageUrl(null)
    setHasImage(false)
    localStorage.removeItem("pfp_editor_image_url")

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
    setBackgroundPattern(null)
    setBackgroundImage("/placeholder.svg?height=100&width=100")
    setBackgroundSize("cover")
    setBackgroundPosition("center")
    setPatternScale(1.0) // Reset pattern scale
    setSolidPatternOverlay(false) // Reset pattern overlay
    setGradientPatternOverlay(false) // Reset pattern overlay

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
    setBorderWidth(10)
    setBorderColor("#FF6B6B")
    setBorderOpacity(100)
    setBorderType("solid")
    setBorderGradientColors({ start: "#FFD700", end: "#FFA500" })
    setBorderGradientDirection("to right")
    setBorderOffset(0)
    setBorderAmount(100)
    setBorderRotation(0)
    setBorderCapStyle("rounded")
    
    // Reset Static Border controls
    setBorderMode("dynamic")
    setSelectedStaticBorder(null)
    
    // Reset Pix Art controls
    setSelectedPixArt(null)
    setPixArtSize(100)
    
    // Reset Text controls
    setShowText(false)
    setTextContent("")
    setFontSize(55)
    setTextStyle("straight")
    setTextPositionX(50)
    setTextPositionY(50)
    setFontFamily("Arial")
    setFontWeight("normal")
    setLetterSpacing(0)
    setTextColorType("solid")
    setTextColor("#171717")
    setTextGradientColors({ start: "#FF6B6B", end: "#4ECDC4" })
    setTextOpacity(100)
    // Reset curved text controls
    setCurveRadius(25)
    setStartAngle(0)
    setArcDirection("clockwise")
  }, [])

  // Callbacks for ActionButtons
  const handleUploadClick = useCallback(() => {
    imageCanvasRef.current?.triggerFileInput()
  }, []) // No need to depend on imageCanvasRef as it's a stable ref

  const handleExportClick = useCallback(() => {
    imageCanvasRef.current?.exportImage()
  }, []) // No need to depend on imageCanvasRef as it's a stable ref

  // Callback for when image is loaded
  const handleImageLoad = useCallback((url: string) => {
    setImageUrl(url)
    setHasImage(true)
  }, [])

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
    patternScale,
    setPatternScale,
    usePatternOverlay,
    solidPatternOverlay,
    setSolidPatternOverlay,
    gradientPatternOverlay,
    setGradientPatternOverlay,
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
    borderMode,
    setBorderMode,
    selectedStaticBorder,
    setSelectedStaticBorder,
  }

  const pixArtProps = {
    selectedPixArt,
    setSelectedPixArt,
    pixArtSize,
    setPixArtSize,
  }

  const textProps = {
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
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header />

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 overflow-hidden relative">
        {/* White Grid with Dots Background - Only for content area */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
              radial-gradient(circle, rgba(51,65,85,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px, 30px 30px, 30px 30px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        />
        <div className="relative z-10">
          <ToolBar activePanel={activePanel} setActivePanel={setActivePanel} />
        </div>
        <div className="flex-1 flex items-center justify-center p-4 relative z-10">
          <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
            <div
              className="flex items-center justify-center"
              style={{
                width: 384,
                height: 384,
                borderRadius: imageBorderRadius,
                border: "2px solid #e5e7eb",
                background: backgroundColor,
                overflow: "hidden",
              }}
            >
              <ImageCanvas
                ref={imageCanvasRef}
                hasImage={hasImage}
                setHasImage={setHasImage}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
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
                selectedPixArt={selectedPixArt}
                pixArtSize={pixArtSize}
                // Default drip art props (feature removed but keeping for compatibility)
                dripArtEnabled={false}
                selectedDripArt={null}
                dripArtFrontColor="#ffffff"
                dripArtBackColor="#ffffff"
                dripArtSize={100}
                {...textProps}
                onImageLoad={handleImageLoad}
              />
            </div>
            <ActionButtons
              onUploadClick={handleUploadClick}
              onResetClick={handleResetAllSettings}
              onExportClick={handleExportClick}
            />
          </div>
        </div>
        <div className="md:block relative z-10">
          <RightPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            positionProps={positionProps}
            backgroundProps={backgroundProps}
            filterProps={filterProps}
            borderProps={borderProps}
            pixArtProps={pixArtProps}
            textProps={textProps}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col flex-1 overflow-hidden relative">
        {/* White Grid with Dots Background - Only for content area */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
              radial-gradient(circle, rgba(51,65,85,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px, 30px 30px, 30px 30px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        />
        {/* Image Area - Moved to top with less space */}
        <div className="flex-[4] flex flex-col justify-start items-center pt-4 px-2 relative z-10">
          <div
            className="flex items-center justify-center w-full max-w-sm mx-auto"
            style={{
              width: "min(320px, 85vw)",
              height: "min(320px, 85vw)",
              borderRadius: imageBorderRadius,
              border: "2px solid #e5e7eb",
              background: backgroundColor,
              overflow: "hidden",
            }}
          >
            <ImageCanvas
              ref={imageCanvasRef} // Attach ref here
              hasImage={hasImage}
              setHasImage={setHasImage}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              zoom={zoom}
              rotate={rotate}
              flipHorizontal={flipHorizontal}
              flipVertical={flipVertical}
              position={position}
              setPosition={setPosition}
              gridSnap={gridSnap}
              gridSize={gridSize}
              containerSize={mobileContainerSize} // Pass mobile container size
              {...backgroundProps}
              {...filterProps}
              {...borderProps}
              selectedPixArt={selectedPixArt}
              pixArtSize={pixArtSize}
              // Default drip art props (feature removed but keeping for compatibility)
              dripArtEnabled={false}
              selectedDripArt={null}
              dripArtFrontColor="#ffffff"
              dripArtBackColor="#ffffff"
              dripArtSize={100}
              {...textProps}
              onImageLoad={handleImageLoad}
            />
          </div>
          <ActionButtons
            onUploadClick={handleUploadClick}
            onResetClick={handleResetAllSettings}
            onExportClick={handleExportClick}
          />
        </div>

        {/* Control Panel - More space and moved up */}
        <div className="flex-[6] min-h-0 px-4 py-4 relative z-10">
          <MobileUnifiedPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            positionProps={positionProps}
            backgroundProps={backgroundProps}
            filterProps={filterProps}
            borderProps={borderProps}
            pixArtProps={pixArtProps}
            textProps={textProps}
          />
        </div>
      </div>
    </div>
  )
}
