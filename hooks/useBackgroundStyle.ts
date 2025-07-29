import { useMemo } from "react"
import { Pattern, getColoredPattern } from "@/lib/patterns"

interface UseBackgroundStyleProps {
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
}

export function useBackgroundStyle(props: UseBackgroundStyleProps) {
  const {
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
  } = props

  const style = useMemo(() => {
    // Base background style
    let baseStyle: React.CSSProperties = {}
    
    switch (backgroundType) {
      case "solid":
        baseStyle = { backgroundColor }
        break
      case "gradient":
        baseStyle = {
          backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.start}, ${gradientColors.end})`,
        }
        break
      case "image":
        baseStyle = {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize,
          backgroundPosition,
          backgroundRepeat: "no-repeat",
        }
        break
      case "pattern":
        if (backgroundPattern) {
          if (backgroundPattern.type === "image") {
            // Handle image patterns
            const baseSize = 100 // Base size for image patterns
            const scaledSize = Math.max(20, Math.min(200, baseSize * patternScale))
            
            baseStyle = {
              backgroundImage: `url(${backgroundPattern.imageUrl})`,
              backgroundSize: `${scaledSize}px ${scaledSize}px`,
              backgroundPosition,
              backgroundRepeat: "repeat",
            }
          } else {
            // Handle SVG patterns
            const baseSize = 20 // Base size in pixels
            const scaledSize = Math.max(5, Math.min(100, baseSize * patternScale)) // Limit between 5px and 100px
            
            // Generate colored pattern if pattern exists
            const coloredPatternUrl = getColoredPattern(backgroundPattern, backgroundPattern.color)
            
            baseStyle = {
              backgroundImage: coloredPatternUrl ? `url(${coloredPatternUrl})` : "none",
              backgroundSize: `${scaledSize}px ${scaledSize}px`,
              backgroundPosition,
              backgroundRepeat: "repeat",
            }
          }
        } else {
          baseStyle = { backgroundColor: "transparent" }
        }
        break
      default:
        baseStyle = { backgroundColor: "transparent" }
    }

    // If pattern overlay is enabled and we have a pattern, layer it on top
    if (usePatternOverlay && backgroundPattern && backgroundType !== "pattern") {
      let patternBackground: string
      let patternSize: string
      
      if (backgroundPattern.type === "image") {
        // Handle image pattern overlay
        const baseSize = 100
        const scaledSize = Math.max(20, Math.min(200, baseSize * patternScale))
        patternBackground = `url(${backgroundPattern.imageUrl})`
        patternSize = `${scaledSize}px ${scaledSize}px`
      } else {
        // Handle SVG pattern overlay
        const baseSize = 20
        const scaledSize = Math.max(5, Math.min(100, baseSize * patternScale))
        const coloredPatternUrl = getColoredPattern(backgroundPattern, backgroundPattern.color)
        patternBackground = `url(${coloredPatternUrl})`
        patternSize = `${scaledSize}px ${scaledSize}px`
      }
      
      // Create layered background with pattern on top
      const baseBackground = baseStyle.backgroundImage || "none"
      
      baseStyle = {
        ...baseStyle,
        backgroundImage: `${patternBackground}, ${baseBackground}`,
        backgroundSize: `${patternSize}, ${backgroundSize}`,
        backgroundPosition: `${backgroundPosition}, ${backgroundPosition}`,
        backgroundRepeat: "repeat, no-repeat",
      }
    }

    return baseStyle
  }, [backgroundType, backgroundColor, gradientColors, gradientDirection, backgroundPattern, backgroundImage, backgroundSize, backgroundPosition, patternScale, usePatternOverlay])

  return style
}
