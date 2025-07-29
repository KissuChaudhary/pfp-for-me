import React from "react";

interface BorderSVGProps {
  borderProps: any;
  borderType: string;
  borderGradientColors: { start: string; end: string };
  borderGradientDirection: string; // Add this prop
  borderOpacity: number;
  borderWidth: number;
  borderCapStyle: string;
  borderRotation: number;
}

const BorderSVG: React.FC<BorderSVGProps> = ({
  borderProps,
  borderType,
  borderGradientColors,
  borderGradientDirection, // Add this prop
  borderOpacity,
  borderWidth,
  borderCapStyle,
  borderRotation,
}) => {
  if (!borderProps) return null;

  // Generate unique gradient ID to avoid conflicts
  const uniqueGradientId = `borderGradient_${Math.random().toString(36).substr(2, 9)}`;

  // Common SVG attributes
  const commonProps = {
    stroke: borderType === "gradient" ? `url(#${uniqueGradientId})` : borderProps.strokeColor,
    strokeWidth: borderWidth,
    fill: "none",
  };

  // For full borders (100%), don't use strokeDasharray
  const isFullBorder = borderProps.arcLength >= borderProps.circleCircumference * 0.99;

  // Function to get gradient coordinates based on direction
  const getGradientCoordinates = () => {
    switch (borderGradientDirection) {
      case "to right":
        return { x1: "0%", y1: "0%", x2: "100%", y2: "0%" };
      case "to bottom":
        return { x1: "0%", y1: "0%", x2: "0%", y2: "100%" };
      case "45deg":
        return { x1: "0%", y1: "100%", x2: "100%", y2: "0%" };
      case "circle":
        return { x1: "0%", y1: "0%", x2: "100%", y2: "100%" };
      default:
        return { x1: "0%", y1: "0%", x2: "100%", y2: "100%" };
    }
  };

  const gradientCoords = getGradientCoordinates();

  return (
    <svg
      width={borderProps.outerSize}
      height={borderProps.outerSize}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ 
        opacity: borderOpacity / 100,
        zIndex: 20
      }}
    >
      {/* Gradient definition for gradient borders */}
      {borderType === "gradient" && (
        <defs>
          {borderGradientDirection === "circle" ? (
            <radialGradient id={uniqueGradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={borderGradientColors.start} />
              <stop offset="100%" stopColor={borderGradientColors.end} />
            </radialGradient>
          ) : (
            <linearGradient 
              id={uniqueGradientId} 
              x1={gradientCoords.x1} 
              y1={gradientCoords.y1} 
              x2={gradientCoords.x2} 
              y2={gradientCoords.y2}
            >
              <stop offset="0%" stopColor={borderGradientColors.start} />
              <stop offset="100%" stopColor={borderGradientColors.end} />
            </linearGradient>
          )}
        </defs>
      )}

      {borderCapStyle === "rounded" ? (
        // Circle border
        <circle
          cx={borderProps.center}
          cy={borderProps.center}
          r={borderProps.radius}
          {...commonProps}
          {...(isFullBorder ? {} : {
            strokeDasharray: `${borderProps.arcLength} ${borderProps.circleCircumference}`,
            strokeDashoffset: 0,
          })}
          transform={`rotate(${borderRotation - 90} ${borderProps.center} ${borderProps.center})`}
        />
      ) : (
        // Rectangle border (square/beveled) - positioned based on offset
        <rect
          x={borderWidth / 2 + borderProps.borderOffset}
          y={borderWidth / 2 + borderProps.borderOffset}
          width={borderProps.outerSize - borderWidth - (2 * borderProps.borderOffset)}
          height={borderProps.outerSize - borderWidth - (2 * borderProps.borderOffset)}
          rx={borderCapStyle === "beveled" ? 10 : 0}
          {...commonProps}
          {...(isFullBorder ? {} : {
            strokeDasharray: `${borderProps.squareArc} ${borderProps.squarePerimeter}`,
            strokeDashoffset: 0,
          })}
          transform={`rotate(${borderRotation} ${borderProps.center} ${borderProps.center})`}
        />
      )}
    </svg>
  );
};

export default BorderSVG;
