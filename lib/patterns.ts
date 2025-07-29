export type Pattern = {
  id: string
  name: string
  svg: string
  color: string
  type?: "svg" | "image"
  imageUrl?: string
}

// Utility function to generate colored SVG pattern
export function getColoredPattern(pattern: Pattern, color: string): string {
  // Decode the SVG to replace currentColor with the actual color
  const decodedSvg = decodeURIComponent(pattern.svg.replace('data:image/svg+xml,', ''))
  const coloredSvg = decodedSvg.replace(/currentColor/g, color)
  return `data:image/svg+xml,${encodeURIComponent(coloredSvg)}`
}

export const patterns: Pattern[] = [
  
  {
    id: "grid",
    name: "Grid",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1h18v18H1V1z" fill="none" stroke="currentColor" stroke-opacity="0.2"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "crosses",
    name: "Crosses",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2h4v4h4v4h-4v4h-4v-4H4V6h4V2z" fill="currentColor" fill-opacity="0.3"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "diagonal-lines",
    name: "Diagonal Lines",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20L20 0" stroke="currentColor" stroke-width="1" stroke-opacity="0.2"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "zigzag",
    name: "Zigzag",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 5l5 5-5 5 5-5 5 5 5-5" stroke="currentColor" stroke-width="1" stroke-opacity="0.2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "triangles",
    name: "Triangles",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2l8 16H2z" fill="currentColor" fill-opacity="0.1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "squares",
    name: "Squares",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="6" height="6" fill="currentColor" fill-opacity="0.2"/>
        <rect x="12" y="12" width="6" height="6" fill="currentColor" fill-opacity="0.2"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "waves",
    name: "Waves",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10c2.5-5 7.5-5 10 0s7.5 5 10 0" stroke="currentColor" stroke-width="1" stroke-opacity="0.2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "hexagons",
    name: "Hexagons",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1l8 4v10l-8 4-8-4V5z" fill="none" stroke="currentColor" stroke-opacity="0.2"/>
      </svg>
    `)}`,
    color: "#000000"
  },
   {
    id: "chevrons",
    name: "Chevrons",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,10 10,20 20,10" stroke="currentColor" stroke-width="2" fill="none"/>
        <polyline points="0,0 10,10 20,0" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "crosshatch",
    name: "Crosshatch",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="20" y2="20" stroke="currentColor" stroke-width="1"/>
        <line x1="20" y1="0" x2="0" y2="20" stroke="currentColor" stroke-width="1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-leaf",
    name: "Minimal Leaf",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2 Q15 10 10 18 Q5 10 10 2" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "waves-2",
    name: "Waves 2",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 15 Q5 5 10 15 T20 15" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "dots-2",
    name: "Dots 2",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2" fill="currentColor"/>
        <circle cx="14" cy="14" r="2" fill="currentColor"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "grid-2",
    name: "Grid 2",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-star",
    name: "Minimal Star",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-flower",
    name: "Minimal Flower",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1"/>
        <circle cx="10" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1"/>
        <circle cx="10" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="1"/>
        <circle cx="4" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/>
        <circle cx="16" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-diamond",
    name: "Minimal Diamond",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-zigzag",
    name: "Minimal Zigzag",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,10 5,2 10,18 15,2 20,18" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-arrow",
    name: "Minimal Arrow",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <polyline points="5,10 10,2 15,10" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-mountain",
    name: "Minimal Mountain",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,18 5,5 10,15 15,2 20,18" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-sun",
    name: "Minimal Sun",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="10" y1="0" x2="10" y2="5" stroke="currentColor" stroke-width="1"/>
        <line x1="10" y1="15" x2="10" y2="20" stroke="currentColor" stroke-width="1"/>
        <line x1="0" y1="10" x2="5" y2="10" stroke="currentColor" stroke-width="1"/>
        <line x1="15" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-square",
    name: "Minimal Square",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-pyramid",
    name: "Minimal Pyramid",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,18 10,2 15,18" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" stroke-width="1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-spiral",
    name: "Minimal Spiral",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 m-8 0 a8 8 0 1 1 16 0 a4 4 0 1 0 -8 0" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-rings",
    name: "Minimal Rings",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1"/>
        <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-bars",
    name: "Minimal Bars",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="10" height="3" fill="currentColor" fill-opacity="0.1"/>
        <rect x="5" y="12" width="10" height="3" fill="currentColor" fill-opacity="0.1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-checker",
    name: "Minimal Checker",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="10" height="10" fill="currentColor" fill-opacity="0.1"/>
        <rect x="10" y="10" width="10" height="10" fill="currentColor" fill-opacity="0.1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-polka",
    name: "Minimal Polka",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="3" fill="currentColor" fill-opacity="0.1"/>
        <circle cx="15" cy="15" r="3" fill="currentColor" fill-opacity="0.1"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  {
    id: "minimal-mesh",
    name: "Minimal Mesh",
    svg: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5 Q10 10 15 5 Q10 15 5 5" stroke="currentColor" stroke-width="1" fill="none"/>
      </svg>
    `)}`,
    color: "#000000"
  },
  
  // Image-based patterns from public/assets/pattern/
  ...Array.from({ length: 38 }, (_, i) => ({
    id: `image-pattern-${i + 1}`,
    name: `Pattern ${i + 1}`,
    svg: "", // Not used for image patterns
    color: "#000000", // Default color
    type: "image" as const,
    imageUrl: `/assets/pattern/p_${i + 1}.webp`
  }))
];
