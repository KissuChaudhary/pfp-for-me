import { LogIn } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-lg">Profile Picture AI</span>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl shadow-[2px_2px_0_rgba(0,0,0,1)] bg-white hover:shadow-[1px_1px_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
          <LogIn className="w-4 h-4" />
          <span className="font-semibold">Login</span>
        </button>
      </div>
    </header>
  )
}
