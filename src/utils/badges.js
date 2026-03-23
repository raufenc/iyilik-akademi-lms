import { badges } from '../data/lessons'

export function checkBadgeEligibility(completedCount, totalXP, currentBadges = []) {
  const newBadges = []
  for (const badge of badges) {
    if (currentBadges.includes(badge.id)) continue
    if (badge.special) continue
    if (badge.lessonsRequired > 0 && completedCount >= badge.lessonsRequired) {
      newBadges.push(badge)
    }
    if (badge.xpRequired > 0 && totalXP >= badge.xpRequired) {
      newBadges.push(badge)
    }
  }
  return newBadges
}
