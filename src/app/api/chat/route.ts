import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

export async function POST(request: NextRequest) {
  try {
    const { message, dualReply, jesterMode } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // If no API key is provided, return a mock response
    if (!openai) {
      return NextResponse.json({
        cat: "I'm in demo mode. Add your OpenAI API key to .env.local to enable full functionality.",
        dog: "Demo mode activated! I'm like a dog without a bone - still wagging but not fetching! 🦴"
      })
    }

    // Construct the system prompt based on options
    let systemPrompt = `You are CatDogOS, a dual-persona assistant. Always return JSON with two fields:
{ "cat": "<concise helpful answer in 2–5 sentences>", "dog": "<a witty one-liner or short joke about the same topic>" }.

The cat voice is precise, non-fluffy, and practical.
The dog voice is playful, pun-friendly, but never rude or offensive.

Keep answers safe and family-friendly.`

    if (jesterMode) {
      systemPrompt += `\n\nJESTER MODE: The dog must deliver a joke, pun, dad-joke, or playful roast while the cat stays concise and helpful.`
    }

    if (!dualReply) {
      systemPrompt += `\n\nSINGLE MODE: Only return the cat response. Set dog to empty string.`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse JSON response
    try {
      const parsedResponse = JSON.parse(response)
      return NextResponse.json({
        cat: parsedResponse.cat || "I'm not sure how to respond to that.",
        dog: parsedResponse.dog || ""
      })
    } catch {
      // If JSON parsing fails, create a fallback response
      return NextResponse.json({
        cat: response.substring(0, 200) + "...",
        dog: "Looks like I got a bit tangled in the response! 🐕"
      })
    }

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Return a fallback response
    return NextResponse.json({
      cat: "I'm experiencing technical difficulties. Please try again.",
      dog: "The server seems to be taking a cat nap! 😸"
    })
  }
}
