import React from "react"

interface StaticBorderProps {
  selectedStaticBorder: string | null
  containerSize: number
  borderOpacity: number
}

const StaticBorder: React.FC<StaticBorderProps> = ({
  selectedStaticBorder,
  containerSize,
  borderOpacity,
}) => {
  if (!selectedStaticBorder) return null

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none"
      style={{
        width: containerSize,
        height: containerSize,
        opacity: borderOpacity / 100,
        zIndex: 20,
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