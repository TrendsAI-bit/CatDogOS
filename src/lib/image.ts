interface ImageGenerationOptions {
  prompt: string
  style?: 'classic' | 'modern'
}

interface ImageGenerationResponse {
  imageUrl: string
  prompt: string
  error?: string
}

export async function generateImage(options: ImageGenerationOptions): Promise<ImageGenerationResponse> {
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: options.prompt,
        style: options.style || 'classic',
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

// Example prompts for CatDogOS style
export const exampleImagePrompts = [
  "A cat and dog working together on a vintage computer",
  "Classic Macintosh desktop with CatDogOS icons",
  "Retro computer game featuring cat and dog characters",
  "Vintage software box design for CatDogOS",
  "Classic Macintosh window with cat and dog avatars",
  "Retro computer manual illustration",
  "Vintage computer startup screen",
  "Classic Macintosh folder icons with cat and dog themes"
]
