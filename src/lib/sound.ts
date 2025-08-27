let audioContext: AudioContext | null = null

export function playBeep() {
  try {
    // Create audio context if it doesn't exist
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }

    // Create oscillator for the beep sound
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    // Connect nodes
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Configure the beep sound (classic Mac beep)
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // 800 Hz
    oscillator.type = 'sine'

    // Configure volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    // Start and stop the beep
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)

  } catch (error) {
    console.warn('Could not play beep sound:', error)
  }
}

export function stopBeep() {
  if (audioContext) {
    audioContext.close()
    audioContext = null
  }
}
