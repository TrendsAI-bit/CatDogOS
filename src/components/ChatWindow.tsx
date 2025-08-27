'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import ChatPane from './ChatPane'
import Toggle from './Toggle'

export default function ChatWindow() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [dualReply, setDualReply] = useState(true)
  const [jesterMode, setJesterMode] = useState(false)
  const [safeBeep, setSafeBeep] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('mac-window-titlebar')) {
      setIsDragging(true)
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  if (isMinimized) {
    return (
      <div 
        className="absolute bottom-4 left-4 mac-window cursor-pointer"
        onClick={() => setIsMinimized(false)}
        style={{ width: '200px', height: '40px' }}
      >
        <div className="mac-window-titlebar">
          <div className="flex items-center space-x-2">
            <img src="/logo-catdogos.png" alt="CatDogOS" className="w-4 h-4" />
            <span>CatDogOS — Chat</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={windowRef}
      className="mac-window"
      style={{
        width: isMaximized ? '90vw' : '800px',
        height: isMaximized ? '80vh' : '600px',
        position: isMaximized ? 'fixed' : 'absolute',
        top: isMaximized ? '10vh' : `${position.y}px`,
        left: isMaximized ? '5vw' : `${position.x}px`,
        zIndex: 10
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div className="mac-window-titlebar">
        <div className="flex items-center space-x-2">
          <img src="/logo-catdogos.png" alt="CatDogOS" className="w-4 h-4" />
          <span>CatDogOS — Chat</span>
          <span className="text-xs opacity-75">Two minds. One desktop.</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Toggles */}
          <div className="flex items-center space-x-2">
            <span className="text-xs">Dual Reply:</span>
            <Toggle active={dualReply} onChange={setDualReply} />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs">Jester Mode:</span>
            <Toggle active={jesterMode} onChange={setJesterMode} />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs">Safe Beep:</span>
            <Toggle active={safeBeep} onChange={setSafeBeep} />
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:bg-gray-300"
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
          
          {/* Window Controls */}
          <div className="mac-window-controls">
            <button
              className="mac-window-control close"
              onClick={() => setIsMinimized(true)}
              title="Minimize"
            />
            <button
              className="mac-window-control minimize"
              onClick={() => setIsMaximized(!isMaximized)}
              title="Maximize"
            />
            <button
              className="mac-window-control maximize"
              onClick={() => window.close()}
              title="Close"
            />
          </div>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 h-full">
        <ChatPane 
          dualReply={dualReply}
          jesterMode={jesterMode}
          safeBeep={safeBeep}
          isMuted={isMuted}
        />
      </div>
    </div>
  )
}
