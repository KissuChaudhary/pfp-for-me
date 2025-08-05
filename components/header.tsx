"use client"

import { LogIn, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSections, setOpenSections] = useState({
    forWho: true,
    navigation: false,
    packs: false,
    more: false
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border-2 border-black dark-shadow">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg">PFPforME</span>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl dark-shadow bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
            <LogIn className="w-4 h-4" />
            <span className="font-semibold">Login</span>
          </button>
        </div>
      </header>

      {/* Mobile Floating Sticky Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className={`bg-white/95 backdrop-blur-md border-2 border-black rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark-shadow transition-all duration-300 ease-in-out ${isMenuOpen ? 'rounded-lg' : ''}`}>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border-2 border-black dark-shadow">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="font-bold text-base">PFPforME</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border-2 border-black rounded-xl dark-shadow bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                <LogIn className="w-3 h-3" />
                <span className="font-semibold text-sm">Login</span>
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-8 h-8 border-2 border-black rounded-lg dark-shadow bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center"
              >
                {isMenuOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Collapsible Menu */}
          <div className={`overflow-hidden rounded-lg duration-300 ease-in-out ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 pb-4 border-t-2 border-black bg-white/95">
              {/* For Who Section */}
              <div className="mb-4">
                <button 
                  onClick={() => toggleSection('forWho')}
                  className="w-full flex items-center justify-between mb-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-sm text-gray-700">For Who</h3>
                  {openSections.forWho ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections.forWho ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-white border-2 border-black rounded-lg p-3 space-y-2 dark-shadow">
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Teams</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Male</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Female</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Couple</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Cats</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Dogs</div>
                  </div>
                </div>
              </div>

              {/* Navigation Section */}
              <div className="mb-4">
                <button 
                  onClick={() => toggleSection('navigation')}
                  className="w-full flex items-center justify-between p-3 bg-blue-50 border-2 border-black rounded-lg cursor-pointer hover:bg-blue-100 transition-colors dark-shadow"
                >
                  <span className="font-semibold text-sm">Navigation</span>
                  {openSections.navigation ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections.navigation ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-white border-2 border-black rounded-lg p-3 space-y-2 mt-2 dark-shadow">
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Home</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Gallery</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Settings</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Help</div>
                  </div>
                </div>
              </div>

              {/* Packs Section */}
              <div className="mb-4">
                <button 
                  onClick={() => toggleSection('packs')}
                  className="w-full flex items-center justify-between p-3 bg-blue-50 border-2 border-black rounded-lg cursor-pointer hover:bg-blue-100 transition-colors dark-shadow"
                >
                  <span className="font-semibold text-sm">Packs</span>
                  {openSections.packs ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections.packs ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-white border-2 border-black rounded-lg p-3 mt-2 dark-shadow">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Linkedin</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Realistic</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">CV</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Woman In Business</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Corporate Headshot</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Tinder</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Whatsapp</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Twitter</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Cool</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Youtube</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Fantasy</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Animation</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Background</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Video Games</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Anime</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Discord</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Funny</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Instagram</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">TikTok</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Aesthetic</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Cute</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Wallpaper</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Cartoon</div>
                      <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Manga</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Section */}
              <div className="mb-2">
                <button 
                  onClick={() => toggleSection('more')}
                  className="w-full flex items-center justify-between p-3 bg-blue-50 border-2 border-black rounded-lg cursor-pointer hover:bg-blue-100 transition-colors dark-shadow"
                >
                  <span className="font-semibold text-sm">More</span>
                  {openSections.more ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections.more ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-white border-2 border-black rounded-lg p-3 space-y-2 mt-2 dark-shadow">
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">About</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Contact</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Privacy</div>
                    <div className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">Terms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for mobile to prevent content from being hidden behind fixed header */}
      <div className="md:hidden h-20"></div>
    </>
  )
}
