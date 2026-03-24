import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'
import { LEVEL_NAMES } from '../../utils/xp'
import Button from '../ui/Button'

// Milestone definitions
const MILESTONES = {
  // Lesson count milestones
  lessons_10: {
    id: 'lessons_10',
    type: 'lessons',
    threshold: 10,
    emoji: '⭐',
    title: '10 Ders Tamamlandi!',
    subtitle: 'Harika gidiyorsun! Temelleri saglamca attin.',
    gradient: 'from-amber-400 via-yellow-300 to-orange-400',
    particleType: 'stars',
  },
  lessons_20: {
    id: 'lessons_20',
    type: 'lessons',
    threshold: 20,
    emoji: '🏆',
    title: 'Yarisini Gectin!',
    subtitle: '20/40 Ders tamamlandi. Yolun yarisini astin!',
    gradient: 'from-purple-500 via-primary to-blue-500',
    particleType: 'confetti',
  },
  lessons_30: {
    id: 'lessons_30',
    type: 'lessons',
    threshold: 30,
    emoji: '🔥',
    title: 'Son 10 Ders!',
    subtitle: 'Bitise az kaldi, durmak yok!',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    particleType: 'confetti',
  },
  lessons_40: {
    id: 'lessons_40',
    type: 'lessons',
    threshold: 40,
    emoji: '🎓',
    title: 'MEZUNIYET!',
    subtitle: 'Tum Dersleri Tamamladin! Muhtesem bir basari!',
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    particleType: 'fireworks',
    isSpecial: true,
  },
  // Streak milestones
  streak_7: {
    id: 'streak_7',
    type: 'streak',
    threshold: 7,
    emoji: '🔥',
    title: '7 Gun Serisi!',
    subtitle: 'Tam bir hafta boyunca her gun calistin!',
    gradient: 'from-orange-400 via-red-400 to-pink-400',
    particleType: 'stars',
  },
  streak_14: {
    id: 'streak_14',
    type: 'streak',
    threshold: 14,
    emoji: '💪',
    title: '14 Gun Serisi!',
    subtitle: 'Iki haftadir durmadan devam ediyorsun!',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    particleType: 'confetti',
  },
  streak_30: {
    id: 'streak_30',
    type: 'streak',
    threshold: 30,
    emoji: '👑',
    title: '30 Gun Serisi!',
    subtitle: 'Bir ay boyunca her gun! Efsane!',
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    particleType: 'fireworks',
  },
  // Perfect quiz
  perfect_quiz: {
    id: 'perfect_quiz',
    type: 'quiz',
    emoji: '💯',
    title: 'Mukemmel!',
    subtitle: 'Ilk Tam Puan! Harika bir basari!',
    gradient: 'from-emerald-400 via-green-400 to-teal-400',
    particleType: 'stars',
  },
}

// Level up milestone generator
function getLevelUpMilestone(level) {
  return {
    id: `level_${level}`,
    type: 'level',
    emoji: '🎉',
    title: `Seviye ${level}'e Yukseldin!`,
    subtitle: `Yeni seviye: ${LEVEL_NAMES[level] || 'Bilinmiyor'}`,
    gradient: 'from-primary via-purple-400 to-primary-light',
    particleType: 'confetti',
  }
}

// Particle components
function ConfettiParticles({ count = 50 }) {
  const colors = ['#6C5CE7', '#00B894', '#FDCB6E', '#E17055', '#A29BFE', '#55EFC4', '#FF6B6B', '#48DBFB']
  const particles = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 2
    const duration = 2 + Math.random() * 3
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = 6 + Math.random() * 8
    const rotation = Math.random() * 360
    return (
      <div
        key={i}
        className="absolute animate-milestone-confetti"
        style={{
          left: `${left}%`,
          top: '-10px',
          width: `${size}px`,
          height: `${size * 0.6}px`,
          backgroundColor: color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    )
  })
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>
}

function StarParticles({ count = 30 }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 2
    const duration = 1.5 + Math.random() * 2
    const size = 12 + Math.random() * 16
    return (
      <div
        key={i}
        className="absolute animate-milestone-star"
        style={{
          left: `${left}%`,
          top: `${20 + Math.random() * 60}%`,
          fontSize: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      >
        ⭐
      </div>
    )
  })
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>
}

function FireworkParticles({ count = 40 }) {
  const colors = ['#FFD700', '#FF6347', '#6C5CE7', '#00B894', '#FF69B4', '#48DBFB', '#FDCB6E']

  // Create 3 burst centers
  const bursts = [
    { cx: 25, cy: 30 },
    { cx: 50, cy: 20 },
    { cx: 75, cy: 35 },
  ]

  const particles = bursts.flatMap((burst, bi) =>
    Array.from({ length: Math.floor(count / 3) }, (_, i) => {
      const angle = (i / (count / 3)) * 360
      const distance = 80 + Math.random() * 120
      const dx = Math.cos((angle * Math.PI) / 180) * distance
      const dy = Math.sin((angle * Math.PI) / 180) * distance
      const delay = bi * 0.6 + Math.random() * 0.3
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = 4 + Math.random() * 4
      return (
        <div
          key={`${bi}-${i}`}
          className="absolute rounded-full animate-milestone-firework"
          style={{
            left: `${burst.cx}%`,
            top: `${burst.cy}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 2}px ${color}`,
            animationDelay: `${delay}s`,
            '--fw-dx': `${dx}px`,
            '--fw-dy': `${dy}px`,
          }}
        />
      )
    })
  )
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>
}

function Particles({ type, isSpecial }) {
  switch (type) {
    case 'confetti':
      return <ConfettiParticles count={isSpecial ? 80 : 50} />
    case 'stars':
      return <StarParticles count={isSpecial ? 50 : 30} />
    case 'fireworks':
      return <FireworkParticles count={isSpecial ? 60 : 40} />
    default:
      return <ConfettiParticles />
  }
}

export default function MilestoneCelebration({ newLessonCount, newStreak, newLevel, oldLevel, quizScore, quizTotal, onDismiss }) {
  const { user } = useAuth()
  const [activeMilestone, setActiveMilestone] = useState(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const autoDismissRef = useRef(null)
  const checkedRef = useRef(false)

  const checkMilestones = useCallback(async () => {
    if (!user || checkedRef.current) return
    checkedRef.current = true

    // Get already shown milestones from Firestore
    let shownMilestones = []
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        shownMilestones = userDoc.data().shownMilestones || []
      }
    } catch (e) {
      console.error('Failed to fetch shown milestones:', e)
    }

    // Check each milestone type and find the first unshown one
    let milestone = null

    // Level up check
    if (newLevel && oldLevel && newLevel > oldLevel && !shownMilestones.includes(`level_${newLevel}`)) {
      milestone = getLevelUpMilestone(newLevel)
    }

    // Graduation (40 lessons) — highest priority
    if (!milestone && newLessonCount === 40 && !shownMilestones.includes('lessons_40')) {
      milestone = MILESTONES.lessons_40
    }

    // Lesson milestones
    if (!milestone) {
      for (const key of ['lessons_30', 'lessons_20', 'lessons_10']) {
        const m = MILESTONES[key]
        if (newLessonCount >= m.threshold && !shownMilestones.includes(m.id)) {
          milestone = m
          break
        }
      }
    }

    // Streak milestones
    if (!milestone && newStreak) {
      for (const key of ['streak_30', 'streak_14', 'streak_7']) {
        const m = MILESTONES[key]
        if (newStreak >= m.threshold && !shownMilestones.includes(m.id)) {
          milestone = m
          break
        }
      }
    }

    // Perfect quiz
    if (!milestone && quizScore !== undefined && quizTotal !== undefined && quizScore === quizTotal && !shownMilestones.includes('perfect_quiz')) {
      milestone = MILESTONES.perfect_quiz
    }

    if (milestone) {
      setActiveMilestone(milestone)
      setVisible(true)

      // Save to Firestore
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          shownMilestones: arrayUnion(milestone.id),
        })
      } catch (e) {
        console.error('Failed to save milestone:', e)
      }

      // Auto dismiss after 8 seconds
      autoDismissRef.current = setTimeout(() => {
        handleDismiss()
      }, 8000)
    }
  }, [user, newLessonCount, newStreak, newLevel, oldLevel, quizScore, quizTotal])

  useEffect(() => {
    checkMilestones()
    return () => {
      if (autoDismissRef.current) clearTimeout(autoDismissRef.current)
    }
  }, [checkMilestones])

  function handleDismiss() {
    if (autoDismissRef.current) clearTimeout(autoDismissRef.current)
    setVisible(false)
    setTimeout(() => {
      setDismissed(true)
      onDismiss?.()
    }, 400)
  }

  if (!activeMilestone || dismissed) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleDismiss}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-b ${activeMilestone.gradient} transition-opacity duration-500 ${visible ? 'opacity-90' : 'opacity-0'}`} />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

      {/* Particles */}
      {visible && <Particles type={activeMilestone.particleType} isSpecial={activeMilestone.isSpecial} />}

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 max-w-md transition-all duration-700 ${
          visible ? 'scale-100 translate-y-0 opacity-100' : 'scale-75 translate-y-8 opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Animated emoji */}
        <div className={`text-8xl mb-6 ${activeMilestone.isSpecial ? 'animate-milestone-bounce-special' : 'animate-milestone-bounce'}`}>
          {activeMilestone.emoji}
        </div>

        {/* Glow ring behind emoji */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-white/20 blur-3xl animate-pulse" />

        {/* Title */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg animate-milestone-title">
          {activeMilestone.title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-lg md:text-xl mb-8 drop-shadow animate-milestone-subtitle">
          {activeMilestone.subtitle}
        </p>

        {/* Level badge for level up */}
        {activeMilestone.type === 'level' && newLevel && (
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 mb-6 border border-white/30 animate-milestone-badge">
            <span className="text-3xl">🎖️</span>
            <div className="text-left">
              <p className="text-white/70 text-xs">Yeni Seviye</p>
              <p className="text-white font-bold text-lg">{LEVEL_NAMES[newLevel]}</p>
            </div>
          </div>
        )}

        {/* Graduation badge */}
        {activeMilestone.isSpecial && (
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 mb-6 border border-white/30 animate-milestone-badge">
            <span className="text-3xl">🏅</span>
            <div className="text-left">
              <p className="text-white/70 text-xs">Basari</p>
              <p className="text-white font-bold text-lg">40/40 Ders Tamamlandi</p>
            </div>
          </div>
        )}

        {/* Dismiss button */}
        <div className="animate-milestone-button">
          <button
            onClick={handleDismiss}
            className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold rounded-xl border border-white/30 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Devam Et →
          </button>
        </div>

        {/* Auto dismiss indicator */}
        <div className="mt-4">
          <div className="h-1 w-32 mx-auto bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white/60 rounded-full animate-milestone-timer" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for checking milestones externally
export function useMilestoneCheck() {
  const { user } = useAuth()

  const checkIfMilestoneReady = useCallback(
    async (lessonCount, streak, level, oldLevel, quizScore, quizTotal) => {
      if (!user) return false

      let shownMilestones = []
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          shownMilestones = userDoc.data().shownMilestones || []
        }
      } catch {
        return false
      }

      // Check level up
      if (level > oldLevel && !shownMilestones.includes(`level_${level}`)) return true

      // Check lesson milestones
      for (const count of [40, 30, 20, 10]) {
        if (lessonCount >= count && !shownMilestones.includes(`lessons_${count}`)) return true
      }

      // Check streak milestones
      if (streak) {
        for (const s of [30, 14, 7]) {
          if (streak >= s && !shownMilestones.includes(`streak_${s}`)) return true
        }
      }

      // Check perfect quiz
      if (quizScore !== undefined && quizScore === quizTotal && !shownMilestones.includes('perfect_quiz')) return true

      return false
    },
    [user]
  )

  return { checkIfMilestoneReady }
}
