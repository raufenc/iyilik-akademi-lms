import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  doc, getDoc, setDoc, collection, getDocs, updateDoc, serverTimestamp, increment,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import { badges as badgeDefs } from '../data/lessons'
import { calculateLevel } from '../utils/xp'

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

export function ProgressProvider({ children }) {
  const { user, userData, loading: authLoading } = useAuth()
  const [lessonProgress, setLessonProgress] = useState({})
  const [streakData, setStreakData] = useState({ streak: 0, longestStreak: 0, lastActiveDate: '', activeDays: [] })
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!user) { setLessonProgress({}); setStreakData({ streak: 0, longestStreak: 0, lastActiveDate: '', activeDays: [] }); setLoading(false); return }
    const snap = await getDocs(collection(db, 'progress', user.uid, 'lessons'))
    const prog = {}
    snap.forEach(d => { prog[d.id] = d.data() })
    setLessonProgress(prog)

    // Fetch streak data from user document
    const userSnap = await getDoc(doc(db, 'users', user.uid))
    if (userSnap.exists()) {
      const data = userSnap.data()
      setStreakData({
        streak: data.streak || 0,
        longestStreak: data.longestStreak || 0,
        lastActiveDate: data.lastActiveDate || '',
        activeDays: data.activeDays || [],
      })
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
    await updateDoc(userRef, { xp: increment(amount), lastActive: serverTimestamp() })
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

  function getLessonStatus(lessonId) {
    const p = lessonProgress[String(lessonId)]
    if (!p) return 'not_started'
    if (p.completedAt) return 'completed'
    if (p.postQuizDone) return 'completed'
    if (p.videoDone) return 'post_quiz'
    if (p.preQuizDone) return 'video'
    return 'pre_quiz'
  }

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
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
