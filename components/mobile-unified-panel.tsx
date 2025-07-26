"use client"

import { Move, Crop, Settings, Square, Palette, History, Type } from "lucide-react"
import FiltersPanel from "./panels/filters-panel"
import BackgroundPanel from "./panels/background-panel"
import BorderPanel from "./panels/border-panel"
import StylesPanel from "./panels/styles-panel"
import PositionPanel from "./panels/position-panel"

interface MobileUnifiedPanelProps {
  activePanel: string | null
  setActivePanel: (panel: string | null) => void
  positionProps: any
  backgroundProps: any
  filterProps: any
  borderProps: any
}

const tools = [
  { id: "position", icon: Move, label: "Position" },
  { id: "background", icon: Crop, label: "Background" },
  { id: "filters", icon: Settings, label: "Filters" },
  { id: "border", icon: Square, label: "Border" },
  { id: "styles", icon: Palette, label: "Styles" },
  { id: "history", icon: History, label: "History" },
  { id: "text", icon: Type, label: "Text" },
]

export default function MobileUnifiedPanel({
  activePanel,
  setActivePanel,
  positionProps,
  backgroundProps,
  filterProps,
  borderProps,
}: MobileUnifiedPanelProps) {
  return (
    <div className="h-full border-2 border-black rounded-t-xl shadow-[0_-2px_0_rgba(0,0,0,1)] bg-white flex flex-col px-2">
      {/* Tool Icons Row - Compact */}
      <div className="flex-shrink-0 flex justify-center py-2 border-b border-black bg-white">
        <div className="flex items-center gap-1 px-2 py-1 border-2 border-black rounded-lg shadow-[1px_1px_0_rgba(0,0,0,1)] bg-white">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActivePanel(activePanel === tool.id ? null : tool.id)}
              className={`w-8 h-8 rounded-full border border-black flex items-center justify-center transition-all ${
                activePanel === tool.id ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              <tool.icon className="w-3 h-3" />
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {activePanel === "position" && <PositionPanel {...positionProps} />}
        {activePanel === "filters" && <FiltersPanel {...filterProps} />}
        {activePanel === "background" && <BackgroundPanel {...backgroundProps} />}
        {activePanel === "border" && <BorderPanel {...borderProps} />}
        {activePanel === "styles" && <StylesPanel />}
        {activePanel === "history" && (
          <div className="p-3">
            <h3 className="font-bold text-sm mb-1">History</h3>
            <p className="text-gray-600 text-xs">Undo and redo changes.</p>
          </div>
        )}
        {activePanel === "text" && (
          <div className="p-3">
            <h3 className="font-bold text-sm mb-1">Text</h3>
            <p className="text-gray-600 text-xs">Add text overlays.</p>
          </div>
        )}
      </div>
    </div>
  )
}
