"use client"

import type React from "react"
import { useRef, useEffect, useImperativeHandle, forwardRef } from "react"
  import BorderSVG from "./image-canvas/BorderSVG" // Import the new BorderSVG component
  import StaticBorder from "./image-canvas/StaticBorder" // Import the new StaticBorder component
  import PixArtOverlay from "./image-canvas/PixArtOverlay" // Import the new PixArtOverlay component
  import ImageUploadArea from "./image-canvas/ImageUploadArea"
  import ImagePreview from "./image-canvas/ImagePreview"
import ExportCanvas from "./image-canvas/ExportCanvas"
import TextOverlay from "./image-canvas/TextOverlay"
import { useImageDrag } from "@/hooks/useImageDrag"
import { useImageUpload } from "@/hooks/useImageUpload"
import { useImageExport } from "@/hooks/useImageExport"
import { useBackgroundStyle } from "@/hooks/useBackgroundStyle"
import { useImageFilters } from "@/hooks/useImageFilters"
import { useBorderProps } from "@/hooks/useBorderProps"
import { useImageBorderRadius } from "@/hooks/useImageBorderRadius"
import { Pattern } from "@/lib/patterns"


interface ImageCanvasProps {
  hasImage: boolean
  setHasImage: (hasImage: boolean) => void
  imageUrl: string | null // Add imageUrl prop
  setImageUrl: (url: string | null) => void // Add setImageUrl prop
  zoom: number
  rotate: number
  flipHorizontal: boolean
  flipVertical: boolean
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
  onImageLoad?: (imageUrl: string) => void
  gridSnap: boolean
  gridSize: number
  containerSize?: number // Add containerSize prop for responsive sizing
  // Background props
  backgroundType: "solid" | "gradient" | "pattern" | "image"
  backgroundColor: string
  gradientColors: { start: string; end: string }
  gradientDirection: string
  backgroundPattern: Pattern | null
  backgroundImage: string
  backgroundSize: string
  backgroundPosition: string
  patternScale: number
  usePatternOverlay: boolean
  // Filter props
  useFilters: boolean
  brightness: number
  contrast: number
  saturation: number
  blur: number
  grayscale: number
  hueRotate: number
  invert: number
  sepia: number
  // Border props
  borderWidth: number
  borderColor: string
  borderOpacity: number
  borderType: "solid" | "gradient"
  borderGradientColors: { start: string; end: string }
  borderGradientDirection: string
  borderOffset: number
  borderAmount: number
  borderRotation: number
  borderCapStyle: "rounded" | "square" | "beveled"
  // Static border props
  borderMode: "dynamic" | "static"
  selectedStaticBorder: string | null
      // Pix Art props
    selectedPixArt: string | null
    pixArtSize: number
    // Drip Art props (keeping for compatibility but not using)
    dripArtEnabled: boolean
    selectedDripArt: string | null
    dripArtFrontColor: string
    dripArtBackColor: string
    dripArtSize: number
  // Text props
  showText: boolean
  textContent: string
  fontSize: number
  textStyle: "straight" | "curved" | "vertical"
  textPositionX: number
  textPositionY: number
  fontFamily: string
  fontWeight: string
  letterSpacing: number
  textColorType: "solid" | "gradient"
  textColor: string
  textGradientColors: { start: string; end: string }
  textOpacity: number
  // Curved text specific props
  curveRadius: number
  startAngle: number
  arcDirection: "clockwise" | "counterclockwise"
}

export interface ImageCanvasRef {
  triggerFileInput: () => void
  exportImage: () => void
}

const ImageCanvas = forwardRef(function ImageCanvas(
  {
    hasImage,
    setHasImage,
    imageUrl,
    setImageUrl,
    zoom,
    rotate,
    flipHorizontal,
    flipVertical,
    position,
    setPosition,
    onImageLoad,
    gridSnap,
    gridSize,
    containerSize = 384, // Default to 384 for desktop
    // Background props
    backgroundType,
    backgroundColor,
    gradientColors,
    gradientDirection,
    backgroundPattern,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    patternScale,
    usePatternOverlay,
    // Filter props
    useFilters,
    brightness,
    contrast,
    saturation,
    blur,
    grayscale,
    hueRotate,
    invert,
    sepia,
    // Border props
    borderWidth,
    borderColor,
    borderOpacity,
    borderType,
    borderGradientColors,
    borderGradientDirection,
    borderOffset,
    borderAmount,
    borderRotation,
    borderCapStyle,
    // Static border props
    borderMode,
    selectedStaticBorder,
    // Pix Art props
    selectedPixArt,
    pixArtSize,
    // Drip Art props (keeping for compatibility but not using)
    dripArtEnabled,
    selectedDripArt,
    dripArtFrontColor,
    dripArtBackColor,
    dripArtSize,
    // Text props
    showText,
    textContent,
    fontSize,
    textStyle,
    textPositionX,
    textPositionY,
    fontFamily,
    fontWeight,
    letterSpacing,
    textColorType,
    textColor,
    textGradientColors,
    textOpacity,
    // Curved text specific props
    curveRadius,
    startAngle,
    arcDirection,
  }: ImageCanvasProps,
  ref,
) {
  // Integrate useImageUpload hook
  const {
    fileInputRef,
    dragOver,
    setDragOver,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageUpload({ setHasImage, onImageLoad, imageUrl, setImageUrl })

  const containerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const exportCanvasRef = useRef<HTMLCanvasElement>(null) // Hidden canvas for export


  // Integrate useImageExport hook
  const { exportImage } = useImageExport({
    imageUrl,
    zoom,
    rotate,
    flipHorizontal,
    flipVertical,
    position,
    useFilters,
    brightness,
    contrast,
    saturation,
    blur,
    grayscale,
    hueRotate,
    invert,
    sepia,
    backgroundType,
    backgroundColor,
    gradientColors,
    gradientDirection,
    backgroundPattern,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    patternScale,
    usePatternOverlay,
    borderWidth,
    borderColor,
    borderOpacity,
    borderType,
    borderGradientColors,
    borderGradientDirection,
    borderOffset,
    borderAmount,
    borderRotation,
    borderCapStyle,
    borderMode,
    selectedStaticBorder,
    selectedPixArt,
    pixArtSize,
    // Text props
    showText,
    textContent,
    fontSize,
    textStyle,
    textPositionX,
    textPositionY,
    fontFamily,
    fontWeight,
    letterSpacing,
    textColorType,
    textColor,
    textGradientColors,
    textOpacity,
    // Curved text specific props
    curveRadius,
    startAngle,
    arcDirection,
    exportCanvasRef,
    containerSize, // Pass the container size
    exportQuality: 4, // 4x quality multiplier for high-resolution exports
  })

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    triggerFileInput: () => {
      fileInputRef.current?.click()
    },
    exportImage: () => {
      exportImage()
    },
  }))

  // Save image to local storage when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem("pfp_editor_image_url", imageUrl)
    } else {
      localStorage.removeItem("pfp_editor_image_url")
    }
  }, [imageUrl])

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging,
  } = useImageDrag({ position, setPosition, gridSnap, gridSize })

  // Remove old drag logic and state

  const imageTransform = `
    translate(${position.x}px, ${position.y}px)
    scale(${zoom})
    rotate(${rotate}deg)
    scaleX(${flipHorizontal ? -1 : 1})
    scaleY(${flipVertical ? -1 : 1})
  `

  // Use background style hook
  const backgroundStyle = useBackgroundStyle({
    backgroundType,
    backgroundColor,
    gradientColors,
    gradientDirection,
    backgroundPattern,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    patternScale,
    usePatternOverlay,
  })

  // Use image filter style hook
  const filterStyle = useImageFilters({
    useFilters,
    brightness,
    contrast,
    saturation,
    blur,
    grayscale,
    hueRotate,
    invert,
    sepia,
  })

  // Use border props hook
  const borderProps = useBorderProps({
    borderWidth,
    borderColor,
    borderType,
    borderGradientColors,
    borderGradientDirection,
    borderOffset,
    borderAmount,
    borderRotation,
    borderCapStyle,
    containerSize, // Pass the container size
  })

  // Use border radius hook
  const imageBorderRadius = useImageBorderRadius(borderCapStyle)

  return (
    <div className="flex justify-center">
      <div className="relative">
        {/* Removed grid background for desktop */}
        {/* Profile Container with proper offset spacing */}
        <div
          className="relative"
          style={{
            width: containerSize, // Use containerSize for responsive sizing
            height: containerSize,
            ...backgroundStyle,
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Layer 1: Profile Image - Shape synchronized with border */}
          <ImageUploadArea
            hasImage={hasImage}
            setHasImage={setHasImage}
            setImageUrl={setImageUrl}
            onImageLoad={onImageLoad}
            fileInputRef={fileInputRef}
            dragOver={dragOver}
            setDragOver={setDragOver}
            handleFileChange={handleFileChange}
          />

          {/* Layer 4: Pix Art Overlay */}
          <PixArtOverlay
            selectedPixArt={selectedPixArt}
            containerSize={containerSize}
            borderCapStyle={borderCapStyle}
            borderWidth={borderWidth}
            borderOffset={borderOffset}
            pixArtSize={pixArtSize}
          />

          {/* Layer 3: Image Preview - Draggable, zoomable, and filterable image */}
          <ImagePreview
            imageUrl={imageUrl}
            imageTransform={imageTransform}
            filterStyle={filterStyle}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            hasImage={hasImage}
            containerRef={containerRef}
            borderOffset={borderOffset}
            imageBorderRadius={imageBorderRadius}
            backgroundStyle={{
              ...backgroundStyle,
              borderRadius: imageBorderRadius,
              border: "2px solid #e5e7eb",
              // Remove overflow hidden to prevent clipping the border
            }}
          />

          {/* Layer 5: Drip Art Front Layer (above image but below border) */}
          {/* Removed DripArtFrontOverlay rendering */}

          {/* Layer 6: Border - Dynamic SVG or Static Image */}
          {borderMode === "dynamic" ? (
            <BorderSVG
              borderProps={borderProps}
              borderType={borderType}
              borderGradientColors={borderGradientColors}
              borderGradientDirection={borderGradientDirection}
              borderOpacity={borderOpacity}
              borderWidth={borderWidth}
              borderCapStyle={borderCapStyle}
              borderRotation={borderRotation}
            />
          ) : (
            <StaticBorder
              selectedStaticBorder={selectedStaticBorder}
              containerSize={containerSize}
              borderOpacity={borderOpacity}
            />
          )}

          {/* Layer 7: Text Overlay */}
          <TextOverlay
            showText={showText}
            textContent={textContent}
            fontSize={fontSize}
            textStyle={textStyle}
            textPositionX={textPositionX}
            textPositionY={textPositionY}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            letterSpacing={letterSpacing}
            textColorType={textColorType}
            textColor={textColor}
            textGradientColors={textGradientColors}
            textOpacity={textOpacity}
            containerSize={containerSize}
            // Curved text specific props
            curveRadius={curveRadius}
            startAngle={startAngle}
            arcDirection={arcDirection}
          />
        </div>

        {/* Hidden canvas for image export */}
        <ExportCanvas exportCanvasRef={exportCanvasRef} />
      </div>
    </div>
  )
})

export default ImageCanvas
