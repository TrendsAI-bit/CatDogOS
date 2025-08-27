# CatDogOS 🐱🐕

A nostalgic two-voice assistant with classic Macintosh System 7/OS 9 aesthetic. Experience the charm of vintage computing with modern AI capabilities.

## Features

- 🎨 **Classic Macintosh UI**: Authentic System 7/OS 9 interface with 1-bit/lo-fi Platinum vibe
- 🐱 **Dual Persona Assistant**: Cat (precise, helpful) and Dog (playful, jokey) responses
- 💬 **Interactive Chat**: Real-time conversation with dual voice responses
- 🎛️ **Customizable Experience**: Toggle between dual/single replies, jester mode, and sound effects
- 🖥️ **Desktop Environment**: Draggable windows, menu bar, and desktop icons
- 🔊 **Classic Sound Effects**: Authentic Macintosh beep sounds
- ⌨️ **Keyboard Shortcuts**: Cmd+K to focus, Enter to send, and more
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional, for full functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TrendsAI-bit/CatDogOS.git
cd CatDogOS
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key (optional):
```bash
# .env.local
OPENAI_API_KEY=your_openai_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Chat Interface

- **Dual Reply**: Toggle to show both Cat and Dog responses
- **Jester Mode**: Forces Dog to deliver jokes while Cat stays helpful
- **Safe Beep**: Plays classic Mac beep on message receive
- **Mute**: Toggle sound effects on/off

### Keyboard Shortcuts

- `Cmd/Ctrl + K`: Focus chat input
- `Enter`: Send message
- `Shift + Enter`: New line in input
- `Esc`: Close windows
- `Cmd/Ctrl + M`: Minimize window
- `Cmd/Ctrl + W`: Close window

### Menu System

- **Apple Menu**: About CatDogOS, system preferences
- **CatDogOS Menu**: Application-specific options
- **File Menu**: New chat, export transcript
- **Edit Menu**: Copy, paste, select all
- **View Menu**: Toolbar, zoom options
- **Help Menu**: Keyboard shortcuts, help

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS with custom Macintosh styles
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Next.js
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    # Chat API endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── AboutWindow.tsx      # About dialog
│   ├── ChatPane.tsx         # Chat interface
│   ├── ChatWindow.tsx       # Main window
│   ├── DesktopIcon.tsx      # Desktop icons
│   ├── MenuBar.tsx          # Menu bar
│   ├── ShortcutsWindow.tsx  # Shortcuts dialog
│   └── Toggle.tsx           # Toggle switches
└── lib/
    ├── chat.ts              # Chat utilities
    └── sound.ts             # Sound effects
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main branch
3. Add environment variables in Vercel dashboard

### Manual Deployment

```bash
npm run build
npm run deploy
```

## Environment Variables

Create a `.env.local` file with:

```bash
# OpenAI API Key (optional - app works in demo mode without it)
OPENAI_API_KEY=your_openai_api_key_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Susan Kare for the original Macintosh design inspiration
- Apple for the classic Macintosh System 7/OS 9 aesthetic
- The React and Next.js communities
- OpenAI for the AI capabilities

---

**Made with a bark & a meow** 🐕🐱

© CatDogOS — Two minds. One desktop.
