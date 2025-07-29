import { useMemo } from "react"

export function useImageBorderRadius(borderCapStyle: "rounded" | "square" | "beveled") {
  return useMemo(() => {
    switch (borderCapStyle) {
      case "rounded":
        return "50%"
      case "square":
        return "0"
      case "beveled":
        return "10px"
      default:
        return "50%"
    }
  }, [borderCapStyle])
}
