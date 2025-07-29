import { useMemo } from "react"

interface UseImageFiltersProps {
  useFilters: boolean
  brightness: number
  contrast: number
  saturation: number
  blur: number
  grayscale: number
  hueRotate: number
  invert: number
  sepia: number
}

export function useImageFilters(props: UseImageFiltersProps) {
  const {
    useFilters,
    brightness,
    contrast,
    saturation,
    blur,
    grayscale,
    hueRotate,
    invert,
    sepia,
  } = props

  const filter = useMemo(() => {
    if (!useFilters) return "none"
    return `
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
      blur(${blur}px)
      grayscale(${grayscale}%)
      hue-rotate(${hueRotate}deg)
      invert(${invert}%)
      sepia(${sepia}%)
    `.replace(/\s+/g, " ").trim()
  }, [useFilters, brightness, contrast, saturation, blur, grayscale, hueRotate, invert, sepia])

  return filter
}
