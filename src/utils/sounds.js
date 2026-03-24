// Web Audio API sound effects - no external files needed
// All sounds generated programmatically with oscillators + gain envelopes

let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playTone(frequency, duration, type = 'sine', volume = 0.3, startTime = 0) {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime)

  // Envelope: quick attack, sustain, quick release
  gain.gain.setValueAtTime(0, ctx.currentTime + startTime)
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + startTime + 0.01)
  gain.gain.setValueAtTime(volume, ctx.currentTime + startTime + duration - 0.02)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + startTime + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime + startTime)
  osc.stop(ctx.currentTime + startTime + duration)
}

// Ascending happy ding: C5 -> E5 -> G5 (each 100ms)
export function playCorrect() {
  playTone(523.25, 0.1, 'sine', 0.25, 0)      // C5
  playTone(659.25, 0.1, 'sine', 0.25, 0.1)     // E5
  playTone(783.99, 0.15, 'sine', 0.3, 0.2)      // G5 (slightly longer)
}

// Descending buzz: E4 -> C4 (150ms each)
export function playWrong() {
  playTone(329.63, 0.15, 'sawtooth', 0.12, 0)   // E4
  playTone(261.63, 0.2, 'sawtooth', 0.1, 0.15)   // C4
}

// Coin collect: high pitch blip
export function playXP() {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(1200, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.08)

  gain.gain.setValueAtTime(0.2, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.15)
}

// Triumphant fanfare: C4 -> E4 -> G4 -> C5 (400ms total)
export function playLevelUp() {
  playTone(261.63, 0.1, 'sine', 0.25, 0)        // C4
  playTone(329.63, 0.1, 'sine', 0.25, 0.1)       // E4
  playTone(392.0, 0.1, 'sine', 0.28, 0.2)        // G4
  playTone(523.25, 0.25, 'sine', 0.3, 0.3)       // C5 (held longer)
}

// Subtle click: very short 5ms blip at 800Hz
export function playClick() {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(800, ctx.currentTime)

  gain.gain.setValueAtTime(0.1, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.03)
}

// Whoosh: noise sweep for streak fire
export function playStreakFire() {
  const ctx = getAudioContext()
  const bufferSize = ctx.sampleRate * 0.3
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Generate white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  // Bandpass filter for whoosh character
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(400, ctx.currentTime)
  filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.15)
  filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3)
  filter.Q.setValueAtTime(2, ctx.currentTime)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  noise.start(ctx.currentTime)
  noise.stop(ctx.currentTime + 0.3)
}

// Storage key
const SOUND_STORAGE_KEY = 'iyilik-sound-enabled'

export function getSoundPreference() {
  const stored = localStorage.getItem(SOUND_STORAGE_KEY)
  if (stored === null) return true // default: enabled
  return stored === 'true'
}

export function setSoundPreference(enabled) {
  localStorage.setItem(SOUND_STORAGE_KEY, String(enabled))
}
