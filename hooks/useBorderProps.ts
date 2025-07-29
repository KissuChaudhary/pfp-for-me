import { useMemo } from "react"

interface UseBorderProps {
  borderWidth: number
  borderColor: string
  borderType: "solid" | "gradient"
  borderGradientColors: { start: string; end: string }
  borderGradientDirection: string
  borderOffset: number
  borderAmount: number
  borderRotation: number
  borderCapStyle: "rounded" | "square" | "beveled"
  containerSize?: number // Add containerSize parameter
}

export function useBorderProps(props: UseBorderProps) {
  const {
    borderWidth,
    borderColor,
    borderType,
    borderGradientColors,
    borderGradientDirection,
    borderOffset,
    borderAmount,
    borderRotation,
    borderCapStyle,
    containerSize = 384, // Default to 384 for desktop
  } = props

  return useMemo(() => {
    if (borderWidth === 0) return null
    
    // Use provided container size or default to 384
    const center = containerSize / 2
    
    // Calculate border position based on offset
    // At offset 0, border should be at the edge (radius = containerSize/2 - borderWidth/2)
    // At offset 20, border should be 20px inward from edge
    const edgeRadius = containerSize / 2 - borderWidth / 2 // Border at edge
    const maxInwardRadius = edgeRadius - 20 // Maximum inward position (20px from edge)
    
    // Calculate radius: edgeRadius - offset
    const borderRadius = edgeRadius - borderOffset
    
    // Ensure border doesn't go too close to center
    const minRadius = borderWidth / 2
    const clampedRadius = Math.max(minRadius, borderRadius)
    
    const circleCircumference = 2 * Math.PI * clampedRadius
    const arcLength = circleCircumference * (borderAmount / 100)
    
    // For square borders, calculate based on the adjusted size
    const squareSize = containerSize - (2 * borderOffset) - borderWidth
    const squarePerimeter = 4 * squareSize
    const squareArc = squarePerimeter * (borderAmount / 100)
    
    let strokeColor = borderColor
    let gradientId = ""
    
    if (borderType === "gradient") {
      gradientId = "borderGradient"
      strokeColor = `url(#${gradientId})`
    }
    
    return {
      outerSize: containerSize, // Always return fixed container size
      center,
      radius: clampedRadius,
      circleCircumference,
      arcLength,
      squarePerimeter,
      squareArc,
      strokeColor,
      gradientId,
      borderOffset, // Pass through for reference
    }
  }, [borderWidth, borderColor, borderType, borderGradientColors, borderGradientDirection, borderOffset, borderAmount, borderRotation, borderCapStyle, containerSize])
}
