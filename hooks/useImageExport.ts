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
  // New props for static borders and patterns
  borderMode: "dynamic" | "static"
  selectedStaticBorder: string | null
  // Pix Art props
  selectedPixArt: string | null
  pixArtSize: number
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
  exportCanvasRef: React.RefObject<HTMLCanvasElement | null>
  containerSize?: number // Add containerSize parameter
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
    containerSize = 384, // Default to 384 for desktop
  } = props

  // Helper for filter style
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
    console.log('Export triggered. imageUrl:', imageUrl)
    if (!imageUrl || imageUrl === "") {
      alert("Please upload an image first!")
      return
    }
    const canvas = exportCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    // Export at high resolution (2048x2048) while maintaining preview proportions
    const exportSize = 2048
    const resolutionScaleFactor = exportSize / containerSize
    canvas.width = exportSize
    canvas.height = exportSize
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Enable high-quality image smoothing for sharp results
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    // Scale all drawing operations to maintain proportions
    const scaledBorderWidth = borderWidth * resolutionScaleFactor
    const scaledBorderOffset = borderOffset * resolutionScaleFactor
    const scaledPositionX = position.x * resolutionScaleFactor
    const scaledPositionY = position.y * resolutionScaleFactor
    
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
      const bevel = 0.1 * exportSize
      ctx.moveTo(bevel, 0)
      ctx.lineTo(exportSize - bevel, 0)
      ctx.lineTo(exportSize, bevel)
      ctx.lineTo(exportSize, exportSize - bevel)
      ctx.lineTo(exportSize - bevel, exportSize)
      ctx.lineTo(bevel, exportSize)
      ctx.lineTo(0, exportSize - bevel)
      ctx.lineTo(0, bevel)
      ctx.closePath()
    }
    ctx.clip()
    
    // Draw background first (now clipped to border shape)
    await (async () => {
      // Draw base background in the full canvas area (not just content area)
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
              // Handle image patterns - match browser background-size exactly
              const bgImage = new window.Image()
              bgImage.crossOrigin = "anonymous"
              bgImage.src = backgroundPattern.imageUrl!
              await new Promise((resolve) => (bgImage.onload = resolve))
              
              // Calculate pattern size to match browser background-size exactly
              const baseSize = 100 // Base size for image patterns
              const scaledSize = Math.max(20, Math.min(200, baseSize * patternScale)) * resolutionScaleFactor
              
              // Create a pattern that repeats at the exact size the browser uses
              const pattern = ctx.createPattern(bgImage, "repeat")
              if (pattern) {
                // Scale the pattern to match browser background-size exactly
                const matrix = new DOMMatrix()
                matrix.scaleSelf(scaledSize / bgImage.naturalWidth, scaledSize / bgImage.naturalHeight)
                pattern.setTransform(matrix)
                ctx.fillStyle = pattern
                ctx.fillRect(0, 0, exportSize, exportSize)
              }
            } else {
              // Handle SVG patterns
              const coloredPatternUrl = getColoredPattern(backgroundPattern, backgroundPattern.color)
              
              // Create a pattern with proper scaling
              const bgImage = new window.Image()
              bgImage.crossOrigin = "anonymous"
              bgImage.src = coloredPatternUrl
              await new Promise((resolve) => (bgImage.onload = resolve))
              
              // Calculate pattern size based on scale
              const baseSize = 20
              const scaledSize = Math.max(5, Math.min(100, baseSize * patternScale)) * resolutionScaleFactor
              
              // Create a pattern that repeats
              const pattern = ctx.createPattern(bgImage, "repeat")
              if (pattern) {
                // Scale the pattern
                const matrix = new DOMMatrix()
                matrix.scaleSelf((scaledSize / 20) / resolutionScaleFactor, (scaledSize / 20) / resolutionScaleFactor) // 20 is the base SVG size, adjust for scale factor
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

      // Draw pattern overlay if enabled (full canvas area)
      if (usePatternOverlay && backgroundPattern && backgroundType !== "pattern") {
        if (backgroundPattern.type === "image") {
          // Handle image pattern overlay - match browser background-size exactly
          const bgImage = new window.Image()
          bgImage.crossOrigin = "anonymous"
          bgImage.src = backgroundPattern.imageUrl!
          await new Promise((resolve) => (bgImage.onload = resolve))
          
          const baseSize = 100
          const scaledSize = Math.max(20, Math.min(200, baseSize * patternScale)) * resolutionScaleFactor
          
          const pattern = ctx.createPattern(bgImage, "repeat")
          if (pattern) {
            const matrix = new DOMMatrix()
            matrix.scaleSelf(scaledSize / bgImage.naturalWidth, scaledSize / bgImage.naturalHeight)
            pattern.setTransform(matrix)
            ctx.fillStyle = pattern
            ctx.fillRect(0, 0, exportSize, exportSize)
          }
        } else {
          // Handle SVG pattern overlay
          const coloredPatternUrl = getColoredPattern(backgroundPattern, backgroundPattern.color)
          
          const bgImage = new window.Image()
          bgImage.crossOrigin = "anonymous"
          bgImage.src = coloredPatternUrl
          await new Promise((resolve) => (bgImage.onload = resolve))
          
          const baseSize = 20
          const scaledSize = Math.max(5, Math.min(100, baseSize * patternScale)) * resolutionScaleFactor
          
          const pattern = ctx.createPattern(bgImage, "repeat")
          if (pattern) {
            const matrix = new DOMMatrix()
            matrix.scaleSelf((scaledSize / 20) / resolutionScaleFactor, (scaledSize / 20) / resolutionScaleFactor)
            pattern.setTransform(matrix)
            ctx.fillStyle = pattern
            ctx.fillRect(0, 0, exportSize, exportSize)
          }
        }
      }
    })()
    
    // Draw Pix Art overlay (after image but before borders)
    if (selectedPixArt) {
      const pixArtImage = new window.Image()
      pixArtImage.crossOrigin = "anonymous"
      pixArtImage.src = selectedPixArt
      await new Promise((resolve) => (pixArtImage.onload = resolve))
      
      ctx.save()
      
      // Apply the EXACT same clipping path as the border
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
    }
    
    // Draw uploaded image with all transforms and filters (use full canvas center)
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
      
      ctx.translate(canvasCenterX + scaledPositionX, canvasCenterY + scaledPositionY)
      ctx.rotate((rotate * Math.PI) / 180)
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)
      ctx.drawImage(img, -finalDrawWidth / 2, -finalDrawHeight / 2, finalDrawWidth, finalDrawHeight)
      ctx.restore()
    }
    ctx.restore()
    
    ctx.restore() // Restore the outer clipping path
    
    // Draw border (after pix art and drip art front)
    if (borderMode === "static" && selectedStaticBorder) {
      // Handle static border (image overlay)
      const borderImage = new window.Image()
      borderImage.crossOrigin = "anonymous"
      borderImage.src = selectedStaticBorder
      await new Promise((resolve) => (borderImage.onload = resolve))
      
      ctx.save()
      ctx.globalAlpha = borderOpacity / 100
      ctx.drawImage(borderImage, 0, 0, exportSize, exportSize)
      ctx.restore()
    } else if (borderWidth > 0) {
      ctx.save()
      ctx.lineWidth = scaledBorderWidth
      ctx.globalAlpha = borderOpacity / 100
      
      if (borderType === "solid") {
        ctx.strokeStyle = borderColor
      } else {
        let gradient
        if (borderGradientDirection === "to right") {
          gradient = ctx.createLinearGradient(0, 0, exportSize, 0)
        } else if (borderGradientDirection === "to bottom") {
          gradient = ctx.createLinearGradient(0, 0, 0, exportSize)
        } else if (borderGradientDirection === "45deg") {
          gradient = ctx.createLinearGradient(0, exportSize, exportSize, 0)
        } else if (borderGradientDirection === "circle") {
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
          gradient = ctx.createLinearGradient(0, 0, exportSize, exportSize)
        }
        gradient.addColorStop(0, borderGradientColors.start)
        gradient.addColorStop(1, borderGradientColors.end)
        ctx.strokeStyle = gradient
      }
      
      ctx.beginPath()
      const borderCenter = exportSize / 2
      
      // Use the same border calculation logic as useBorderProps hook
      const edgeRadius = exportSize / 2 - scaledBorderWidth / 2 // Border at edge
      const borderRadius = edgeRadius - scaledBorderOffset // Calculate radius: edgeRadius - offset
      const minRadius = scaledBorderWidth / 2
      const clampedRadius = Math.max(minRadius, borderRadius)
      
      if (borderCapStyle === "rounded") {
        const startAngle = ((borderRotation - 90) * Math.PI) / 180
        const endAngle = startAngle + (borderAmount / 100) * 2 * Math.PI
        ctx.arc(borderCenter, borderCenter, clampedRadius, startAngle, endAngle)
        ctx.lineCap = "round"
      } else {
        // For square borders, calculate based on the adjusted size
        const squareSize = exportSize - (2 * scaledBorderOffset) - scaledBorderWidth
        const x = scaledBorderWidth / 2 + scaledBorderOffset
        const y = scaledBorderWidth / 2 + scaledBorderOffset
        const perimeter = 4 * squareSize
        const dashLength = (borderAmount / 100) * perimeter
        const gapLength = perimeter - dashLength
        ctx.setLineDash([dashLength, gapLength])
        ctx.lineDashOffset = (-borderRotation / 360) * perimeter
        
        if (borderCapStyle === "square") {
          ctx.rect(x, y, squareSize, squareSize)
          ctx.lineCap = "butt"
        } else if (borderCapStyle === "beveled") {
          const cornerRadius = 10 // Match the browser preview exactly
          
          // Create rounded rectangle path for border
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
          ctx.lineCap = "butt"
        }
      }
      ctx.stroke()
      ctx.restore()
    }
    
    // Draw Text (after borders)
    if (showText && textContent.trim()) {
      ctx.save()
      
      // Set text properties (scale font size for high resolution)
      const scaledFontSize = fontSize * resolutionScaleFactor
      const scaledLetterSpacing = letterSpacing * resolutionScaleFactor
      ctx.font = `${fontWeight} ${scaledFontSize}px ${fontFamily}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.globalAlpha = textOpacity / 100
      
      // Set text color
      if (textColorType === "gradient") {
        // Create gradient for text
        const gradient = ctx.createLinearGradient(0, 0, exportSize, exportSize)
        gradient.addColorStop(0, textGradientColors.start)
        gradient.addColorStop(1, textGradientColors.end)
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = textColor
      }
      
      if (textStyle === "straight") {
        // Draw straight text
        const x = (exportSize * textPositionX) / 100
        const y = (exportSize * textPositionY) / 100
        
        // Apply letter spacing (scaled)
        if (letterSpacing !== 0) {
          const chars = textContent.split('')
          const totalSpacing = (chars.length - 1) * scaledLetterSpacing
          const startX = x - totalSpacing / 2
          
          chars.forEach((char, index) => {
            ctx.fillText(char, startX + (index * scaledLetterSpacing), y)
          })
        } else {
          ctx.fillText(textContent, x, y)
        }
      } else if (textStyle === "vertical") {
        // Draw vertical text
        const x = (exportSize * textPositionX) / 100
        const y = (exportSize * textPositionY) / 100
        
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.PI / 2) // 90 degrees
        
        // Apply letter spacing (scaled)
        if (letterSpacing !== 0) {
          const chars = textContent.split('')
          const totalSpacing = (chars.length - 1) * scaledLetterSpacing
          const startY = -totalSpacing / 2
          
          chars.forEach((char, index) => {
            ctx.fillText(char, 0, startY + (index * scaledLetterSpacing))
          })
        } else {
          ctx.fillText(textContent, 0, 0)
        }
        
        ctx.restore()
      } else if (textStyle === "curved") {
        // Draw curved text using SVG approach
        const radius = (exportSize * curveRadius) / 100
        const centerX = exportSize / 2
        const centerY = exportSize / 2
        
        // Convert start angle from degrees to radians
        const startAngleRad = (startAngle * Math.PI) / 180
        
        // Create a temporary canvas for curved text
        const tempCanvas = document.createElement('canvas')
        const tempCtx = tempCanvas.getContext('2d')
        if (tempCtx) {
          tempCanvas.width = exportSize
          tempCanvas.height = exportSize
          
          // Set text properties on temp canvas for measuring (scaled font size)
          tempCtx.font = `${fontWeight} ${scaledFontSize}px ${fontFamily}`
          
          // Calculate total text width
          const chars = textContent.split('')
          const charWidths: number[] = []
          let totalTextWidth = 0
          
          chars.forEach(char => {
            const charWidth = tempCtx.measureText(char).width
            charWidths.push(charWidth)
            totalTextWidth += charWidth
          })
          
          // Calculate the arc length available for the text
          const arcLength = 2 * Math.PI * radius // Full circle circumference
          const availableArcLength = arcLength * 0.8 // Use 80% of the circle to avoid overlap
          
          // If text is too long for the arc, scale it down
          let scaleFactor = 1
          if (totalTextWidth > availableArcLength) {
            scaleFactor = availableArcLength / totalTextWidth
          }
          
          // Calculate adjusted character spacing
          const adjustedCharWidths = charWidths.map(width => width * scaleFactor)
          const totalAdjustedWidth = adjustedCharWidths.reduce((sum, width) => sum + width, 0)
          
          // Calculate the angle step to distribute characters evenly
          const angleStep = totalAdjustedWidth / radius
          
          // Calculate starting angle to center the text
          const startAngleForText = startAngleRad - (angleStep / 2)
          
          // Create SVG string for the curved text
          let svgString = `<svg width="${exportSize}" height="${exportSize}" style="position: absolute; top: 0; left: 0;">`
          
          // Add gradient definition if needed
          if (textColorType === "gradient") {
            svgString += `
              <defs>
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:${textGradientColors.start};stop-opacity:1" />
                  <stop offset="100%" style="stop-color:${textGradientColors.end};stop-opacity:1" />
                </linearGradient>
              </defs>
            `
          }
          
          // Draw each character as SVG text element
          let currentAngle = startAngleForText
          chars.forEach((char, index) => {
            const charX = centerX + radius * Math.cos(currentAngle)
            const charY = centerY + radius * Math.sin(currentAngle)
            const rotationAngle = (currentAngle * 180) / Math.PI + 90 // Convert to degrees and adjust
            
            // Escape special characters in SVG
            const escapedChar = char
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;')
            
            const fillColor = textColorType === "gradient" ? "url(#textGradient)" : textColor
            const scaledFontSizeForCurvedText = fontSize * resolutionScaleFactor * scaleFactor
            
            svgString += `
              <text 
                x="${charX}" 
                y="${charY}" 
                font-size="${scaledFontSizeForCurvedText}" 
                font-family="${fontFamily}" 
                font-weight="${fontWeight}" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                transform="rotate(${rotationAngle}, ${charX}, ${charY})"
                style="fill: ${fillColor}; opacity: ${textOpacity / 100}; user-select: none;"
              >${escapedChar}</text>
            `
            
            // Move to next character position
            currentAngle += (adjustedCharWidths[index] / radius)
          })
          
          svgString += '</svg>'
          
          // Create an image from the SVG and draw it to the canvas
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
          const url = URL.createObjectURL(svgBlob)
          const img = new Image()
          
          img.onload = () => {
            tempCtx.drawImage(img, 0, 0)
            URL.revokeObjectURL(url)
          }
          
          img.src = url
          
          // Draw the temp canvas onto the main canvas
          ctx.drawImage(tempCanvas, 0, 0)
        }
      }
      
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
    containerSize,
  ])

  return { exportImage }
}
