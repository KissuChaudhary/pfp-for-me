"use client"

import { Move, Crop, Settings, Square, Palette, History, Type, Sparkles } from "lucide-react"

interface ToolBarProps {
  activePanel: string | null
  setActivePanel: (panel: string | null) => void
}

const tools = [
  { id: "position", icon: Move, label: "Position" },
  { id: "background", icon: Crop, label: "Background" },
  { id: "filters", icon: Settings, label: "Filters" },
  { id: "border", icon: Square, label: "Border" },
  { id: "pix-art", icon: Sparkles, label: "Pix Art" },
  { id: "styles", icon: Palette, label: "Styles" },
  { id: "history", icon: History, label: "History" },
  { id: "text", icon: Type, label: "Text" },
]

export default function ToolBar({ activePanel, setActivePanel }: ToolBarProps) {
  return (
    <>
      {/* Desktop - Vertical sidebar - Fixed width container */}
      <div className="hidden md:flex w-20 h-full p-2 items-center">
        <div className="flex flex-col gap-2 p-2 border-2 border-black rounded-2xl shadow-[4px_4px_0_rgba(0,0,0,1)] bg-white">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActivePanel(activePanel === tool.id ? null : tool.id)}
              className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center transition-all group relative ${
                activePanel === tool.id ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              <tool.icon className="w-4 h-4" />
              <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {tool.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
