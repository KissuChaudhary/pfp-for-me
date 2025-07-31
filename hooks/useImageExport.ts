import { useCallback, useRef } from "react"
import { Pattern, getColoredPattern } from "@/lib/patterns"

interface UseImageExportProps {
  imageUrl: string | null
  zoom: number
  rotate: number
  flipHorizontal: boolean
  flipVertical: boolean
  position: { x: number; y: number }
  useFilters: boolean
  brightness: number
  contrast: number
  saturation: number
  blur: number
  grayscale: number
  hueRotate: number
  invert: number
  sepia: number
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
  borderMode: "dynamic" | "static"
  selectedStaticBorder: string | null
  selectedPixArt: string | null
  pixArtSize: number
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
  curveRadius: number
  startAngle: number
  arcDirection: "clockwise" | "counterclockwise"
  exportCanvasRef: React.RefObject<HTMLCanvasElement>
  containerSize?: number
}

export function useImageExport(props: UseImageExportProps) {
  const {
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
    curveRadius,
    startAngle,
    arcDirection,
    exportCanvasRef,
    containerSize = 384,
  } = props

  // Helper function to get filter style
  const getFilterStyle = useCallback(() => {
    if (!useFilters) return "none"
    
    const filters = []
    if (brightness !== 100) filters.push(`brightness(${brightness}%)`)
    if (contrast !== 100) filters.push(`contrast(${contrast}%)`)
    if (saturation !== 100) filters.push(`saturate(${saturation}%)`)
    if (blur > 0) filters.push(`blur(${blur}px)`)
    if (grayscale > 0) filters.push(`grayscale(${grayscale}%)`)
    if (hueRotate !== 0) filters.push(`hue-rotate(${hueRotate}deg)`)
    if (invert > 0) filters.push(`invert(${invert}%)`)
    if (sepia > 0) filters.push(`sepia(${sepia}%)`)
    
    return filters.length > 0 ? filters.join(" ") : "none"
  }, [useFilters, brightness, contrast, saturation, blur, grayscale, hueRotate, invert, sepia])

  // Helper function to load image
  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }, [])

  // Helper function to draw background
  const drawBackground = useCallback(async (ctx: CanvasRenderingContext2D, exportSize: number) => {
    const contentSize = exportSize - (2 * borderOffset) - borderWidth
    const contentX = (exportSize - contentSize) / 2
    const contentY = (exportSize - contentSize) / 2

    ctx.save()

    if (backgroundType === "solid") {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(contentX, contentY, contentSize, contentSize)
    } else if (backgroundType === "gradient") {
      const gradient = ctx.createLinearGradient(
        contentX,
        contentY,
        contentX + contentSize,
        contentY + contentSize
      )
      gradient.addColorStop(0, gradientColors.start)
      gradient.addColorStop(1, gradientColors.end)
      ctx.fillStyle = gradient
      ctx.fillRect(contentX, contentY, contentSize, contentSize)
    } else if (backgroundType === "pattern" && backgroundPattern) {
      try {
        const patternSrc = backgroundPattern.type === "image" 
          ? backgroundPattern.imageUrl 
          : getColoredPattern(backgroundPattern, backgroundColor)
        
        if (patternSrc) {
          const patternImg = await loadImage(patternSrc)
          const pattern = ctx.createPattern(patternImg, "repeat")
          if (pattern) {
            ctx.fillStyle = pattern
            ctx.fillRect(contentX, contentY, contentSize, contentSize)
          }
        }
      } catch (error) {
        console.warn("Failed to load pattern:", error)
        ctx.fillStyle = backgroundColor
        ctx.fillRect(contentX, contentY, contentSize, contentSize)
      }
    } else if (backgroundType === "image" && backgroundImage) {
      try {
        const bgImg = await loadImage(backgroundImage)
        ctx.drawImage(bgImg, contentX, contentY, contentSize, contentSize)
      } catch (error) {
        console.warn("Failed to load background image:", error)
        ctx.fillStyle = backgroundColor
        ctx.fillRect(contentX, contentY, contentSize, contentSize)
      }
    }

    ctx.restore()
  }, [backgroundType, backgroundColor, gradientColors, backgroundPattern, backgroundImage, borderOffset, borderWidth, loadImage])

  // Helper function to draw uploaded image
  const drawUploadedImage = useCallback(async (ctx: CanvasRenderingContext2D, exportSize: number) => {
    if (!imageUrl) return

    try {
      const img = await loadImage(imageUrl)

      ctx.save()
      ctx.filter = getFilterStyle()

      // Calculate image size exactly like the browser (objectFit: contain)
      const imageNaturalWidth = img.naturalWidth
      const imageNaturalHeight = img.naturalHeight

      // Calculate the scale to fit the image within the full canvas area (like objectFit: contain)
      const scaleX = exportSize / imageNaturalWidth
      const scaleY = exportSize / imageNaturalHeight
      const scale = Math.min(scaleX, scaleY) // Use the smaller scale to fit within bounds

      // Calculate the base image dimensions (before zoom)
      const baseDrawWidth = imageNaturalWidth * scale
      const baseDrawHeight = imageNaturalHeight * scale

      // Apply zoom to get final dimensions
      const finalDrawWidth = baseDrawWidth * zoom
      const finalDrawHeight = baseDrawHeight * zoom

      // Position should be relative to the canvas center (like browser's flex centering)
      const canvasCenterX = exportSize / 2
      const canvasCenterY = exportSize / 2
      
      // Scale position based on container size ratio
      const scaleRatio = exportSize / containerSize
      const scaledPositionX = position.x * scaleRatio
      const scaledPositionY = position.y * scaleRatio

      ctx.translate(canvasCenterX + scaledPositionX, canvasCenterY + scaledPositionY)
      ctx.rotate((rotate * Math.PI) / 180)
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)
      ctx.drawImage(img, -finalDrawWidth / 2, -finalDrawHeight / 2, finalDrawWidth, finalDrawHeight)
      ctx.restore()
    } catch (error) {
      console.warn("Failed to load uploaded image:", error)
    }
  }, [imageUrl, getFilterStyle, zoom, rotate, flipHorizontal, flipVertical, position, containerSize, loadImage])

  // Helper function to draw Pix Art overlay
  const drawPixArtOverlay = useCallback(async (ctx: CanvasRenderingContext2D, exportSize: number) => {
    if (!selectedPixArt) return

    try {
      const pixArtImage = await loadImage(selectedPixArt)

      ctx.save()

      // Apply the EXACT same clipping path as the border
      ctx.beginPath()

      const scaledBorderWidth = borderWidth * (exportSize / containerSize)
      const scaledBorderOffset = borderOffset * (exportSize / containerSize)

      if (borderCapStyle === "rounded") {
        const borderCenter = exportSize / 2
        const edgeRadius = exportSize / 2 - scaledBorderWidth / 2
        const borderRadius = edgeRadius - scaledBorderOffset
        const minRadius = scaledBorderWidth / 2
        const clampedRadius = Math.max(minRadius, borderRadius)
        ctx.arc(borderCenter, borderCenter, clampedRadius, 0, 2 * Math.PI)
      } else if (borderCapStyle === "square") {
        const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
        const x = scaledBorderWidth / 2 + scaledBorderOffset
        const y = scaledBorderWidth / 2 + scaledBorderOffset
        ctx.rect(x, y, squareSize, squareSize)
      } else if (borderCapStyle === "beveled") {
        const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
        const x = scaledBorderWidth / 2 + scaledBorderOffset
        const y = scaledBorderWidth / 2 + scaledBorderOffset
        const cornerRadius = 10 // EXACT same as border

        // Create rounded rectangle path EXACTLY like the border
        ctx.moveTo(x + cornerRadius, y)
        ctx.lineTo(x + squareSize - cornerRadius, y)
        ctx.quadraticCurveTo(x + squareSize, y, x + squareSize, y + cornerRadius)
        ctx.lineTo(x + squareSize, y + squareSize - cornerRadius)
        ctx.quadraticCurveTo(x + squareSize, y + squareSize, x + squareSize - cornerRadius, y + squareSize)
        ctx.lineTo(x + cornerRadius, y + squareSize)
        ctx.quadraticCurveTo(x, y + squareSize, x, y + squareSize - cornerRadius)
        ctx.lineTo(x, y + cornerRadius)
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
        ctx.closePath()
      }
      ctx.clip()

      // Calculate size and position for pix art (perfect centering)
      const scaledSize = exportSize * (pixArtSize / 100)
      const offsetX = (exportSize - scaledSize) / 2
      const offsetY = (exportSize - scaledSize) / 2

      // Draw pix art with size scaling (perfect centering, creates empty space in center when size > 100%)
      ctx.drawImage(pixArtImage, offsetX, offsetY, scaledSize, scaledSize)
      ctx.restore()
    } catch (error) {
      console.warn("Failed to load pix art image:", error)
    }
  }, [selectedPixArt, pixArtSize, borderCapStyle, borderWidth, borderOffset, containerSize, loadImage])

  // Helper function to draw border
  const drawBorder = useCallback(async (ctx: CanvasRenderingContext2D, exportSize: number) => {
    if (borderMode === "static" && selectedStaticBorder) {
      try {
        const borderImg = await loadImage(selectedStaticBorder)
        ctx.save()
        ctx.globalAlpha = borderOpacity / 100
        ctx.drawImage(borderImg, 0, 0, exportSize, exportSize)
        ctx.restore()
      } catch (error) {
        console.warn("Failed to load static border:", error)
      }
    } else if (borderMode === "dynamic" && borderWidth > 0) {
      ctx.save()
      ctx.globalAlpha = borderOpacity / 100

      const scaledBorderWidth = borderWidth * (exportSize / containerSize)
      const scaledBorderOffset = borderOffset * (exportSize / containerSize)

      if (borderCapStyle === "rounded") {
        const borderCenter = exportSize / 2
        const edgeRadius = exportSize / 2 - scaledBorderWidth / 2
        const borderRadius = edgeRadius - scaledBorderOffset
        const minRadius = scaledBorderWidth / 2
        const clampedRadius = Math.max(minRadius, borderRadius)

        ctx.beginPath()
        ctx.arc(borderCenter, borderCenter, clampedRadius, 0, 2 * Math.PI)
        ctx.lineWidth = scaledBorderWidth
        ctx.strokeStyle = borderColor
        ctx.stroke()
      } else if (borderCapStyle === "square" || borderCapStyle === "beveled") {
        const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
        const x = scaledBorderWidth / 2 + scaledBorderOffset
        const y = scaledBorderWidth / 2 + scaledBorderOffset

        ctx.beginPath()
        if (borderCapStyle === "beveled") {
          const cornerRadius = 10
          ctx.moveTo(x + cornerRadius, y)
          ctx.lineTo(x + squareSize - cornerRadius, y)
          ctx.quadraticCurveTo(x + squareSize, y, x + squareSize, y + cornerRadius)
          ctx.lineTo(x + squareSize, y + squareSize - cornerRadius)
          ctx.quadraticCurveTo(x + squareSize, y + squareSize, x + squareSize - cornerRadius, y + squareSize)
          ctx.lineTo(x + cornerRadius, y + squareSize)
          ctx.quadraticCurveTo(x, y + squareSize, x, y + squareSize - cornerRadius)
          ctx.lineTo(x, y + cornerRadius)
          ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
          ctx.closePath()
        } else {
          ctx.rect(x, y, squareSize, squareSize)
        }
        ctx.lineWidth = scaledBorderWidth
        ctx.strokeStyle = borderColor
        ctx.stroke()
      }

      ctx.restore()
    }
  }, [borderMode, selectedStaticBorder, borderWidth, borderColor, borderOpacity, borderCapStyle, borderOffset, containerSize, loadImage])

  // Helper function to draw text
  const drawText = useCallback((ctx: CanvasRenderingContext2D, exportSize: number) => {
    if (!showText || !textContent.trim()) return

    ctx.save()
    ctx.globalAlpha = textOpacity / 100

    const scaledFontSize = fontSize * (exportSize / containerSize)
    const scaledPositionX = textPositionX * (exportSize / containerSize)
    const scaledPositionY = textPositionY * (exportSize / containerSize)

    ctx.font = `${fontWeight} ${scaledFontSize}px ${fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.letterSpacing = `${letterSpacing}px`

    // Set text color
    if (textColorType === "solid") {
      ctx.fillStyle = textColor
    } else {
      const gradient = ctx.createLinearGradient(0, 0, exportSize, exportSize)
      gradient.addColorStop(0, textGradientColors.start)
      gradient.addColorStop(1, textGradientColors.end)
      ctx.fillStyle = gradient
    }

    const centerX = exportSize / 2 + scaledPositionX
    const centerY = exportSize / 2 + scaledPositionY

    if (textStyle === "straight") {
      ctx.fillText(textContent, centerX, centerY)
    } else if (textStyle === "vertical") {
      const chars = textContent.split("")
      const charHeight = scaledFontSize * 1.2
      const totalHeight = chars.length * charHeight
      let y = centerY - totalHeight / 2

      chars.forEach((char) => {
        ctx.fillText(char, centerX, y)
        y += charHeight
      })
    } else if (textStyle === "curved") {
      const radius = curveRadius * (exportSize / containerSize)
      const angle = (startAngle * Math.PI) / 180
      const chars = textContent.split("")
      const angleStep = (2 * Math.PI) / chars.length

      chars.forEach((char, index) => {
        const charAngle = angle + (arcDirection === "clockwise" ? angleStep * index : -angleStep * index)
        const x = centerX + Math.cos(charAngle) * radius
        const y = centerY + Math.sin(charAngle) * radius

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(charAngle + Math.PI / 2)
        ctx.fillText(char, 0, 0)
        ctx.restore()
      })
    }

    ctx.restore()
  }, [showText, textContent, fontSize, textPositionX, textPositionY, fontFamily, fontWeight, letterSpacing, textColorType, textColor, textGradientColors, textOpacity, textStyle, curveRadius, startAngle, arcDirection, containerSize])

  // Main export function
  const exportImage = useCallback(async () => {
    const canvas = exportCanvasRef.current
    if (!canvas) return

    const exportSize = containerSize * 2 // Export at 2x resolution for quality
    canvas.width = exportSize
    canvas.height = exportSize

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, exportSize, exportSize)

    try {
      // Drawing order: background → uploaded image → Pix Art overlay → border → text
      await drawBackground(ctx, exportSize)
      await drawUploadedImage(ctx, exportSize)
      await drawPixArtOverlay(ctx, exportSize)
      await drawBorder(ctx, exportSize)
      drawText(ctx, exportSize)

      // Export the image
      const link = document.createElement("a")
      link.download = "profile-picture.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Failed to export image:", error)
    }
  }, [exportCanvasRef, containerSize, drawBackground, drawUploadedImage, drawPixArtOverlay, drawBorder, drawText])

  return { exportImage }
}