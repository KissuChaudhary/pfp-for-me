import React from "react"
import { calculateClippingPath } from "@/lib/clippingUtils"

interface StaticBorderProps {
  selectedStaticBorder: string | null
  containerSize: number
  borderOpacity: number
  borderCapStyle: "rounded" | "square" | "beveled"
  borderWidth: number
  borderOffset: number
}

const StaticBorder: React.FC<StaticBorderProps> = ({
  selectedStaticBorder,
  containerSize,
  borderOpacity,
  borderCapStyle,
  borderWidth,
  borderOffset,
}) => {
  if (!selectedStaticBorder) return null

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
        opacity: borderOpacity / 100,
        zIndex: 20,
        ...clippingStyle,
      }}
    >
      <img
        src={selectedStaticBorder}
        alt="Static Border"
        className="w-full h-full object-cover"
        style={{
          width: containerSize,
          height: containerSize,
        }}
      />
    </div>
  )
}

export default StaticBorder 