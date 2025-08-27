'use client'



interface ShortcutsWindowProps {
  onClose: () => void
}

export default function ShortcutsWindow({ onClose }: ShortcutsWindowProps) {
  const shortcuts = [
    { key: '⌘K', description: 'Focus chat input' },
    { key: 'Enter', description: 'Send message' },
    { key: 'Shift+Enter', description: 'New line in input' },
    { key: 'Esc', description: 'Close windows' },
    { key: '⌘M', description: 'Minimize window' },
    { key: '⌘W', description: 'Close window' },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="mac-window" style={{ width: '400px', maxWidth: '90vw' }}>
        <div className="mac-window-titlebar">
          <div className="flex items-center space-x-2">
            <span>Keyboard Shortcuts</span>
          </div>
          <div className="mac-window-controls">
            <button
              className="mac-window-control close"
              onClick={onClose}
              title="Close"
            />
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Keyboard Shortcuts</h2>
          
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{shortcut.description}</span>
                <kbd className="bg-gray-200 border border-gray-400 px-2 py-1 text-xs font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-xs text-gray-600">
            <p>Tip: Use the toggles in the title bar to customize your experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
