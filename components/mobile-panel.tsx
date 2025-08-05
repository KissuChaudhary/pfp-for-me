"use client"

import FiltersPanel from "./panels/filters-panel"
import BackgroundPanel from "./panels/background-panel"
import BorderPanel from "./panels/border-panel"
import StylesPanel from "./panels/styles-panel"

interface MobilePanelProps {
  activePanel: string | null
  setActivePanel: (panel: string | null) => void
  positionProps: any
  backgroundProps: any
  filterProps: any
  borderProps: any
  pixArtProps: any
  textProps: any
}

export default function MobilePanel({ 
  activePanel, 
  setActivePanel,
  positionProps,
  backgroundProps,
  filterProps,
  borderProps,
  pixArtProps,

}: MobilePanelProps) {
  if (!activePanel) return null

  return (
    <div className="h-80 border-t-2 border-black bg-white">
      <div className="h-full overflow-y-auto">
        {activePanel === "filters" && <FiltersPanel {...filterProps} />}
        {activePanel === "background" && <BackgroundPanel {...backgroundProps} />}
        {activePanel === "border" && <BorderPanel {...borderProps} />}
        {activePanel === "styles" && <StylesPanel />}
      </div>
    </div>
  )
}
