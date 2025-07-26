"use client"

import { Plus, RotateCcw, Download } from "lucide-react"

interface ActionButtonsProps {
  onUploadClick: () => void
  onResetClick: () => void
  onExportClick: () => void
}

export default function ActionButtons({ onUploadClick, onResetClick, onExportClick }: ActionButtonsProps) {
  return (
    <div className="flex justify-center mt-3">
      <div className="flex items-center gap-2 px-3 py-2 border-2 border-black rounded-xl shadow-[2px_2px_0_rgba(0,0,0,1)] bg-white">
        <button
          onClick={onUploadClick}
          className="w-8 h-8 rounded-full border border-black bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
          aria-label="Upload new image"
        >
          <Plus className="w-3 h-3" />
        </button>
        <button
          onClick={onResetClick}
          className="w-8 h-8 rounded-full border border-black bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
          aria-label="Reset all settings"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
        <button
          onClick={onExportClick}
          className="w-8 h-8 rounded-full border border-black bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
          aria-label="Export image"
        >
          <Download className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
