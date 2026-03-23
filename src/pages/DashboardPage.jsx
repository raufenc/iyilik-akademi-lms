import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import { richContent } from '../data/richContent'
import { xpToNextLevel, LEVEL_NAMES } from '../utils/xp'
import { getDailyQuote } from '../data/dailyQuotes'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import LessonCard from '../components/lesson/LessonCard'

const enrichedLessons = lessons.map(l => ({ ...l, ...(richContent[l.id] || {}) }))

export default function DashboardPage() {
  const navigate = useNavigate()
  const { userData } = useAuth()
  const { completedCount, totalXP, level, getLessonStatus } = useProgress()
  const { current, needed, progress } = xpToNextLevel(totalXP)
  const quote = getDailyQuote()

  // Animated counters
  const [animXP, setAnimXP] = useState(0)
  const [animLessons, setAnimLessons] = useState(0)

  useEffect(() => {
    const duration = 1200
    const steps = 30
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const p = step / steps
      const ease = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setAnimXP(Math.round(totalXP * ease))
      setAnimLessons(Math.round(completedCount * ease))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [totalXP, completedCount])

  const inProgressLessons = enrichedLessons.filter(l => {
    const s = getLessonStatus(l.id)
    return s !== 'not_started' && s !== 'completed'
  })

  const nextLesson = enrichedLessons.find(l => getLessonStatus(l.id) === 'not_started')

  return (
    <div className="animate-fade-in space-y-6">
      {/* Welcome + Daily Quote */}
      <div className="bg-gradient-hero rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-lg" />

        <div className="relative">
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">
            Merhaba, {userData?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-white/70 text-sm mb-4">İyilik yolculuğuna devam et.</p>

          {/* Daily Quote */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <p className="text-xs text-white/60 mb-1">📜 Günün Sözü</p>
            <p className="text-sm italic leading-relaxed">"{quote.metin}"</p>
            <p className="text-xs text-white/50 mt-1">— {quote.kaynak}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        <Card hover className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">📚</div>
          <p className="text-3xl font-heading font-bold text-primary">{animLessons}</p>
          <p className="text-xs text-text-muted mt-1">/ 40 Ders</p>
        </Card>
        <Card hover className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-accent/20 flex items-center justify-center text-2xl">⚡</div>
          <p className="text-3xl font-heading font-bold text-accent-dark">{animXP}</p>
          <p className="text-xs text-text-muted mt-1">Toplam XP</p>
        </Card>
        <Card hover className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-secondary/10 flex items-center justify-center text-2xl">🎖️</div>
          <p className="text-3xl font-heading font-bold text-secondary">Lv.{level}</p>
          <p className="text-xs text-text-muted mt-1">{LEVEL_NAMES[level]}</p>
        </Card>
        <Card hover className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-danger/10 flex items-center justify-center text-2xl">🏅</div>
          <p className="text-3xl font-heading font-bold text-danger">{userData?.badges?.length || 0}</p>
          <p className="text-xs text-text-muted mt-1">/ 6 Rozet</p>
        </Card>
      </div>

      {/* XP Progress */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <p className="text-sm font-heading font-semibold">
              Seviye {level} → {level < 7 ? level + 1 : 'MAX'}
            </p>
          </div>
          <span className="text-sm font-medium text-primary">{current} / {needed} XP</span>
        </div>
        <div className="h-3 bg-surface-alt rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      </Card>

      {/* Next Lesson — Big CTA */}
      {nextLesson && (
        <Card
          hover
          className="relative overflow-hidden cursor-pointer border-2 border-primary/20"
          onClick={() => navigate(`/ders/${nextLesson.id}`)}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-soft shrink-0"
              style={{ backgroundColor: `${nextLesson.color}15` }}
            >
              {nextLesson.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-muted mb-0.5">Sıradaki Ders</p>
              <h3 className="font-heading font-bold text-lg truncate">{nextLesson.title}</h3>
              <p className="text-sm text-text-light truncate">{nextLesson.subtitle}</p>
            </div>
            <Button size="md">Başla →</Button>
          </div>
        </Card>
      )}

      {/* In Progress */}
      {inProgressLessons.length > 0 && (
        <div>
          <h2 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
            <span>📖</span> Devam Eden Dersler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {inProgressLessons.map(l => <LessonCard key={l.id} lesson={l} />)}
          </div>
        </div>
      )}

      {/* Badges Showcase */}
      {userData?.badges?.length > 0 && (
        <div>
          <h2 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
            <span>🏆</span> Kazanılan Rozetler
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {userData.badges.map((b, i) => (
              <div key={i} className="shrink-0 w-20 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center text-3xl shadow-soft animate-bounce-in">
                  {b.icon || '🏅'}
                </div>
                <p className="text-xs font-medium mt-1.5 truncate">{b.name || b.id}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed All */}
      {completedCount === 40 && (
        <Card className="text-center bg-gradient-to-r from-secondary/10 to-primary/10 border-2 border-secondary/30">
          <span className="text-5xl block mb-3">🏆</span>
          <h2 className="font-heading text-2xl font-bold">Tüm Dersleri Tamamladın!</h2>
          <p className="text-text-muted mt-1 mb-4">Harika bir başarı. Sertifikanı indirebilirsin.</p>
          <Button onClick={() => navigate('/profil')}>
            Sertifikalarıma Git →
          </Button>
        </Card>
      )}
    </div>
  )
}
