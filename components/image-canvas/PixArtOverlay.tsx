import React from "react"
import { calculateClippingPath } from "@/lib/clippingUtils"

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

  // Use shared clipping utility for consistent clipping between preview and export
  const clippingResult = calculateClippingPath({
    containerSize,
    borderWidth,
    borderOffset,
    borderCapStyle,
  })

  const clippingStyle = {
    clipPath: clippingResult.cssClipPath,
  }

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        width: containerSize,
        height: containerSize,
        zIndex: 10, // Above image but below borders
        ...clippingStyle,
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