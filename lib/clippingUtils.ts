/**
 * Shared utility for calculating clipping paths that work consistently
 * between CSS clipPath (for preview) and Canvas clipping (for export)
 */

export interface ClippingParams {
  containerSize: number
  borderWidth: number
  borderOffset: number
  borderCapStyle: "rounded" | "square" | "beveled"
}

export interface ClippingResult {
  cssClipPath: string
  drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => void
}

/**
 * Calculate clipping region for border cap styles
 * Returns both CSS clipPath and canvas clipping function for consistency
 */
export function calculateClippingPath(params: ClippingParams): ClippingResult {
  const { containerSize, borderWidth, borderOffset, borderCapStyle } = params

  if (borderCapStyle === "rounded") {
    // Calculate radius for circular clipping
    const edgeRadius = containerSize / 2 - borderWidth / 2
    const borderRadius = edgeRadius - borderOffset
    const minRadius = borderWidth / 2
    const clampedRadius = Math.max(minRadius, borderRadius)
    const centerX = containerSize / 2
    const centerY = containerSize / 2

    return {
      cssClipPath: `circle(${clampedRadius}px at ${centerX}px ${centerY}px)`,
      drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.arc(centerX, centerY, clampedRadius, 0, 2 * Math.PI)
      }
    }
  } else if (borderCapStyle === "square") {
    // Calculate rectangle clipping
    const squareSize = containerSize - (2 * borderOffset) - borderWidth
    const x = borderWidth / 2 + borderOffset
    const y = borderWidth / 2 + borderOffset

    return {
      cssClipPath: `inset(${y}px ${x}px ${y}px ${x}px)`,
      drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.rect(x, y, squareSize, squareSize)
      }
    }
  } else if (borderCapStyle === "beveled") {
    // Calculate rounded rectangle clipping
    const squareSize = containerSize - (2 * borderOffset) - borderWidth
    const x = borderWidth / 2 + borderOffset
    const y = borderWidth / 2 + borderOffset
    const cornerRadius = 10 // Match the exact value used in border drawing

    return {
      cssClipPath: `inset(${y}px ${x}px ${y}px ${x}px round ${cornerRadius}px)`,
      drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        // Create rounded rectangle path exactly like in export logic
        ctx.moveTo(x + cornerRadius, y)
        ctx.lineTo(x + squareSize - cornerRadius, y)
        ctx.quadraticCurveTo(x + squareSize, y, x + squareSize, y + cornerRadius)
        ctx.lineTo(x + squareSize, y + squareSize - cornerRadius)
        ctx.quadraticCurveTo(x + squareSize, y + squareSize, x + squareSize - cornerRadius, y + squareSize)
        ctx.lineTo(x + cornerRadius, y + squareSize)
        ctx.quadraticCurveTo(x, y + squareSize, x, y + squareSize - cornerRadius)
        ctx.lineTo(x, y + cornerRadius)
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
        ctx.closePath()
      }
    }
  }

  // Fallback - no clipping
  return {
    cssClipPath: 'none',
    drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath()
      ctx.rect(0, 0, containerSize, containerSize)
    }
  }
}

/**
 * Calculate clipping region for the entire canvas/container
 * Used for overall shape clipping in export
 */
export function calculateContainerClippingPath(params: ClippingParams): ClippingResult {
  const { containerSize, borderCapStyle } = params

  if (borderCapStyle === "rounded") {
    const canvasCenter = containerSize / 2
    const canvasRadius = containerSize / 2

    return {
      cssClipPath: `circle(${canvasRadius}px at ${canvasCenter}px ${canvasCenter}px)`,
      drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.arc(canvasCenter, canvasCenter, canvasRadius, 0, 2 * Math.PI)
      }
    }
  } else if (borderCapStyle === "square") {
    return {
      cssClipPath: 'none',
      drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.rect(0, 0, containerSize, containerSize)
      }
    }
  } else if (borderCapStyle === "beveled") {
    const bevel = 0.1 * containerSize

    return {
      cssClipPath: `polygon(${bevel}px 0, ${containerSize - bevel}px 0, ${containerSize}px ${bevel}px, ${containerSize}px ${containerSize - bevel}px, ${containerSize - bevel}px ${containerSize}px, ${bevel}px ${containerSize}px, 0 ${containerSize - bevel}px, 0 ${bevel}px)`,
      drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.moveTo(bevel, 0)
        ctx.lineTo(containerSize - bevel, 0)
        ctx.lineTo(containerSize, bevel)
        ctx.lineTo(containerSize, containerSize - bevel)
        ctx.lineTo(containerSize - bevel, containerSize)
        ctx.lineTo(bevel, containerSize)
        ctx.lineTo(0, containerSize - bevel)
        ctx.lineTo(0, bevel)
        ctx.closePath()
      }
    }
  }

  // Fallback
  return {
    cssClipPath: 'none',
    drawCanvasClipPath: (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath()
      ctx.rect(0, 0, containerSize, containerSize)
    }
  }
}