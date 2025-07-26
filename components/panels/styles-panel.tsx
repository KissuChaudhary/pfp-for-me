"use client"

import { useState } from "react"

const aiStyles = [
  "Adventure Time",
  "American Dragon",
  "Arcane",
  "Attack on Titan",
  "Avatar",
  "Barbie",
  "Bojack",
  "Brooklyn Nine-Nine",
  "Courage",
  "Ed Edd & Eddy",
  "Final Fantasy",
  "Genshin",
  "Gravity Falls",
  "GTA",
  "Harvest Moon",
  "Hey Arnold",
  "Lego",
  "Mario Kart",
  "Minecraft",
  "Naruto",
  "Pixar",
  "Pokemon",
  "Powerpuff",
  "Rick and Morty",
  "Rugrats",
  "Samurai Champloo",
  "Samurai Jack",
  "South Park",
  "Spongebob",
  "Stardew Valley",
  "Studio Ghibli",
  "The Simpsons",
  "Totally Spies",
  "Yu-Gi-Oh!",
]

export default function StylesPanel() {
  const [quality, setQuality] = useState(true)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm">AI Styles</h3>
          <div className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-2 py-0.5 rounded-full flex items-center">
            Pro ✨
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Reimagine yourself into a completely different character using AI.
          <span className="text-blue-500 ml-1 cursor-pointer hover:underline">Learn more</span>
        </p>
      </div>

      {/* Quality Toggle */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-medium">Quality</h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-700">Standard</span>
            <button
              onClick={() => setQuality(!quality)}
              className={`w-10 h-5 rounded-full border-2 border-black transition-colors relative ${
                quality ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white border border-black rounded-full absolute top-0.5 transition-transform ${
                  quality ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="text-xs text-gray-700">Ultra</span>
          </div>
          <span className="text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-0.5 border">10 credits</span>
        </div>
      </div>

      {/* Scrollable Styles Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-5 gap-2">
          {aiStyles.map((style, index) => (
            <button
              key={style}
              className="aspect-square border-2 border-black rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 hover:border-gray-500 transition-all"
            >
              <img
                src={`/placeholder.svg?height=60&width=60&text=${style.slice(0, 2)}`}
                alt={style}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex gap-1">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-xs">
            Generate Style
          </button>
          <button className="w-8 h-8 border-2 border-black rounded-lg bg-gray-50 flex items-center justify-center">
            <span className="text-xs">⌄</span>
          </button>
        </div>
      </div>
    </div>
  )
}
