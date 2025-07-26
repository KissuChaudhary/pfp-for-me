"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from "react"
import { ImageIcon } from "lucide-react"

interface ImageCanvasProps {
  hasImage: boolean
  setHasImage: (hasImage: boolean) => void
  zoom: number
  rotate: number
  flipHorizontal: boolean
  flipVertical: boolean
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
  onImageLoad?: (imageUrl: string) => void
  gridSnap: boolean
  gridSize: number
  // Background props
  backgroundType: "solid" | "gradient" | "pattern" | "image"
  backgroundColor: string
  gradientColors: { start: string; end: string }
  gradientDirection: string
  backgroundPattern: string
  backgroundImage: string
  backgroundSize: string
  backgroundPosition: string
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
}

const ImageCanvas = forwardRef(function ImageCanvas(
  {
    hasImage,
    setHasImage,
    zoom,
    rotate,
    flipHorizontal,
    flipVertical,
    position,
    setPosition,
    onImageLoad,
    gridSnap,
    gridSize,
    // Background props
    backgroundType,
    backgroundColor,
    gradientColors,
    gradientDirection,
    backgroundPattern,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
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
  }: ImageCanvasProps,
  ref,
) {
  const [dragOver, setDragOver] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const exportCanvasRef = useRef<HTMLCanvasElement>(null) // Hidden canvas for export

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    triggerFileInput: () => {
      fileInputRef.current?.click()
    },
    exportImage: () => {
      handleExport()
    },
  }))

  // Load image from local storage on mount
  useEffect(() => {
    const storedImageUrl = localStorage.getItem("pfp_editor_image_url")
    if (storedImageUrl) {
      setImageUrl(storedImageUrl)
      setHasImage(true)
    }
  }, [setHasImage])

  // Save image to local storage when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem("pfp_editor_image_url", imageUrl)
    } else {
      localStorage.removeItem("pfp_editor_image_url")
    }
  }, [imageUrl])

  const handleDragOver = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setDragOver(false)

      const files = e.dataTransfer.files
      if (files && files[0] && files[0].type.startsWith("image/")) {
        const file = files[0]
        const url = URL.createObjectURL(file)
        setImageUrl(url)
        setHasImage(true)
        onImageLoad?.(url)
      }
    },
    [setHasImage, onImageLoad],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      setHasImage(true)
      onImageLoad?.(url)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasImage) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()

      let newX = e.clientX - dragStart.x
      let newY = e.clientY - dragStart.y

      // Apply grid snapping if enabled
      if (gridSnap) {
        newX = Math.round(newX / gridSize) * gridSize
        newY = Math.round(newY / gridSize) * gridSize
      }

      setPosition({ x: newX, y: newY })
    },
    [isDragging, dragStart, setPosition, gridSnap, gridSize],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global mouse events when dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        let newX = e.clientX - dragStart.x
        let newY = e.clientY - dragStart.y

        // Apply grid snapping if enabled
        if (gridSnap) {
          newX = Math.round(newX / gridSize) * gridSize
          newY = Math.round(newY / gridSize) * gridSize
        }

        setPosition({ x: newX, y: newY })
      }

      const handleGlobalMouseUp = () => {
        setIsDragging(false)
      }

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }
  }, [isDragging, dragStart, setPosition, gridSnap, gridSize])

  const imageTransform = `
    translate(${position.x}px, ${position.y}px)
    scale(${zoom})
    rotate(${rotate}deg)
    scaleX(${flipHorizontal ? -1 : 1})
    scaleY(${flipVertical ? -1 : 1})
  `

  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case "solid":
        return { backgroundColor: backgroundColor }
      case "gradient":
        return {
          backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.start}, ${gradientColors.end})`,
        }
      case "pattern":
        return {
          backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
          backgroundRepeat: "repeat",
        }
      case "image":
        return {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
          backgroundRepeat: "no-repeat",
        }
      default:
        return { backgroundColor: "transparent" }
    }
  }

  const getFilterStyle = () => {
    if (!useFilters) return "none"

    const filter = `
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
      blur(${blur}px)
      grayscale(${grayscale}%)
      hue-rotate(${hueRotate}deg)
      invert(${invert}%)
      sepia(${sepia}%)
    `
      .replace(/\s+/g, " ")
      .trim()

    return filter
  }

  // Get border radius for image container based on cap style
  const getImageBorderRadius = () => {
    switch (borderCapStyle) {
      case "rounded":
        return "50%"
      case "square":
        return "0"
      case "beveled":
        return "10px"
      default:
        return "50%"
    }
  }

  // Calculate border dimensions and properties
  const getBorderProps = () => {
    if (borderWidth === 0) return null

    // Base size for the image container
    const baseSize = 192 // lg:w-96 lg:h-96 = 384px, so we'll use smaller base for calculations
    const outerSize = baseSize + 2 * borderOffset
    const center = outerSize / 2

    // Circle calculations
    const radius = (outerSize - borderWidth) / 2
    const circleCircumference = 2 * Math.PI * radius
    const arcLength = circleCircumference * (borderAmount / 100)

    // Square calculations
    const squarePerimeter = 4 * (outerSize - borderWidth)
    const squareArc = squarePerimeter * (borderAmount / 100)

    // Border color/gradient
    let strokeColor = borderColor
    let gradientId = ""

    if (borderType === "gradient") {
      gradientId = "borderGradient"
      strokeColor = `url(#${gradientId})`
    }

    return {
      outerSize,
      center,
      radius,
      circleCircumference,
      arcLength,
      squarePerimeter,
      squareArc,
      strokeColor,
      gradientId,
    }
  }

  const borderProps = getBorderProps()

  // Export functionality
  const handleExport = useCallback(async () => {
    if (!imageUrl) {
      alert("Please upload an image first!")
      return
    }

    const canvas = exportCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const exportSize = 500 // Desired output size for the final image
    canvas.width = exportSize
    canvas.height = exportSize

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate scaling factor from display base size (192px) to export size (500px)
    const displayBaseSize = 192 // Corresponds to w-48 h-48
    const scaleFactor = exportSize / displayBaseSize

    // Scale parameters for drawing on the export canvas
    const scaledBorderWidth = borderWidth * scaleFactor
    const scaledBorderOffset = borderOffset * scaleFactor
    const scaledPositionX = position.x * scaleFactor
    const scaledPositionY = position.y * scaleFactor
    const scaledZoom = zoom // Zoom is already a ratio, applies directly

    // Calculate inner content area for image and background on export canvas
    const innerContentSize = exportSize - 2 * scaledBorderOffset - 2 * scaledBorderWidth
    const innerContentX = scaledBorderOffset + scaledBorderWidth
    const innerContentY = scaledBorderOffset + scaledBorderWidth

    // 1. Draw Background (fills the entire canvas, then clipped)
    const drawBackground = async () => {
      switch (backgroundType) {
        case "solid":
          ctx.fillStyle = backgroundColor
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          break
        case "gradient":
          let bgGradient
          if (gradientDirection === "to right") {
            bgGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
          } else if (gradientDirection === "to bottom") {
            bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          } else if (gradientDirection === "to top right") {
            bgGradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0)
          } else if (gradientDirection === "to bottom left") {
            bgGradient = ctx.createLinearGradient(canvas.width, 0, 0, canvas.height)
          } else {
            // Default to diagonal if unknown or for other directions
            bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          }
          bgGradient.addColorStop(0, gradientColors.start)
          bgGradient.addColorStop(1, gradientColors.end)
          ctx.fillStyle = bgGradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          break
        case "pattern":
        case "image":
          const bgSrc = backgroundType === "pattern" ? backgroundPattern : backgroundImage
          if (bgSrc) {
            const bgImage = new Image()
            bgImage.crossOrigin = "anonymous" // Important for CORS
            bgImage.src = bgSrc
            await new Promise((resolve) => (bgImage.onload = resolve))

            // Draw pattern/image to fill the canvas
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
          }
          break
      }
    }
    await drawBackground()

    // 2. Apply Clipping Path for the image content
    ctx.save() // Save context before clipping
    ctx.beginPath()
    const clipCenter = exportSize / 2

    // The clipping path should define the area where the image will be visible.
    // This area is the inner content area, which is `exportSize - 2 * scaledBorderOffset - 2 * scaledBorderWidth`
    // The position of this clipped area starts at `scaledBorderOffset + scaledBorderWidth`
    const clipRectX = scaledBorderOffset + scaledBorderWidth
    const clipRectY = scaledBorderOffset + scaledBorderWidth
    const clipRectSize = exportSize - 2 * scaledBorderOffset - 2 * scaledBorderWidth

    if (borderCapStyle === "rounded") {
      const clipRadius = clipRectSize / 2 // Radius of the inner content circle
      ctx.arc(clipCenter, clipCenter, clipRadius, 0, 2 * Math.PI)
    } else if (borderCapStyle === "square") {
      ctx.rect(clipRectX, clipRectY, clipRectSize, clipRectSize)
    } else if (borderCapStyle === "beveled") {
      const bevel = 0.1 * clipRectSize // Example bevel amount
      ctx.moveTo(clipRectX + bevel, clipRectY)
      ctx.lineTo(clipRectX + clipRectSize - bevel, clipRectY)
      ctx.lineTo(clipRectX + clipRectSize, clipRectY + bevel)
      ctx.lineTo(clipRectX + clipRectSize, clipRectY + clipRectSize - bevel)
      ctx.lineTo(clipRectX + clipRectSize - bevel, clipRectY + clipRectSize)
      ctx.lineTo(clipRectX + bevel, clipRectY + clipRectSize)
      ctx.lineTo(clipRectX, clipRectY + clipRectSize - bevel)
      ctx.lineTo(clipRectX, clipRectY + bevel)
      ctx.closePath()
    }
    ctx.clip() // Apply the clipping path

    // 3. Draw Image with transformations and filters (within the clipped area)
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl
    await new Promise((resolve) => (img.onload = resolve))

    ctx.save() // Save context before image transformations

    // Apply filters
    if (useFilters) {
      ctx.filter = getFilterStyle()
    } else {
      ctx.filter = "none"
    }

    const imageNaturalWidth = img.naturalWidth
    const imageNaturalHeight = img.naturalHeight

    // Calculate initial scale to cover the inner content area
    const ratio = Math.max(innerContentSize / imageNaturalWidth, innerContentSize / imageNaturalHeight)
    const initialDrawWidth = imageNaturalWidth * ratio
    const initialDrawHeight = imageNaturalHeight * ratio

    // Apply user's zoom on top of this initial scale
    const finalDrawWidth = initialDrawWidth * scaledZoom
    const finalDrawHeight = initialDrawHeight * scaledZoom

    // Translate to center of inner content area, then apply user's position offset
    const contentCenterX = innerContentX + innerContentSize / 2
    const contentCenterY = innerContentY + innerContentSize / 2

    ctx.translate(contentCenterX + scaledPositionX, contentCenterY + scaledPositionY)
    ctx.rotate((rotate * Math.PI) / 180) // Rotate in radians

    // Apply flip
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)

    // Draw image centered on its own origin (which is now the translated/rotated center)
    ctx.drawImage(img, -finalDrawWidth / 2, -finalDrawHeight / 2, finalDrawWidth, finalDrawHeight)

    ctx.restore() // Restore context after image transformations

    ctx.restore() // Restore context after clipping

    // 4. Draw Border (outside the clipped area, on top of everything)
    if (borderWidth > 0) {
      ctx.save()
      ctx.lineWidth = scaledBorderWidth
      ctx.globalAlpha = borderOpacity / 100

      // Determine border stroke style
      if (borderType === "solid") {
        ctx.strokeStyle = borderColor
      } else {
        let gradient
        if (borderGradientDirection === "to right") {
          gradient = ctx.createLinearGradient(0, 0, exportSize, 0)
        } else if (borderGradientDirection === "to bottom") {
          gradient = ctx.createLinearGradient(0, 0, 0, exportSize)
        } else if (borderGradientDirection === "45deg") {
          // Diagonal from bottom-left to top-right
          gradient = ctx.createLinearGradient(0, exportSize, exportSize, 0)
        } else if (borderGradientDirection === "circle") {
          // Radial gradient from center
          const borderCenter = exportSize / 2
          const borderOuterRadius = exportSize / 2 - scaledBorderWidth / 2
          gradient = ctx.createRadialGradient(
            borderCenter,
            borderCenter,
            0,
            borderCenter,
            borderCenter,
            borderOuterRadius,
          )
        } else {
          // Default to diagonal if unknown
          gradient = ctx.createLinearGradient(0, 0, exportSize, exportSize)
        }
        gradient.addColorStop(0, borderGradientColors.start)
        gradient.addColorStop(1, borderGradientColors.end)
        ctx.strokeStyle = gradient
      }

      ctx.beginPath()
      const borderCenter = exportSize / 2

      if (borderCapStyle === "rounded") {
        const borderOuterRadius = exportSize / 2 - scaledBorderWidth / 2
        const startAngle = ((borderRotation - 90) * Math.PI) / 180
        const endAngle = startAngle + (borderAmount / 100) * 2 * Math.PI
        ctx.arc(borderCenter, borderCenter, borderOuterRadius, startAngle, endAngle)
        ctx.lineCap = "round"
      } else {
        const rectSize = exportSize - scaledBorderWidth
        const x = scaledBorderWidth / 2
        const y = scaledBorderWidth / 2
        const perimeter = 4 * rectSize
        const dashLength = (borderAmount / 100) * perimeter
        const gapLength = perimeter - dashLength
        ctx.setLineDash([dashLength, gapLength])
        ctx.lineDashOffset = (-borderRotation / 360) * perimeter // Apply rotation to dash offset

        if (borderCapStyle === "square") {
          ctx.rect(x, y, rectSize, rectSize)
          ctx.lineCap = "butt"
        } else if (borderCapStyle === "beveled") {
          const bevel = 0.1 * rectSize // Example bevel for canvas
          ctx.moveTo(x + bevel, y)
          ctx.lineTo(x + rectSize - bevel, y)
          ctx.lineTo(x + rectSize, y + bevel)
          ctx.lineTo(x + rectSize, y + rectSize - bevel)
          ctx.lineTo(x + rectSize - bevel, y + rectSize)
          ctx.lineTo(x + bevel, y + rectSize)
          ctx.lineTo(x, y + rectSize - bevel)
          ctx.lineTo(x, y + bevel)
          ctx.closePath()
          ctx.lineCap = "butt"
        }
      }
      ctx.stroke()
      ctx.restore()
    }

    // 5. Download
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "profile-picture.png"
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [
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
  ])

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: gridSnap
              ? `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `
              : `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: gridSnap ? `${gridSize}px ${gridSize}px` : "20px 20px",
          }}
        />

        {/* Profile Container with proper offset spacing */}
        <div
          className="relative"
          style={{
            width: borderProps ? borderProps.outerSize : 192,
            height: borderProps ? borderProps.outerSize : 192,
          }}
        >
          {/* Layer 1: Profile Image - Shape synchronized with border */}
          <div
            ref={containerRef}
            className={`flex items-center justify-center relative overflow-hidden transition-all ${
              dragOver ? "border-2 border-blue-500 bg-blue-50" : ""
            } ${isDragging ? "cursor-grabbing" : hasImage ? "cursor-grab" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              width: 192, // Base image size
              height: 192,
              position: "absolute",
              top: borderOffset,
              left: borderOffset,
              userSelect: "none",
              borderRadius: getImageBorderRadius(),
              ...getBackgroundStyle(),
            }}
          >
            {!hasImage ? (
              <div className="text-center p-3">
                <h3 className="font-bold text-sm sm:text-base mb-1">Upload an image</h3>
                <p className="text-gray-600 mb-3 text-xs sm:text-sm">Drag & drop or click to browse</p>
                <button
                  onClick={() => fileInputRef.current?.click()} // Direct click for initial upload
                  className="inline-flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-xs"
                >
                  <ImageIcon className="w-3 h-3" />
                  Choose Image
                </button>
              </div>
            ) : (
              <img
                src={imageUrl || "/placeholder.svg?height=400&width=400"}
                alt="Profile preview"
                className="max-w-none transition-transform duration-200 ease-out select-none"
                style={{
                  transform: imageTransform,
                  transformOrigin: "center center",
                  height: "auto",
                  width: "auto",
                  maxHeight: "none",
                  maxWidth: "none",
                  filter: getFilterStyle(),
                  transition: "filter 0.3s ease", // Smooth filter transitions
                }}
                draggable={false}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              />
            )}
          </div>

          {/* Layer 2: SVG Border - Clean single arc */}
          {borderProps && (
            <svg
              width={borderProps.outerSize}
              height={borderProps.outerSize}
              className="absolute top-0 left-0 pointer-events-none"
              style={{ opacity: borderOpacity / 100 }}
            >
              {/* Gradient definition for gradient borders */}
              {borderType === "gradient" && (
                <defs>
                  <linearGradient id={borderProps.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={borderGradientColors.start} />
                    <stop offset="100%" stopColor={borderGradientColors.end} />
                  </linearGradient>
                </defs>
              )}

              {borderCapStyle === "rounded" ? (
                // Circle border
                <circle
                  cx={borderProps.center}
                  cy={borderProps.center}
                  r={borderProps.radius}
                  stroke={borderProps.strokeColor}
                  strokeWidth={borderWidth}
                  strokeDasharray={`${borderProps.arcLength} ${borderProps.circleCircumference}`}
                  strokeDashoffset={0}
                  fill="none"
                  transform={`rotate(${borderRotation - 90} ${borderProps.center} ${borderProps.center})`}
                />
              ) : (
                // Rectangle border (square/beveled)
                <rect
                  x={borderWidth / 2}
                  y={borderWidth / 2}
                  width={borderProps.outerSize - borderWidth}
                  height={borderProps.outerSize - borderWidth}
                  rx={borderCapStyle === "beveled" ? 10 : 0}
                  stroke={borderProps.strokeColor}
                  strokeWidth={borderWidth}
                  strokeDasharray={`${borderProps.squareArc} ${borderProps.squarePerimeter}`}
                  strokeDashoffset={0}
                  fill="none"
                  transform={`rotate(${borderRotation} ${borderProps.center} ${borderProps.center})`}
                />
              )}
            </svg>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        {/* Hidden canvas for image export */}
        <canvas ref={exportCanvasRef} style={{ display: "none" }} />
      </div>
    </div>
  )
})

export default ImageCanvas
