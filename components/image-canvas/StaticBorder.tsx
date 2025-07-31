import React from "react"

interface StaticBorderProps {
  selectedStaticBorder: string | null
  containerSize: number
  borderOpacity: number
  borderCapStyle: "rounded" | "square" | "beveled"
}

const StaticBorder: React.FC<StaticBorderProps> = ({
  selectedStaticBorder,
  containerSize,
  borderOpacity,
  borderCapStyle,
}) => {
  if (!selectedStaticBorder) return null

  // Get the clip path based on border cap style
  const getClipPath = () => {
    switch (borderCapStyle) {
      case "rounded":
        return "circle(50% at 50% 50%)"
      case "square":
        return "inset(0% round 0px)" // Explicitly square with no border radius
      case "beveled":
        // Create a beveled shape with rounded corners (same as export logic)
        const cornerSize = 10 / containerSize * 100 // Convert 10px to percentage
        return `inset(0% round ${cornerSize}%)`
      default:
        return "circle(50% at 50% 50%)"
    }
  }

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        width: containerSize,
        height: containerSize,
        opacity: borderOpacity / 100,
        zIndex: 20,
        clipPath: getClipPath(),
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