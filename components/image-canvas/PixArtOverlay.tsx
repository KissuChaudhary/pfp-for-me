import React from "react"

interface PixArtOverlayProps {
  selectedPixArt: string | null
  containerSize: number
  borderCapStyle: "rounded" | "square" | "beveled"
  borderWidth: number
  borderOffset: number
  pixArtSize: number
}

const PixArtOverlay: React.FC<PixArtOverlayProps> = ({
  selectedPixArt,
  containerSize,
  borderCapStyle,
  borderWidth,
  borderOffset,
  pixArtSize,
}) => {
  if (!selectedPixArt) return null

  // Calculate clipping styles to match the border EXACTLY
  const getClippingStyle = () => {
    const squareSize = containerSize - (2 * borderOffset) - borderWidth
    const x = borderWidth / 2 + borderOffset
    const y = borderWidth / 2 + borderOffset
    
    if (borderCapStyle === "rounded") {
      const edgeRadius = containerSize / 2 - borderWidth / 2
      const borderRadius = edgeRadius - borderOffset
      const minRadius = borderWidth / 2
      const clampedRadius = Math.max(minRadius, borderRadius)
      return {
        clipPath: `circle(${clampedRadius}px at ${containerSize / 2}px ${containerSize / 2}px)`,
      }
    } else if (borderCapStyle === "square") {
      return {
        clipPath: `inset(${y}px ${x}px ${y}px ${x}px)`,
      }
    } else if (borderCapStyle === "beveled") {
      const cornerRadius = 10 // EXACT same as border
      return {
        clipPath: `inset(${y}px ${x}px ${y}px ${x}px round ${cornerRadius}px)`,
      }
    }
    return {}
  }

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        width: containerSize,
        height: containerSize,
        zIndex: 10, // Above image but below borders
        ...getClippingStyle(),
      }}
    >
      <img
        src={selectedPixArt}
        alt="Pix Art Effect"
        className="w-full h-full object-cover"
        style={{
          width: containerSize * (pixArtSize / 100),
          height: containerSize * (pixArtSize / 100),
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default PixArtOverlay 