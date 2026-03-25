import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  doc, getDoc, setDoc, collection, getDocs, updateDoc, serverTimestamp, increment,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import { badges as badgeDefs } from '../data/lessons'
import { calculateLevel } from '../utils/xp'
import { achievements as achievementDefs } from '../data/achievements'
import { shopItems as shopItemDefs } from '../data/shopItems'

const ProgressContext = createContext(null)

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be inside ProgressProvider')
  return ctx
}

function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getYesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Get the last 7 days as YYYY-MM-DD strings (Mon-Sun aligned to current week)
function getWeekDays() {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0=Sun, 1=Mon...
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7)) // go back to Monday
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
  }
  return days
}

function getCurrentWeekKey() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7))
  return `${monday.getFullYear()}-W${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`
}

function getCurrentMonthKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function ProgressProvider({ children }) {
  const { user, userData, loading: authLoading } = useAuth()
  const [lessonProgress, setLessonProgress] = useState({})
  const [streakData, setStreakData] = useState({ streak: 0, longestStreak: 0, lastActiveDate: '', activeDays: [] })
  const [challengeStats, setChallengeStats] = useState({ played: 0, won: 0, bestScores: {} })
  const [wrongAnswers, setWrongAnswers] = useState([]) // [{lessonId, questionIndex, quizType}]
  const [practiceCountToday, setPracticeCountToday] = useState(0)
  const [coins, setCoins] = useState(0)
  const [userAchievements, setUserAchievements] = useState([])
  const [purchasedItems, setPurchasedItems] = useState([])
  const [equippedItems, setEquippedItems] = useState({}) // { nameColor: 'tema_altin', profileFrame: 'cerceve_altin', specialBadge: ['rozet_ilim'] }
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setLessonProgress({})
      setStreakData({ streak: 0, longestStreak: 0, lastActiveDate: '', activeDays: [] })
      setChallengeStats({ played: 0, won: 0, bestScores: {} })
      setCoins(0)
      setUserAchievements([])
      setPurchasedItems([])
      setEquippedItems({})
      setLoading(false)
      return
    }
    const snap = await getDocs(collection(db, 'progress', user.uid, 'lessons'))
    const prog = {}
    snap.forEach(d => { prog[d.id] = d.data() })
    setLessonProgress(prog)

    // Fetch streak data, challenge stats, coins, achievements, purchases from user document
    const userSnap = await getDoc(doc(db, 'users', user.uid))
    if (userSnap.exists()) {
      const data = userSnap.data()
      setStreakData({
        streak: data.streak || 0,
        longestStreak: data.longestStreak || 0,
        lastActiveDate: data.lastActiveDate || '',
        activeDays: data.activeDays || [],
      })
      setChallengeStats(data.challengeStats || { played: 0, won: 0, bestScores: {} })
      setWrongAnswers(data.wrongAnswers || [])
      setCoins(data.coins || 0)
      setUserAchievements(data.achievements || [])
      setPurchasedItems(data.purchasedItems || [])
      setEquippedItems(data.equippedItems || {})

      // Reset practice count if it's a new day
      const today = getTodayStr()
      if (data.practiceDate === today) {
        setPracticeCountToday(data.practiceCountToday || 0)
      } else {
        setPracticeCountToday(0)
      }

      // Check and reset weekly/monthly XP if needed
      const currentWeek = getCurrentWeekKey()
      const currentMonth = getCurrentMonthKey()
      const updates = {}
      if (data.weeklyXpKey !== currentWeek) {
        updates.weeklyXp = 0
        updates.weeklyXpKey = currentWeek
      }
      if (data.monthlyXpKey !== currentMonth) {
        updates.monthlyXp = 0
        updates.monthlyXpKey = currentMonth
      }
      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, 'users', user.uid), updates)
      }
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    if (!authLoading) fetchProgress()
  }, [authLoading, fetchProgress])

  async function updateLessonProgress(lessonId, data) {
    if (!user) return
    const ref = doc(db, 'progress', user.uid, 'lessons', String(lessonId))
    const existing = lessonProgress[String(lessonId)] || {}
    const merged = { ...existing, ...data }
    await setDoc(ref, merged, { merge: true })
    setLessonProgress(prev => ({ ...prev, [String(lessonId)]: merged }))
  }

  async function addXP(amount) {
    if (!user) return
    const userRef = doc(db, 'users', user.uid)

    const currentWeek = getCurrentWeekKey()
    const currentMonth = getCurrentMonthKey()

    // Read current data to check period keys
    const userSnap = await getDoc(userRef)
    const data = userSnap.exists() ? userSnap.data() : {}

    const updates = {
      xp: increment(amount),
      lastActive: serverTimestamp(),
    }

    // Weekly XP: reset if new week, otherwise increment
    if (data.weeklyXpKey !== currentWeek) {
      updates.weeklyXp = amount
      updates.weeklyXpKey = currentWeek
    } else {
      updates.weeklyXp = increment(amount)
    }

    // Monthly XP: reset if new month, otherwise increment
    if (data.monthlyXpKey !== currentMonth) {
      updates.monthlyXp = amount
      updates.monthlyXpKey = currentMonth
    } else {
      updates.monthlyXp = increment(amount)
    }

    await updateDoc(userRef, updates)
  }

  // ═══════ COINS ═══════

  async function addCoins(amount) {
    if (!user || amount <= 0) return
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { coins: increment(amount) })
    setCoins(prev => prev + amount)
  }

  async function spendCoins(amount) {
    if (!user || amount <= 0) return false
    if (coins < amount) return false
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { coins: increment(-amount) })
    setCoins(prev => prev - amount)
    return true
  }

  // ═══════ ACHIEVEMENTS ═══════

  async function unlockAchievement(achievementId) {
    if (!user) return null
    // Already earned?
    if (userAchievements.some(a => a.id === achievementId)) return null

    const achievementDef = achievementDefs.find(a => a.id === achievementId)
    if (!achievementDef) return null

    const earned = {
      id: achievementId,
      earnedAt: new Date().toISOString(),
    }

    const newAchievements = [...userAchievements, earned]
    const userRef = doc(db, 'users', user.uid)

    // Award coins and XP from achievement reward
    const updates = { achievements: newAchievements }
    if (achievementDef.reward.coins > 0) {
      updates.coins = increment(achievementDef.reward.coins)
      setCoins(prev => prev + achievementDef.reward.coins)
    }
    if (achievementDef.reward.xp > 0) {
      updates.xp = increment(achievementDef.reward.xp)
    }

    await updateDoc(userRef, updates)
    setUserAchievements(newAchievements)

    return achievementDef
  }

  // ═══════ SHOP PURCHASES ═══════

  async function purchaseItem(itemId) {
    if (!user) return false
    // Already owned?
    if (purchasedItems.some(i => i.id === itemId)) return false

    const itemDef = shopItemDefs.find(i => i.id === itemId)
    if (!itemDef) return false
    if (coins < itemDef.price) return false

    const purchased = {
      id: itemId,
      purchasedAt: new Date().toISOString(),
    }

    const newPurchased = [...purchasedItems, purchased]
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      purchasedItems: newPurchased,
      coins: increment(-itemDef.price),
    })

    setPurchasedItems(newPurchased)
    setCoins(prev => prev - itemDef.price)

    // Check for first purchase achievement
    if (newPurchased.length === 1) {
      unlockAchievement('ilk_alisveris')
    }

    return true
  }

  // ═══════ EQUIP / UNEQUIP ═══════

  async function equipItem(itemId) {
    if (!user) return false
    // Must own the item
    if (!purchasedItems.some(i => i.id === itemId)) return false

    const itemDef = shopItemDefs.find(i => i.id === itemId)
    if (!itemDef) return false

    const newEquipped = { ...equippedItems }

    if (itemDef.type === 'specialBadge') {
      // Badges are an array — toggle
      const badges = newEquipped.specialBadge || []
      if (badges.includes(itemId)) {
        newEquipped.specialBadge = badges.filter(b => b !== itemId)
      } else {
        newEquipped.specialBadge = [...badges, itemId]
      }
    } else {
      // nameColor, profileFrame — only one active at a time (toggle off if same)
      if (newEquipped[itemDef.type] === itemId) {
        delete newEquipped[itemDef.type]
      } else {
        newEquipped[itemDef.type] = itemId
      }
    }

    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { equippedItems: newEquipped })
    setEquippedItems(newEquipped)
    return true
  }

  // Record today as active and update streak
  async function recordActivity() {
    if (!user) return
    const today = getTodayStr()
    const yesterday = getYesterdayStr()

    // If already recorded today, skip
    if (streakData.lastActiveDate === today) return

    let newStreak = 1
    if (streakData.lastActiveDate === yesterday) {
      newStreak = (streakData.streak || 0) + 1
    } else if (streakData.lastActiveDate === today) {
      newStreak = streakData.streak || 1
    }
    // else streak resets to 1

    const newLongest = Math.max(newStreak, streakData.longestStreak || 0)

    // Keep activeDays as array of recent dates (last 30 days max)
    const existingDays = streakData.activeDays || []
    const newActiveDays = [...new Set([...existingDays, today])].slice(-30)

    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      streak: newStreak,
      longestStreak: newLongest,
      lastActiveDate: today,
      activeDays: newActiveDays,
      lastActive: serverTimestamp(),
    })

    setStreakData({
      streak: newStreak,
      longestStreak: newLongest,
      lastActiveDate: today,
      activeDays: newActiveDays,
    })

    // Award streak coins (+5 per day when streak > 1)
    if (newStreak > 1) {
      addCoins(5)
    }

    // Check streak achievements
    if (newStreak >= 3) unlockAchievement('uc_gun_seri')
    if (newStreak >= 7) unlockAchievement('seri_avcisi')
    if (newStreak >= 30) unlockAchievement('alevli_seri')

    // Check comeback achievement: streak was reset (was 0 or 1 after loss) and now >=3
    if (streakData.streak === 0 && newStreak >= 3) {
      unlockAchievement('kararli')
    }

    return newStreak
  }

  async function awardBadge(badgeId) {
    if (!user || !userData) return
    if (userData.badges?.includes(badgeId)) return
    const userRef = doc(db, 'users', user.uid)
    const newBadges = [...(userData.badges || []), badgeId]
    await updateDoc(userRef, { badges: newBadges })
    return badgeDefs.find(b => b.id === badgeId)
  }

  async function updateChallengeStats(challengeType, score, won) {
    if (!user) return
    const userRef = doc(db, 'users', user.uid)
    const newStats = { ...challengeStats }
    newStats.played = (newStats.played || 0) + 1
    if (won) newStats.won = (newStats.won || 0) + 1
    if (!newStats.bestScores) newStats.bestScores = {}
    const prev = newStats.bestScores[challengeType] || 0
    if (score > prev) newStats.bestScores[challengeType] = score

    await updateDoc(userRef, { challengeStats: newStats })
    setChallengeStats(newStats)
  }

  // --- Practice Mode: Wrong Answers Tracking ---
  async function recordWrongAnswer(lessonId, questionIndex, quizType = 'post') {
    if (!user) return
    const entry = { lessonId, questionIndex, quizType }
    // Don't add duplicates
    const exists = wrongAnswers.some(
      wa => wa.lessonId === lessonId && wa.questionIndex === questionIndex && wa.quizType === quizType
    )
    if (exists) return
    const updated = [...wrongAnswers, entry]
    setWrongAnswers(updated)
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { wrongAnswers: updated })
  }

  async function recordPracticeWrong(lessonId, questionIndex, quizType = 'post') {
    return recordWrongAnswer(lessonId, questionIndex, quizType)
  }

  async function removePracticeWrong(lessonId, questionIndex, quizType = 'post') {
    if (!user) return
    const updated = wrongAnswers.filter(
      wa => !(wa.lessonId === lessonId && wa.questionIndex === questionIndex && wa.quizType === quizType)
    )
    setWrongAnswers(updated)
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { wrongAnswers: updated })
  }

  async function addPracticeSession() {
    if (!user) return
    const today = getTodayStr()
    const newCount = practiceCountToday + 1
    setPracticeCountToday(newCount)
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, { practiceCountToday: newCount, practiceDate: today })
  }

  function getLessonStatus(lessonId) {
    const p = lessonProgress[String(lessonId)]
    if (!p) return 'not_started'
    if (p.completedAt) return 'completed'
    if (p.postQuizDone) return 'completed'
    if (p.videoDone) return 'post_quiz'
    if (p.preQuizDone) return 'video'
    return 'pre_quiz'
  }

  // ═══════ AUTO-CHECK ACHIEVEMENTS ═══════
  useEffect(() => {
    if (!user || loading) return

    const completed = Object.values(lessonProgress).filter(p => p.completedAt || p.postQuizDone).length
    const xp = userData?.xp || 0

    // Lesson-based achievements
    if (completed >= 1) unlockAchievement('ilk_adim')
    if (completed >= 5) unlockAchievement('bes_ders')
    if (completed >= 10) unlockAchievement('on_ders')
    if (completed >= 20) unlockAchievement('yari_yolda')
    if (completed >= 40) unlockAchievement('mezuniyet')

    // XP-based achievements
    if (xp >= 1000) unlockAchievement('xp_avcisi')
    if (xp >= 3000) unlockAchievement('xp_canavari')

    // Coin-based achievements
    if (coins >= 500) unlockAchievement('altin_koleksiyoncu')

    // Time-based achievements
    const hour = new Date().getHours()
    if (hour < 7 && completed > 0) unlockAchievement('erken_kus')
    if (hour >= 22 && completed > 0) unlockAchievement('gece_kusu')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonProgress, userData?.xp, coins, user, loading])

  const completedCount = Object.values(lessonProgress).filter(p => p.completedAt || p.postQuizDone).length
  const totalXP = userData?.xp || 0
  const isActiveToday = streakData.lastActiveDate === getTodayStr()

  const value = {
    lessonProgress,
    loading: loading || authLoading,
    updateLessonProgress,
    addXP,
    recordActivity,
    awardBadge,
    getLessonStatus,
    completedCount,
    totalXP,
    level: calculateLevel(totalXP),
    fetchProgress,
    streakData,
    isActiveToday,
    getWeekDays,
    getTodayStr,
    challengeStats,
    updateChallengeStats,
    wrongAnswers,
    practiceCountToday,
    recordWrongAnswer,
    recordPracticeWrong,
    removePracticeWrong,
    addPracticeSession,
    // Coins, achievements, shop
    coins,
    addCoins,
    spendCoins,
    userAchievements,
    unlockAchievement,
    purchasedItems,
    purchaseItem,
    equippedItems,
    equipItem,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
