import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import {
  playCorrect,
  playWrong,
  playXP,
  playLevelUp,
  playClick,
  playStreakFire,
  getSoundPreference,
  setSoundPreference,
} from '../utils/sounds'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(getSoundPreference)

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev
      setSoundPreference(next)
      return next
    })
  }, [])

  const setSound = useCallback((enabled) => {
    setSoundEnabled(enabled)
    setSoundPreference(enabled)
  }, [])

  const play = useMemo(() => ({
    correct: () => { if (soundEnabled) playCorrect() },
    wrong: () => { if (soundEnabled) playWrong() },
    xp: () => { if (soundEnabled) playXP() },
    levelUp: () => { if (soundEnabled) playLevelUp() },
    click: () => { if (soundEnabled) playClick() },
    streakFire: () => { if (soundEnabled) playStreakFire() },
  }), [soundEnabled])

  const value = useMemo(() => ({
    soundEnabled,
    toggleSound,
    setSound,
    play,
  }), [soundEnabled, toggleSound, setSound, play])

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return ctx
}

export default SoundContext
