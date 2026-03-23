export const XP_PER_LESSON = 100
export const XP_FINAL_LESSON = 150

export function calculateLevel(xp) {
  if (xp < 200) return 1
  if (xp < 500) return 2
  if (xp < 1000) return 3
  if (xp < 1800) return 4
  if (xp < 2800) return 5
  if (xp < 4000) return 6
  return 7
}

export function xpForLevel(level) {
  const thresholds = [0, 200, 500, 1000, 1800, 2800, 4000]
  return thresholds[level - 1] || 4000
}

export function xpToNextLevel(xp) {
  const level = calculateLevel(xp)
  if (level >= 7) return { current: xp, needed: 4000, progress: 1 }
  const currentThreshold = xpForLevel(level)
  const nextThreshold = xpForLevel(level + 1)
  return {
    current: xp - currentThreshold,
    needed: nextThreshold - currentThreshold,
    progress: (xp - currentThreshold) / (nextThreshold - currentThreshold),
  }
}

export const LEVEL_NAMES = [
  '', 'Çırak', 'Öğrenci', 'Araştırmacı', 'Bilge', 'Usta', 'Üstad', 'Kemal'
]
