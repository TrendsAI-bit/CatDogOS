'use client'

import { useState } from 'react'
import MenuBar from '@/components/MenuBar'
import DesktopIcon from '@/components/DesktopIcon'
import ChatWindow from '@/components/ChatWindow'
import AboutWindow from '@/components/AboutWindow'
import ShortcutsWindow from '@/components/ShortcutsWindow'

export default function Home() {
  const [showAbout, setShowAbout] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const desktopIcons = [
    { id: 'finder', name: 'Finder', icon: '📁' },
    { id: 'readme', name: 'ReadMe', icon: '📄' },
    { id: 'trash', name: 'Trash', icon: '🗑️' },
  ]

  return (
    <div className="h-screen w-screen overflow-hidden dither-pattern">
      {/* Menu Bar */}
      <MenuBar 
        onAbout={() => setShowAbout(true)}
        onShortcuts={() => setShowShortcuts(true)}
      />

      {/* Desktop Icons */}
      <div className="p-8 grid grid-cols-6 gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            name={icon.name}
            icon={icon.icon}
            isSelected={selectedIcon === icon.id}
            onSelect={() => setSelectedIcon(icon.id)}
          />
        ))}
      </div>

      {/* Main Chat Window */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ChatWindow />
      </div>

      {/* About Window */}
      {showAbout && (
        <AboutWindow onClose={() => setShowAbout(false)} />
      )}

      {/* Shortcuts Window */}
      {showShortcuts && (
        <ShortcutsWindow onClose={() => setShowShortcuts(false)} />
      )}

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-xs font-mono">
        © CatDogOS — Made with a bark & a meow
      </div>
    </div>
  )
}
