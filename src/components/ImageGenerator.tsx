'use client'

import { useState } from 'react'
import { Image, Download, RefreshCw } from 'lucide-react'
import { generateImage, exampleImagePrompts } from '@/lib/image'

interface ImageGeneratorProps {
  onClose: () => void
}

export default function ImageGenerator({ onClose }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState<'classic' | 'modern'>('classic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const result = await generateImage({ prompt: prompt.trim(), style })
      setGeneratedImage(result.imageUrl)
    } catch (err) {
      setError('Failed to generate image. Please try again.')
      console.error('Image generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!generatedImage) return

    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `catdogos-image-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="mac-window" style={{ width: '600px', maxWidth: '90vw', maxHeight: '90vh' }}>
        <div className="mac-window-titlebar">
          <div className="flex items-center space-x-2">
            <Image size={16} />
            <span>CatDogOS Image Generator</span>
          </div>
          <div className="mac-window-controls">
            <button
              className="mac-window-control close"
              onClick={onClose}
              title="Close"
            />
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image Prompt:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full mac-input resize-none"
              rows={3}
              disabled={isGenerating}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Style:</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="style"
                  value="classic"
                  checked={style === 'classic'}
                  onChange={(e) => setStyle(e.target.value as 'classic' | 'modern')}
                  disabled={isGenerating}
                />
                <span className="text-sm">Classic (1-bit/lo-fi)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="style"
                  value="modern"
                  checked={style === 'modern'}
                  onChange={(e) => setStyle(e.target.value as 'classic' | 'modern')}
                  disabled={isGenerating}
                />
                <span className="text-sm">Modern</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="mac-button flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Image size={14} />
                  <span>Generate Image</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 text-red-700">
              {error}
            </div>
          )}

          {generatedImage && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold">Generated Image:</h3>
                <button
                  onClick={handleDownload}
                  className="mac-button flex items-center space-x-1"
                >
                  <Download size={12} />
                  <span>Download</span>
                </button>
              </div>
              <div className="border-2 border-black p-2 bg-white">
                <img
                  src={generatedImage}
                  alt="Generated CatDogOS style image"
                  className="w-full h-auto"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold mb-2">Example Prompts:</h3>
            <div className="grid grid-cols-1 gap-2">
              {exampleImagePrompts.map((examplePrompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(examplePrompt)}
                  className="text-left text-xs p-2 hover:bg-gray-200 border border-gray-300"
                  disabled={isGenerating}
                >
                  {examplePrompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
