// Daily tasks that reset every day
// Each task checks a condition from user's daily activity

export const DAILY_TASKS = [
  {
    id: 'ders_tamamla',
    title: 'Bir Ders Tamamla',
    description: 'Bugün en az 1 ders bitir',
    icon: '📚',
    xpReward: 10,
    checkKey: 'lessonsToday', // how many lessons completed today
    target: 1,
  },
  {
    id: 'quiz_coz',
    title: 'Quiz Çöz',
    description: 'Günlük quiz veya ders quizi çöz',
    icon: '🎯',
    xpReward: 5,
    checkKey: 'quizzesToday',
    target: 1,
  },
  {
    id: 'pratik_yap',
    title: 'Pratik Yap',
    description: 'Tekrar modunda 1 oturum tamamla',
    icon: '🔄',
    xpReward: 5,
    checkKey: 'practiceToday',
    target: 1,
  },
]

export const DAILY_BONUS_COINS = 25 // bonus for completing all 3
export const DAILY_BONUS_XP = 20
