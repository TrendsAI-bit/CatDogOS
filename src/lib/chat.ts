interface ChatOptions {
  dualReply: boolean
  jesterMode: boolean
}

interface ChatResponse {
  cat: string
  dog: string
}

export async function sendMessage(message: string, options: ChatOptions): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        dualReply: options.dualReply,
        jesterMode: options.jesterMode,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

// Fallback responses for when the API is not available
export function getFallbackResponse(): ChatResponse {
  const fallbackResponses = [
    {
      cat: "I'm having trouble connecting right now. Please try again in a moment.",
      dog: "Looks like the internet cable got chewed up! 🦴"
    },
    {
      cat: "The system is temporarily unavailable. Please check your connection.",
      dog: "The squirrels must have stolen our WiFi! 🐿️"
    },
    {
      cat: "I'm experiencing technical difficulties. Please try again.",
      dog: "Someone spilled coffee on the server! ☕"
    }
  ]

  const randomIndex = Math.floor(Math.random() * fallbackResponses.length)
  return fallbackResponses[randomIndex]
}
