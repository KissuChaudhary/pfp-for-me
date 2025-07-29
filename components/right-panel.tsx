"use client"

import FiltersPanel from "./panels/filters-panel"
import BackgroundPanel from "./panels/background-panel"
import BorderPanel from "./panels/border-panel"
import PixArtPanel from "./panels/pix-art-panel"
import StylesPanel from "./panels/styles-panel"
import PositionPanel from "./panels/position-panel"
import TextPanel from "./panels/text-panel"

interface RightPanelProps {
  activePanel: string | null
  setActivePanel: (panel: string | null) => void
  positionProps: any
  backgroundProps: any
  filterProps: any
  borderProps: any
  pixArtProps: any
  textProps: any
}

export default function RightPanel({
  activePanel,
  setActivePanel,
  positionProps,
  backgroundProps,
  filterProps,
  borderProps,
  pixArtProps,
  textProps,
}: RightPanelProps) {
  if (!activePanel) return null

  return (
    <div className="w-80 h-full p-4 flex flex-col">
      <div className="flex-1 border-2 border-black rounded-2xl shadow-[4px_4px_0_rgba(0,0,0,1)] bg-white overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {activePanel === "position" && <PositionPanel {...positionProps} />}
          {activePanel === "filters" && <FiltersPanel {...filterProps} />}
          {activePanel === "background" && <BackgroundPanel {...backgroundProps} />}
          {activePanel === "border" && <BorderPanel {...borderProps} />}
          {activePanel === "pix-art" && <PixArtPanel {...pixArtProps} />}
          {activePanel === "styles" && <StylesPanel />}
          {activePanel === "text" && <TextPanel {...textProps} />}
        </div>
      </div>
    </div>
  )
}
