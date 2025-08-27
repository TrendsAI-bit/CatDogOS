'use client'

interface AboutWindowProps {
  onClose: () => void
}

export default function AboutWindow({ onClose }: AboutWindowProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="mac-window" style={{ width: '400px', maxWidth: '90vw' }}>
        <div className="mac-window-titlebar">
          <div className="flex items-center space-x-2">
            <img src="/logo-catdogos.png" alt="CatDogOS" className="w-4 h-4" />
            <span>About CatDogOS</span>
          </div>
          <div className="mac-window-controls">
            <button
              className="mac-window-control close"
              onClick={onClose}
              title="Close"
            />
          </div>
        </div>
        
        <div className="p-6 text-center">
          <img src="/logo-catdogos.png" alt="CatDogOS" className="w-24 h-24 mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">CatDogOS</h2>
          <p className="text-sm mb-4">Version 1.0.0</p>
          
          <div className="text-left text-sm space-y-2 mb-4">
            <p>CatDogOS is a nostalgic two-voice assistant.</p>
            <p><strong>Cat</strong> = clarity. Precise, helpful, and to the point.</p>
            <p><strong>Dog</strong> = comedy. Playful, pun-friendly, and entertaining.</p>
          </div>
          
          <div className="text-xs text-gray-600">
            <p>© 2024 CatDogOS</p>
            <p>Made with a bark & a meow</p>
          </div>
        </div>
      </div>
    </div>
  )
}
