import React from "react"

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

  // Calculate clipping styles to match the border cap style (same logic as PixArtOverlay)
  const getClippingStyle = () => {
    if (borderCapStyle === "rounded") {
      return {
        clipPath: `circle(${containerSize / 2}px at ${containerSize / 2}px ${containerSize / 2}px)`,
      }
    } else if (borderCapStyle === "square") {
      return {
        clipPath: `inset(0px)`,
      }
    } else if (borderCapStyle === "beveled") {
      const bevel = 0.1 * containerSize
      return {
        clipPath: `polygon(${bevel}px 0%, ${containerSize - bevel}px 0%, 100% ${bevel}px, 100% ${containerSize - bevel}px, ${containerSize - bevel}px 100%, ${bevel}px 100%, 0% ${containerSize - bevel}px, 0% ${bevel}px)`,
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
        opacity: borderOpacity / 100,
        zIndex: 20,
        ...getClippingStyle(),
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