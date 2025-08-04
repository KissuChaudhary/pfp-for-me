import { useCallback } from "react"
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
  exportCanvasRef: React.RefObject<HTMLCanvasElement | null>
  containerSize?: number
  exportMultiplier?: number // Add export multiplier parameter
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
    exportMultiplier = 4 // Default to 4x export resolution
  } = props

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

  const exportImage = useCallback(async () => {
    if (!imageUrl || imageUrl === "") {
      alert("Please upload an image first!")
      return
    }
    const canvas = exportCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Use high-resolution canvas for export
    const previewSize = containerSize
    const exportSize = previewSize * exportMultiplier
    const scaleFactor = exportMultiplier
    
    canvas.width = exportSize
    canvas.height = exportSize
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Scale all measurements by the export multiplier
    const scaledBorderWidth = borderWidth * scaleFactor
    const scaledBorderOffset = borderOffset * scaleFactor
    const scaledPositionX = position.x * scaleFactor
    const scaledPositionY = position.y * scaleFactor

    // Create clipping path for the entire canvas based on border cap style
    ctx.save()
    ctx.beginPath()
    const canvasCenter = exportSize / 2
    const canvasRadius = exportSize / 2

    if (borderCapStyle === "rounded") {
      ctx.arc(canvasCenter, canvasCenter, canvasRadius, 0, 2 * Math.PI)
    } else if (borderCapStyle === "square") {
      ctx.rect(0, 0, exportSize, exportSize)
    } else if (borderCapStyle === "beveled") {
      // Use rounded rectangle for beveled borders (same as BorderSVG component)
      const cornerRadius = 10
      ctx.moveTo(cornerRadius, 0)
      ctx.lineTo(exportSize - cornerRadius, 0)
      ctx.quadraticCurveTo(exportSize, 0, exportSize, cornerRadius)
      ctx.lineTo(exportSize, exportSize - cornerRadius)
      ctx.quadraticCurveTo(exportSize, exportSize, exportSize - cornerRadius, exportSize)
      ctx.lineTo(cornerRadius, exportSize)
      ctx.quadraticCurveTo(0, exportSize, 0, exportSize - cornerRadius)
      ctx.lineTo(0, cornerRadius)
      ctx.quadraticCurveTo(0, 0, cornerRadius, 0)
      ctx.closePath()
    }
    ctx.clip()

    // Draw background first
    switch (backgroundType) {
      case "solid":
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, exportSize, exportSize)
        break
      case "gradient": {
        let bgGradient
        if (gradientDirection === "to right") {
          bgGradient = ctx.createLinearGradient(0, 0, exportSize, 0)
        } else if (gradientDirection === "to bottom") {
          bgGradient = ctx.createLinearGradient(0, 0, 0, exportSize)
        } else if (gradientDirection === "to top right") {
          bgGradient = ctx.createLinearGradient(0, exportSize, exportSize, 0)
        } else if (gradientDirection === "to bottom left") {
          bgGradient = ctx.createLinearGradient(exportSize, 0, 0, exportSize)
        } else {
          bgGradient = ctx.createLinearGradient(0, 0, exportSize, exportSize)
        }
        bgGradient.addColorStop(0, gradientColors.start)
        bgGradient.addColorStop(1, gradientColors.end)
        ctx.fillStyle = bgGradient
        ctx.fillRect(0, 0, exportSize, exportSize)
        break
      }
      case "pattern": {
        if (backgroundPattern) {
          if (backgroundPattern.type === "image") {
            const bgImage = new window.Image()
            bgImage.crossOrigin = "anonymous"
            bgImage.src = backgroundPattern.imageUrl!
            await new Promise((resolve) => (bgImage.onload = resolve))
            const baseSize = 100 * scaleFactor // Scale pattern size
            const scaledSize = Math.max(20 * scaleFactor, Math.min(200 * scaleFactor, baseSize * patternScale))
            const pattern = ctx.createPattern(bgImage, "repeat")
            if (pattern) {
              const matrix = new DOMMatrix()
              matrix.scaleSelf(scaledSize / bgImage.naturalWidth, scaledSize / bgImage.naturalHeight)
              pattern.setTransform(matrix)
              ctx.fillStyle = pattern
              ctx.fillRect(0, 0, exportSize, exportSize)
            }
          } else {
            const coloredPatternUrl = getColoredPattern(backgroundPattern, backgroundPattern.color)
            const bgImage = new window.Image()
            bgImage.crossOrigin = "anonymous"
            bgImage.src = coloredPatternUrl
            await new Promise((resolve) => (bgImage.onload = resolve))
            const baseSize = 20 * scaleFactor // Scale pattern size
            const scaledSize = Math.max(5 * scaleFactor, Math.min(100 * scaleFactor, baseSize * patternScale))
            const pattern = ctx.createPattern(bgImage, "repeat")
            if (pattern) {
              const matrix = new DOMMatrix()
              matrix.scaleSelf(scaledSize / 20, scaledSize / 20)
              pattern.setTransform(matrix)
              ctx.fillStyle = pattern
              ctx.fillRect(0, 0, exportSize, exportSize)
            }
          }
        }
        break
      }
      case "image": {
        const bgSrc = backgroundImage
        if (bgSrc) {
          const bgImage = new window.Image()
          bgImage.crossOrigin = "anonymous"
          bgImage.src = bgSrc
          await new Promise((resolve) => (bgImage.onload = resolve))
          ctx.drawImage(bgImage, 0, 0, exportSize, exportSize)
        }
        break
      }
    }

    // Draw pattern overlay if enabled
    if (usePatternOverlay && backgroundPattern && backgroundType !== "pattern") {
      if (backgroundPattern.type === "image") {
        const bgImage = new window.Image()
        bgImage.crossOrigin = "anonymous"
        bgImage.src = backgroundPattern.imageUrl!
        await new Promise((resolve) => (bgImage.onload = resolve))
        const baseSize = 100 * scaleFactor // Scale pattern size
        const scaledSize = Math.max(20 * scaleFactor, Math.min(200 * scaleFactor, baseSize * patternScale))
        const pattern = ctx.createPattern(bgImage, "repeat")
        if (pattern) {
          const matrix = new DOMMatrix()
          matrix.scaleSelf(scaledSize / bgImage.naturalWidth, scaledSize / bgImage.naturalHeight)
          pattern.setTransform(matrix)
          ctx.fillStyle = pattern
          ctx.fillRect(0, 0, exportSize, exportSize)
        }
      } else {
        const coloredPatternUrl = getColoredPattern(backgroundPattern, backgroundPattern.color)
        const bgImage = new window.Image()
        bgImage.crossOrigin = "anonymous"
        bgImage.src = coloredPatternUrl
        await new Promise((resolve) => (bgImage.onload = resolve))
        const baseSize = 20 * scaleFactor // Scale pattern size
        const scaledSize = Math.max(5 * scaleFactor, Math.min(100 * scaleFactor, baseSize * patternScale))
        const pattern = ctx.createPattern(bgImage, "repeat")
        if (pattern) {
          const matrix = new DOMMatrix()
          matrix.scaleSelf(scaledSize / 20, scaledSize / 20)
          pattern.setTransform(matrix)
          ctx.fillStyle = pattern
          ctx.fillRect(0, 0, exportSize, exportSize)
        }
      }
    }

    // Draw uploaded image (after background)
    if (imageUrl) {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
      ctx.save()
      ctx.filter = getFilterStyle()
      const imageNaturalWidth = img.naturalWidth
      const imageNaturalHeight = img.naturalHeight
      // Use export size for scaling calculations to maintain image proportions
      const scaleX = exportSize / imageNaturalWidth
      const scaleY = exportSize / imageNaturalHeight
      const scale = Math.min(scaleX, scaleY)
      const baseDrawWidth = imageNaturalWidth * scale
      const baseDrawHeight = imageNaturalHeight * scale
      const finalDrawWidth = baseDrawWidth * zoom
      const finalDrawHeight = baseDrawHeight * zoom
      const canvasCenterX = exportSize / 2
      const canvasCenterY = exportSize / 2
      ctx.translate(canvasCenterX + scaledPositionX, canvasCenterY + scaledPositionY)
      ctx.rotate((rotate * Math.PI) / 180)
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)
      ctx.drawImage(img, -finalDrawWidth / 2, -finalDrawHeight / 2, finalDrawWidth, finalDrawHeight)
      ctx.restore()
    }

    // Draw Pix Art overlay (after image)
    if (selectedPixArt) {
      const pixArtImage = new window.Image()
      pixArtImage.crossOrigin = "anonymous"
      pixArtImage.src = selectedPixArt
      await new Promise((resolve) => (pixArtImage.onload = resolve))
      ctx.save()
      ctx.beginPath()
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
        // For beveled borders, position at the edge of the canvas (no borderOffset) - same as border drawing
        const squareSize = exportSize - scaledBorderWidth
        const x = scaledBorderWidth / 2
        const y = scaledBorderWidth / 2
        const cornerRadius = 10 * scaleFactor // Scale corner radius
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
      const scaledSize = exportSize * (pixArtSize / 100)
      const offsetX = (exportSize - scaledSize) / 2
      const offsetY = (exportSize - scaledSize) / 2
      ctx.drawImage(pixArtImage, offsetX, offsetY, scaledSize, scaledSize)
      ctx.restore()
    }

    ctx.restore() // restore canvas clipping

    // Draw border
    if (borderWidth > 0) {
      ctx.save()
      ctx.beginPath()
      const halfBorder = scaledBorderWidth / 2
      const center = exportSize / 2
      
      // Calculate border radius based on offset (same logic as useBorderProps)
      const edgeRadius = exportSize / 2 - scaledBorderWidth / 2
      const borderRadius = edgeRadius - scaledBorderOffset
      const minRadius = scaledBorderWidth / 2
      const clampedRadius = Math.max(minRadius, borderRadius)
      
      // Calculate arc length for border amount
      const circleCircumference = 2 * Math.PI * clampedRadius
      const arcLength = circleCircumference * (borderAmount / 100)
      
      // For square borders, calculate based on the adjusted size
      const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
      const squarePerimeter = 4 * squareSize
      const squareArc = squarePerimeter * (borderAmount / 100)
      
      // Check if it's a full border (100%)
      const isFullBorder = borderAmount >= 99
      
      // Apply rotation for square and beveled borders (same as BorderSVG component)
      if (borderCapStyle === "square" || borderCapStyle === "beveled") {
        ctx.save()
        ctx.translate(center, center)
        ctx.rotate(borderRotation * (Math.PI / 180))
        ctx.translate(-center, -center)
      }
      
      if (borderCapStyle === "rounded") {
        // For partial borders, we need to draw an arc instead of a full circle
        if (isFullBorder) {
          ctx.arc(center, center, clampedRadius, 0, 2 * Math.PI)
        } else {
          // Calculate start and end angles for the arc
          const startAngle = (borderRotation - 90) * (Math.PI / 180) // Convert to radians and adjust for circle start position
          const arcAngle = (arcLength / clampedRadius) * (180 / Math.PI) // Convert arc length to degrees
          const endAngle = startAngle + (arcAngle * Math.PI / 180)
          
          ctx.arc(center, center, clampedRadius, startAngle, endAngle)
        }
      } else if (borderCapStyle === "square") {
        const size = exportSize - scaledBorderWidth - scaledBorderOffset * 2
        const x = scaledBorderWidth / 2 + scaledBorderOffset
        const y = scaledBorderWidth / 2 + scaledBorderOffset
        
        if (isFullBorder) {
          ctx.rect(x, y, size, size)
        } else {
          // For partial square borders, draw as a continuous path to avoid corner artifacts
          const sideLength = size
          const totalPerimeter = 4 * sideLength
          const drawnLength = squareArc
          
          // Calculate how many complete sides we can draw
          const completeSides = Math.floor(drawnLength / sideLength)
          const remainingLength = drawnLength - (completeSides * sideLength)
          
          // Start drawing from the top-left corner
          ctx.moveTo(x, y)
          
          // Draw complete sides
          if (completeSides >= 1) {
            ctx.lineTo(x + sideLength, y) // top side
          }
          if (completeSides >= 2) {
            ctx.lineTo(x + sideLength, y + sideLength) // right side
          }
          if (completeSides >= 3) {
            ctx.lineTo(x, y + sideLength) // bottom side
          }
          if (completeSides >= 4) {
            ctx.lineTo(x, y) // left side (complete)
          }
          
          // Draw partial side if needed
          if (remainingLength > 0 && completeSides < 4) {
            const sideIndex = completeSides % 4
            let partialX = 0, partialY = 0
            
            switch (sideIndex) {
              case 0: // top side
                partialX = x + remainingLength
                partialY = y
                break
              case 1: // right side
                partialX = x + sideLength
                partialY = y + remainingLength
                break
              case 2: // bottom side
                partialX = x + sideLength - remainingLength
                partialY = y + sideLength
                break
              case 3: // left side
                partialX = x
                partialY = y + sideLength - remainingLength
                break
            }
            
            ctx.lineTo(partialX, partialY)
          }
        }
      } else if (borderCapStyle === "beveled") {
        // For beveled borders, use the same positioning as BorderSVG component
        const size = exportSize - scaledBorderWidth - scaledBorderOffset * 2
        const x = scaledBorderWidth / 2 + scaledBorderOffset
        const y = scaledBorderWidth / 2 + scaledBorderOffset
        const cornerRadius = 10 * scaleFactor // Scale corner radius
        
        if (isFullBorder) {
          // Draw full rounded rectangle
          ctx.moveTo(x + cornerRadius, y)
          ctx.lineTo(x + size - cornerRadius, y)
          ctx.quadraticCurveTo(x + size, y, x + size, y + cornerRadius)
          ctx.lineTo(x + size, y + size - cornerRadius)
          ctx.quadraticCurveTo(x + size, y + size, x + size - cornerRadius, y + size)
          ctx.lineTo(x + cornerRadius, y + size)
          ctx.quadraticCurveTo(x, y + size, x, y + size - cornerRadius)
          ctx.lineTo(x, y + cornerRadius)
          ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
          ctx.closePath()
        } else {
          // For partial beveled borders, draw as a continuous path with rounded corners
          const sideLength = size - (2 * cornerRadius) // Length of straight sides
          const totalPerimeter = 4 * sideLength + (2 * Math.PI * cornerRadius) // Perimeter including corner arcs
          const drawnLength = totalPerimeter * (borderAmount / 100)
          
          // Calculate how much of each side to draw
          const straightSideLength = sideLength
          const cornerArcLength = (Math.PI * cornerRadius) / 2 // Length of each corner arc
          
          let remainingLength = drawnLength
          let currentX = x + cornerRadius
          let currentY = y
          
          // Start drawing from top-left corner
          ctx.moveTo(currentX, currentY)
          
          // Draw top side
          if (remainingLength > 0) {
            const topSideLength = Math.min(remainingLength, straightSideLength)
            currentX += topSideLength
            ctx.lineTo(currentX, currentY)
            remainingLength -= topSideLength
          }
          
          // Draw top-right corner
          if (remainingLength > 0 && remainingLength <= cornerArcLength) {
            const cornerAngle = (remainingLength / cornerRadius) * (180 / Math.PI)
            ctx.quadraticCurveTo(x + size, y, x + size, y + cornerRadius)
            ctx.lineTo(x + size, y + cornerRadius)
            remainingLength = 0
          } else if (remainingLength > cornerArcLength) {
            ctx.quadraticCurveTo(x + size, y, x + size, y + cornerRadius)
            currentX = x + size
            currentY = y + cornerRadius
            remainingLength -= cornerArcLength
          }
          
          // Draw right side
          if (remainingLength > 0) {
            const rightSideLength = Math.min(remainingLength, straightSideLength)
            currentY += rightSideLength
            ctx.lineTo(currentX, currentY)
            remainingLength -= rightSideLength
          }
          
          // Draw bottom-right corner
          if (remainingLength > 0 && remainingLength <= cornerArcLength) {
            const cornerAngle = (remainingLength / cornerRadius) * (180 / Math.PI)
            ctx.quadraticCurveTo(x + size, y + size, x + size - cornerRadius, y + size)
            ctx.lineTo(x + size - cornerRadius, y + size)
            remainingLength = 0
          } else if (remainingLength > cornerArcLength) {
            ctx.quadraticCurveTo(x + size, y + size, x + size - cornerRadius, y + size)
            currentX = x + size - cornerRadius
            currentY = y + size
            remainingLength -= cornerArcLength
          }
          
          // Draw bottom side
          if (remainingLength > 0) {
            const bottomSideLength = Math.min(remainingLength, straightSideLength)
            currentX -= bottomSideLength
            ctx.lineTo(currentX, currentY)
            remainingLength -= bottomSideLength
          }
          
          // Draw bottom-left corner
          if (remainingLength > 0 && remainingLength <= cornerArcLength) {
            const cornerAngle = (remainingLength / cornerRadius) * (180 / Math.PI)
            ctx.quadraticCurveTo(x, y + size, x, y + size - cornerRadius)
            ctx.lineTo(x, y + size - cornerRadius)
            remainingLength = 0
          } else if (remainingLength > cornerArcLength) {
            ctx.quadraticCurveTo(x, y + size, x, y + size - cornerRadius)
            currentX = x
            currentY = y + size - cornerRadius
            remainingLength -= cornerArcLength
          }
          
          // Draw left side
          if (remainingLength > 0) {
            const leftSideLength = Math.min(remainingLength, straightSideLength)
            currentY -= leftSideLength
            ctx.lineTo(currentX, currentY)
            remainingLength -= leftSideLength
          }
          
          // Draw top-left corner
          if (remainingLength > 0) {
            const cornerAngle = (remainingLength / cornerRadius) * (180 / Math.PI)
            ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
            ctx.lineTo(x + cornerRadius, y)
          }
        }
      }
      
      // Restore rotation for square and beveled borders
      if (borderCapStyle === "square" || borderCapStyle === "beveled") {
        ctx.restore()
      }
      
             if (borderType === "gradient") {
         let borderGradient
         if (borderGradientDirection === "to right") {
           borderGradient = ctx.createLinearGradient(0, 0, exportSize, 0)
         } else if (borderGradientDirection === "to bottom") {
           borderGradient = ctx.createLinearGradient(0, 0, 0, exportSize)
         } else if (borderGradientDirection === "45deg") {
           borderGradient = ctx.createLinearGradient(0, exportSize, exportSize, 0)
         } else if (borderGradientDirection === "circle") {
           borderGradient = ctx.createRadialGradient(exportSize/2, exportSize/2, 0, exportSize/2, exportSize/2, exportSize/2)
         } else {
           // Default diagonal gradient
           borderGradient = ctx.createLinearGradient(0, 0, exportSize, exportSize)
         }
         borderGradient.addColorStop(0, borderGradientColors.start)
         borderGradient.addColorStop(1, borderGradientColors.end)
         ctx.strokeStyle = borderGradient
       } else {
         ctx.strokeStyle = borderColor
       }
       
       // Set line join and cap for consistent border appearance
       ctx.lineJoin = "bevel"
       ctx.lineCap = "butt"
       
       ctx.globalAlpha = borderOpacity
       ctx.lineWidth = scaledBorderWidth // Use scaled border width
       ctx.stroke()
       ctx.globalAlpha = 1
       
       // Reset line dash if it was set for partial borders
       if ((borderCapStyle === "beveled" || borderCapStyle === "square") && !isFullBorder) {
         ctx.setLineDash([])
       }
       
       ctx.restore()
    }
  
// Draw static border image if in static border mode
if (borderMode === "static" && selectedStaticBorder) {
  const borderImg = new window.Image();
  borderImg.crossOrigin = "anonymous";
  borderImg.src = selectedStaticBorder;
  await new Promise((resolve, reject) => {
    borderImg.onload = resolve;
    borderImg.onerror = reject;
  });
  ctx.save(); // Save before applying clip
  ctx.beginPath();
  if (borderCapStyle === "rounded") {
    // Circle
    ctx.arc(exportSize / 2, exportSize / 2, exportSize / 2, 0, Math.PI * 2);
  } else if (borderCapStyle === "square") {
    // Square
    ctx.rect(0, 0, exportSize, exportSize);
  } else if (borderCapStyle === "beveled") {
    // For beveled (same logic as before)
    const bevel = 0.1 * exportSize // Scale bevel size
    ctx.moveTo(bevel, 0);
    ctx.lineTo(exportSize - bevel, 0);
    ctx.lineTo(exportSize, bevel);
    ctx.lineTo(exportSize, exportSize - bevel);
    ctx.lineTo(exportSize - bevel, exportSize);
    ctx.lineTo(bevel, exportSize);
    ctx.lineTo(0, exportSize - bevel);
    ctx.lineTo(0, bevel);
    ctx.closePath();
  }
  ctx.clip();
  ctx.drawImage(borderImg, 0, 0, exportSize, exportSize);
  ctx.restore(); // Restore after drawing
}



    // Download
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
    containerSize,
    exportMultiplier
  ])

  return { exportImage }
}
