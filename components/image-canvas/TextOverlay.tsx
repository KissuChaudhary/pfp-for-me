"use client"

import React from "react"

interface TextOverlayProps {
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
  containerSize: number
  // Curved text specific props
  curveRadius: number
  startAngle: number
  arcDirection: "clockwise" | "counterclockwise"
}

export default function TextOverlay({
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
  containerSize,
  curveRadius,
  startAngle,
  arcDirection,
}: TextOverlayProps) {
  if (!showText || !textContent.trim()) return null



  const getTextStyle = () => {
    const baseStyle = {
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      fontSize: `${fontSize}px`,
      letterSpacing: `${letterSpacing}px`,
      opacity: textOpacity / 100,
      position: "absolute" as const,
      zIndex: 25, // Above everything except borders (borders have zIndex: 20)
      userSelect: "none" as const,
      pointerEvents: "none" as const,

    }

    if (textColorType === "gradient") {
      return {
        ...baseStyle,
        background: `linear-gradient(45deg, ${textGradientColors.start}, ${textGradientColors.end})`,
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent" as const,
        backgroundClip: "text" as const,
      }
    } else {
      return {
        ...baseStyle,
        color: textColor,
      }
    }
  }

  const getPositionStyle = () => {
    const x = `${textPositionX}%`
    const y = `${textPositionY}%`
    
    if (textStyle === "vertical") {
      return {
        left: x,
        top: y,
        transform: "translate(-50%, -50%) rotate(90deg)",
      }
    } else {
      return {
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }
    }
  }

  const renderCurvedText = () => {
    if (textStyle !== "curved") return null

    const radius = (containerSize * curveRadius) / 100 // Use curveRadius prop
    const centerX = containerSize / 2
    const centerY = containerSize / 2
    
    // Convert start angle from degrees to radians
    const startAngleRad = (startAngle * Math.PI) / 180
    
    // Calculate end angle based on arc direction
    const arcLength = Math.PI // 180 degrees arc
    const endAngleRad = arcDirection === "clockwise" 
      ? startAngleRad + arcLength 
      : startAngleRad - arcLength
    
    // Calculate start and end points of the arc
    const startX = centerX + radius * Math.cos(startAngleRad)
    const startY = centerY + radius * Math.sin(startAngleRad)
    const endX = centerX + radius * Math.cos(endAngleRad)
    const endY = centerY + radius * Math.sin(endAngleRad)
    
    // Create the arc path
    const largeArcFlag = arcLength > Math.PI ? 1 : 0
    const sweepFlag = arcDirection === "clockwise" ? 1 : 0
    
    const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`
    
    return (
      <svg
        width={containerSize}
        height={containerSize}
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          zIndex: 25 
        }}
      >
        <defs>
          {textColorType === "gradient" && (
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={textGradientColors.start} />
              <stop offset="100%" stopColor={textGradientColors.end} />
            </linearGradient>
          )}
        </defs>
        <path
          id="textPath"
          d={arcPath}
          fill="none"
        />
        <text
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          opacity={textOpacity / 100}
          fill={textColorType === "gradient" ? "url(#textGradient)" : textColor}
        >
          <textPath href="#textPath" startOffset="0%" textAnchor="start">
            {textContent}
          </textPath>
        </text>
      </svg>
    )
  }

  const renderStraightText = () => {
    if (textStyle !== "straight") return null

    return (
      <div
        style={{
          ...getTextStyle(),
          ...getPositionStyle(),
        }}
      >
        {textContent}
      </div>
    )
  }

  const renderVerticalText = () => {
    if (textStyle !== "vertical") return null

    return (
      <div
        style={{
          ...getTextStyle(),
          ...getPositionStyle(),
          writingMode: "vertical-rl" as const,
          textOrientation: "mixed" as const,
        }}
      >
        {textContent}
      </div>
    )
  }

  return (
    <>
      {renderStraightText()}
      {renderCurvedText()}
      {renderVerticalText()}
    </>
  )
} 