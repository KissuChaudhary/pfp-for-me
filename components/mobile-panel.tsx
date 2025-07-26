"use client"

import FiltersPanel from "./panels/filters-panel"
import BackgroundPanel from "./panels/background-panel"
import BorderPanel from "./panels/border-panel"
import StylesPanel from "./panels/styles-panel"

interface MobilePanelProps {
  activePanel: string | null
  setActivePanel: (panel: string | null) => void
}

export default function MobilePanel({ activePanel, setActivePanel }: MobilePanelProps) {
  if (!activePanel) return null

  return (
    <div className="h-80 border-t-2 border-black bg-white">
      <div className="h-full overflow-y-auto">
        {activePanel === "filters" && <FiltersPanel />}
        {activePanel === "background" && <BackgroundPanel />}
        {activePanel === "border" && <BorderPanel />}
        {activePanel === "styles" && <StylesPanel />}
      </div>
    </div>
  )
}
