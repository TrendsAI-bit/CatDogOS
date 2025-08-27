import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CatDogOS — Chat',
  description: 'Two minds. One desktop. A nostalgic two-voice assistant.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
