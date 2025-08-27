'use client'

import { useState } from 'react'
import { Apple, FileText, Eye } from 'lucide-react'

interface MenuBarProps {
  onAbout: () => void
  onShortcuts: () => void
}

export default function MenuBar({ onAbout, onShortcuts }: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName)
  }

  const handleMenuBlur = () => {
    setTimeout(() => setActiveMenu(null), 100)
  }

  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-black px-2 py-1 flex items-center justify-between">
      {/* Left side menus */}
      <div className="flex items-center space-x-4">
        {/* Apple Menu */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 px-2 py-1 hover:bg-blue-600 hover:text-white"
            onClick={() => handleMenuClick('apple')}
            onBlur={handleMenuBlur}
          >
            <Apple size={12} />
            <span className="text-xs font-bold">Apple</span>
          </button>
          {activeMenu === 'apple' && (
            <div className="absolute top-full left-0 mac-menu z-50 min-w-48">
              <div className="mac-menu-item" onClick={onAbout}>
                About CatDogOS
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                System Preferences...
              </div>
              <div className="mac-menu-item">
                Recent Items
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Sleep
              </div>
              <div className="mac-menu-item">
                Restart...
              </div>
              <div className="mac-menu-item">
                Shut Down...
              </div>
            </div>
          )}
        </div>

        {/* CatDogOS Menu */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 px-2 py-1 hover:bg-blue-600 hover:text-white"
            onClick={() => handleMenuClick('catdogos')}
            onBlur={handleMenuBlur}
          >
            <span className="text-xs font-bold">CatDogOS</span>
          </button>
          {activeMenu === 'catdogos' && (
            <div className="absolute top-full left-0 mac-menu z-50 min-w-48">
              <div className="mac-menu-item">
                About CatDogOS
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Preferences...
              </div>
              <div className="mac-menu-item">
                Services
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Hide CatDogOS
              </div>
              <div className="mac-menu-item">
                Hide Others
              </div>
              <div className="mac-menu-item">
                Show All
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Quit CatDogOS
              </div>
            </div>
          )}
        </div>

        {/* File Menu */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 px-2 py-1 hover:bg-blue-600 hover:text-white"
            onClick={() => handleMenuClick('file')}
            onBlur={handleMenuBlur}
          >
            <FileText size={12} />
            <span className="text-xs font-bold">File</span>
          </button>
          {activeMenu === 'file' && (
            <div className="absolute top-full left-0 mac-menu z-50 min-w-48">
              <div className="mac-menu-item">
                New Chat
              </div>
              <div className="mac-menu-item">
                Open...
              </div>
              <div className="mac-menu-item">
                Save As...
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Export Transcript...
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Page Setup...
              </div>
              <div className="mac-menu-item">
                Print...
              </div>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 px-2 py-1 hover:bg-blue-600 hover:text-white"
            onClick={() => handleMenuClick('edit')}
            onBlur={handleMenuBlur}
          >
            <span className="text-xs font-bold">Edit</span>
          </button>
          {activeMenu === 'edit' && (
            <div className="absolute top-full left-0 mac-menu z-50 min-w-48">
              <div className="mac-menu-item">
                Undo
              </div>
              <div className="mac-menu-item">
                Redo
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Cut
              </div>
              <div className="mac-menu-item">
                Copy
              </div>
              <div className="mac-menu-item">
                Paste
              </div>
              <div className="mac-menu-item">
                Clear
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Select All
              </div>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 px-2 py-1 hover:bg-blue-600 hover:text-white"
            onClick={() => handleMenuClick('view')}
            onBlur={handleMenuBlur}
          >
            <Eye size={12} />
            <span className="text-xs font-bold">View</span>
          </button>
          {activeMenu === 'view' && (
            <div className="absolute top-full left-0 mac-menu z-50 min-w-48">
              <div className="mac-menu-item">
                Show Toolbar
              </div>
              <div className="mac-menu-item">
                Show Status Bar
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                Zoom In
              </div>
              <div className="mac-menu-item">
                Zoom Out
              </div>
              <div className="mac-menu-item">
                Actual Size
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 px-2 py-1 hover:bg-blue-600 hover:text-white"
            onClick={() => handleMenuClick('help')}
            onBlur={handleMenuBlur}
          >
            <span>?</span>
            <span className="text-xs font-bold">Help</span>
          </button>
          {activeMenu === 'help' && (
            <div className="absolute top-full left-0 mac-menu z-50 min-w-48">
              <div className="mac-menu-item" onClick={onShortcuts}>
                Keyboard Shortcuts
              </div>
              <div className="mac-menu-item">
                CatDogOS Help
              </div>
              <div className="border-t border-black"></div>
              <div className="mac-menu-item">
                About CatDogOS
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - clock */}
      <div className="text-xs font-bold">
        12:00 PM
      </div>
    </div>
  )
}
