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

export function ProgressProvider({ children }) {
  const { user, userData, loading: authLoading } = useAuth()
  const [lessonProgress, setLessonProgress] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!user) { setLessonProgress({}); setLoading(false); return }
    const snap = await getDocs(collection(db, 'progress', user.uid, 'lessons'))
    const prog = {}
    snap.forEach(d => { prog[d.id] = d.data() })
    setLessonProgress(prog)
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

  const value = {
    lessonProgress,
    loading: loading || authLoading,
    updateLessonProgress,
    addXP,
    awardBadge,
    getLessonStatus,
    completedCount,
    totalXP,
    level: calculateLevel(totalXP),
    fetchProgress,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
