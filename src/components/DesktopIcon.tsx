'use client'

import { useState } from 'react'

interface DesktopIconProps {
  id: string
  name: string
  icon: string
  isSelected: boolean
  onSelect: () => void
}

export default function DesktopIcon({ name, icon, isSelected, onSelect }: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true)
      onSelect()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      className={`mac-desktop-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'opacity-75' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-center leading-tight">{name}</div>
    </div>
  )
}
