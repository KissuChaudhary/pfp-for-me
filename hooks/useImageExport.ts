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
    containerSize = 384
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

    const exportSize = containerSize
    canvas.width = exportSize
    canvas.height = exportSize
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const scaledBorderWidth = borderWidth
    const scaledBorderOffset = borderOffset
    const scaledPositionX = position.x
    const scaledPositionY = position.y

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
            const baseSize = 100
            const scaledSize = Math.max(20, Math.min(200, baseSize * patternScale))
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
            const baseSize = 20
            const scaledSize = Math.max(5, Math.min(100, baseSize * patternScale))
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
        const baseSize = 100
        const scaledSize = Math.max(20, Math.min(200, baseSize * patternScale))
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
        const baseSize = 20
        const scaledSize = Math.max(5, Math.min(100, baseSize * patternScale))
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
        const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
        const x = scaledBorderWidth / 2 + scaledBorderOffset
        const y = scaledBorderWidth / 2 + scaledBorderOffset
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
      const halfBorder = borderWidth / 2
      const center = exportSize / 2
      
      // Calculate border radius based on offset (same logic as useBorderProps)
      const edgeRadius = exportSize / 2 - borderWidth / 2
      const borderRadius = edgeRadius - borderOffset
      const minRadius = borderWidth / 2
      const clampedRadius = Math.max(minRadius, borderRadius)
      
      // Calculate arc length for border amount
      const circleCircumference = 2 * Math.PI * clampedRadius
      const arcLength = circleCircumference * (borderAmount / 100)
      
      // For square borders, calculate based on the adjusted size
      const squareSize = exportSize - (2 * borderOffset) - borderWidth
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
        const size = exportSize - borderWidth - borderOffset * 2
        const x = borderWidth / 2 + borderOffset
        const y = borderWidth / 2 + borderOffset
        
        if (isFullBorder) {
          ctx.rect(x, y, size, size)
        } else {
          // For partial square borders, we need to calculate which sides to draw
          const sideLength = size
          const totalPerimeter = 4 * sideLength
          const drawnLength = squareArc
          
          let currentLength = 0
          const sides = [
            { x1: x, y1: y, x2: x + sideLength, y2: y }, // top
            { x1: x + sideLength, y1: y, x2: x + sideLength, y2: y + sideLength }, // right
            { x1: x + sideLength, y1: y + sideLength, x2: x, y2: y + sideLength }, // bottom
            { x1: x, y1: y + sideLength, x2: x, y2: y } // left
          ]
          
          for (let i = 0; i < sides.length; i++) {
            const side = sides[i]
            const sideLengthPx = Math.sqrt(Math.pow(side.x2 - side.x1, 2) + Math.pow(side.y2 - side.y1, 2))
            
            if (currentLength + sideLengthPx <= drawnLength) {
              // Draw full side
              ctx.moveTo(side.x1, side.y1)
              ctx.lineTo(side.x2, side.y2)
              currentLength += sideLengthPx
            } else if (currentLength < drawnLength) {
              // Draw partial side
              const remainingLength = drawnLength - currentLength
              const ratio = remainingLength / sideLengthPx
              const partialX = side.x1 + (side.x2 - side.x1) * ratio
              const partialY = side.y1 + (side.y2 - side.y1) * ratio
              
              ctx.moveTo(side.x1, side.y1)
              ctx.lineTo(partialX, partialY)
              break
            } else {
              break
            }
          }
        }
      } else if (borderCapStyle === "beveled") {
        const size = exportSize - borderWidth - borderOffset * 2
        const x = borderWidth / 2 + borderOffset
        const y = borderWidth / 2 + borderOffset
        const cornerRadius = 10
        
        if (isFullBorder) {
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
          // For partial beveled borders, use the same logic as square but with rounded corners
          // This is a simplified version - for full accuracy, we'd need to calculate arc segments
          const sideLength = size
          const totalPerimeter = 4 * sideLength
          const drawnLength = squareArc
          
          let currentLength = 0
          const sides = [
            { x1: x + cornerRadius, y1: y, x2: x + size - cornerRadius, y2: y }, // top
            { x1: x + size, y1: y + cornerRadius, x2: x + size, y2: y + size - cornerRadius }, // right
            { x1: x + size - cornerRadius, y1: y + size, x2: x + cornerRadius, y2: y + size }, // bottom
            { x1: x, y1: y + size - cornerRadius, x2: x, y2: y + cornerRadius } // left
          ]
          
          for (let i = 0; i < sides.length; i++) {
            const side = sides[i]
            const sideLengthPx = Math.sqrt(Math.pow(side.x2 - side.x1, 2) + Math.pow(side.y2 - side.y1, 2))
            
            if (currentLength + sideLengthPx <= drawnLength) {
              // Draw full side
              ctx.moveTo(side.x1, side.y1)
              ctx.lineTo(side.x2, side.y2)
              currentLength += sideLengthPx
            } else if (currentLength < drawnLength) {
              // Draw partial side
              const remainingLength = drawnLength - currentLength
              const ratio = remainingLength / sideLengthPx
              const partialX = side.x1 + (side.x2 - side.x1) * ratio
              const partialY = side.y1 + (side.y2 - side.y1) * ratio
              
              ctx.moveTo(side.x1, side.y1)
              ctx.lineTo(partialX, partialY)
              break
            } else {
              break
            }
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
      ctx.globalAlpha = borderOpacity
      ctx.lineWidth = borderWidth
      ctx.stroke()
      ctx.globalAlpha = 1
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
    // Beveled (same logic as before)
    const bevel = 0.1 * exportSize;
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

    // Draw text
    if (showText && textContent) {
      ctx.save()
      ctx.globalAlpha = textOpacity
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.letterSpacing = `${letterSpacing}px`
      let fillStyle: CanvasGradient | string = textColor
      if (textColorType === "gradient") {
        let textGradient
        if (textStyle === "vertical") {
          textGradient = ctx.createLinearGradient(0, 0, 0, exportSize)
        } else {
          textGradient = ctx.createLinearGradient(0, 0, exportSize, 0)
        }
        textGradient.addColorStop(0, textGradientColors.start)
        textGradient.addColorStop(1, textGradientColors.end)
        fillStyle = textGradient
      }
      ctx.fillStyle = fillStyle
      if (textStyle === "straight") {
        ctx.fillText(textContent, exportSize / 2 + textPositionX, exportSize / 2 + textPositionY)
      } else if (textStyle === "vertical") {
        for (let i = 0; i < textContent.length; i++) {
          ctx.fillText(
            textContent[i],
            exportSize / 2 + textPositionX,
            exportSize / 2 + textPositionY + i * fontSize
          )
        }
      } else if (textStyle === "curved") {
        const radius = curveRadius || exportSize / 2.5
        const start = ((startAngle || 0) * Math.PI) / 180
        const dir = arcDirection === "counterclockwise" ? -1 : 1
        const chars = textContent.split("")
        const angleStep = (Math.PI * 2) / chars.length * dir
        ctx.save()
        ctx.translate(exportSize / 2 + textPositionX, exportSize / 2 + textPositionY)
        ctx.rotate(start)
        for (let i = 0; i < chars.length; i++) {
          ctx.save()
          ctx.rotate(i * angleStep)
          ctx.translate(0, -radius)
          ctx.rotate(-Math.PI / 2 * dir)
          ctx.fillText(chars[i], 0, 0)
          ctx.restore()
        }
        ctx.restore()
      }
      ctx.globalAlpha = 1
      ctx.restore()
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
    containerSize
  ])

  return { exportImage }
}
