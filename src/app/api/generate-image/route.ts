import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

export async function POST(request: NextRequest) {
  try {
    const { prompt, style = 'classic' } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!openai) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured',
        imageUrl: null 
      })
    }

    // Create a CatDogOS-style prompt
    let enhancedPrompt = prompt
    
    if (style === 'classic') {
      enhancedPrompt = `Create a classic Macintosh System 7/OS 9 style illustration featuring: ${prompt}. 
      Style: 1-bit/lo-fi aesthetic, black and white, pixelated, minimalist, retro computer art style similar to the CatDogOS logo. 
      Use thick black lines, solid shapes, and a nostalgic vintage computing aesthetic.`
    } else if (style === 'modern') {
      enhancedPrompt = `Create a modern interpretation of: ${prompt}. 
      Style: Inspired by the CatDogOS logo but with contemporary design elements, clean lines, and a playful cat-and-dog theme.`
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural",
    })

    const imageUrl = response.data[0]?.url

    if (!imageUrl) {
      throw new Error('No image generated')
    }

    return NextResponse.json({
      imageUrl,
      prompt: enhancedPrompt
    })

  } catch (error) {
    console.error('Image generation error:', error)
    
    return NextResponse.json({
      error: 'Failed to generate image',
      imageUrl: null
    }, { status: 500 })
  }
}
