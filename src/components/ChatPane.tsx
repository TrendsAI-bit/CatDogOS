'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { sendMessage } from '@/lib/chat'
import { playBeep } from '@/lib/sound'

interface Message {
  id: string
  user: string
  cat?: string
  dog?: string
  timestamp: Date
}

interface ChatPaneProps {
  dualReply: boolean
  jesterMode: boolean
  safeBeep: boolean
  isMuted: boolean
}

export default function ChatPane({ dualReply, jesterMode, safeBeep, isMuted }: ChatPaneProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const examplePrompts = [
    "What's the weather logic for tomorrow?",
    "Explain bubble sort like I'm five",
    "Tell me a cat-and-dog joke about startups"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      user: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await sendMessage(inputValue.trim(), { dualReply, jesterMode })
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        user: '',
        cat: response.cat,
        dog: response.dog,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      if (safeBeep && !isMuted) {
        playBeep()
      }
    } catch (error) {
      console.error('Chat error:', error)
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        user: '',
        cat: "I hit a snag; try again.",
        dog: "Looks like the kibble got stuck in the bowl! 🐾",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <img src="/logo-catdogos.png" alt="CatDogOS" className="w-16 h-16 mx-auto mb-2" />
              <h3 className="text-lg font-bold mb-2">Welcome to CatDogOS</h3>
              <p className="text-sm text-gray-600 mb-4">Two minds. One desktop.</p>
            </div>
            <div className="text-left max-w-md mx-auto">
              <p className="text-sm font-bold mb-2">Try asking:</p>
              <ul className="text-xs space-y-1">
                {examplePrompts.map((prompt, index) => (
                  <li key={index} className="cursor-pointer hover:bg-gray-200 p-1">
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="chat-message">
                {message.user && (
                  <div className="bg-blue-100 border-2 border-black p-3 mb-2">
                    <div className="chat-message-title">You</div>
                    <div className="chat-message-content">{message.user}</div>
                  </div>
                )}
                
                {message.cat && (
                  <div className="chat-message-cat">
                    <div className="chat-message-title">Cat says</div>
                    <div className="chat-message-content">{message.cat}</div>
                  </div>
                )}
                
                {message.dog && (
                  <div className="chat-message-dog">
                    <div className="chat-message-title">Dog says</div>
                    <div className="chat-message-content">{message.dog}</div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="chat-message">
                <div className="chat-message-cat">
                  <div className="chat-message-title">Cat says</div>
                  <div className="chat-message-content">Thinking...</div>
                </div>
                <div className="chat-message-dog">
                  <div className="chat-message-title">Dog says</div>
                  <div className="chat-message-content">*tail wagging intensifies*</div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Shift+Enter for new line)"
          className="flex-1 mac-input resize-none"
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isLoading}
          className="mac-button flex items-center space-x-1"
        >
          <Send size={14} />
          <span>Speak</span>
        </button>
      </div>
    </div>
  )
}
