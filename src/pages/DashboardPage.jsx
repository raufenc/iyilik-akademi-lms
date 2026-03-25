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
import OnboardingTour from '../components/ui/OnboardingTour'
import { StreakCard } from '../components/gamification/StreakDisplay'
import Icon from '../components/ui/Icon'
import { SkeletonDashboard } from '../components/ui/Skeleton'
import { DAILY_TASKS, DAILY_BONUS_COINS } from '../data/dailyTasks'

const enrichedLessons = lessons.map(l => ({ ...l, ...(richContent[l.id] || {}) }))

export default function DashboardPage() {
  const navigate = useNavigate()
  const { userData, loading: authLoading } = useAuth()
  const { completedCount, totalXP, level, getLessonStatus, dailyProgress, coins, lessonProgress } = useProgress()
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

  // Show skeleton while auth is loading
  if (authLoading) {
    return <SkeletonDashboard />
  }

  return (
    <div className="page-enter space-y-6">
      {/* Onboarding Tour — first login only */}
      <OnboardingTour />

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
          <p className="text-3xl font-heading font-bold text-primary animate-count-up">{animLessons}</p>
          <p className="text-xs text-text-muted mt-1">/ 40 Ders</p>
        </Card>
        <Card hover className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-accent/20 flex items-center justify-center text-2xl">⚡</div>
          <p className="text-3xl font-heading font-bold text-accent-dark animate-count-up">{animXP}</p>
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

      {/* Daily Tasks */}
      <Card className="relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <h3 className="font-heading font-bold text-sm dark:text-dark-text-heading">Günlük Görevler</h3>
          </div>
          {dailyProgress?.bonusClaimed && (
            <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full">
              ✓ Bonus Alındı!
            </span>
          )}
        </div>
        <div className="space-y-3">
          {DAILY_TASKS.map(task => {
            const count = dailyProgress?.[task.checkKey] || 0
            const done = count >= task.target
            return (
              <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${done ? 'bg-secondary/10 dark:bg-secondary/20' : 'bg-surface-alt dark:bg-dark-elevated'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${done ? 'bg-secondary/20' : 'bg-white dark:bg-dark-card'}`}>
                  {done ? '✅' : task.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${done ? 'text-secondary dark:text-secondary-light line-through' : 'dark:text-dark-text'}`}>{task.title}</p>
                  <p className="text-xs text-text-muted dark:text-dark-text-muted">{task.description}</p>
                </div>
                <span className={`text-xs font-bold ${done ? 'text-secondary' : 'text-text-muted dark:text-dark-text-muted'}`}>+{task.xpReward} XP</span>
              </div>
            )
          })}
        </div>
        {/* Bonus indicator */}
        {!dailyProgress?.bonusClaimed && (
          <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              3/3 tamamla → <span className="font-bold">🪙 {DAILY_BONUS_COINS} bonus altın</span> kazan!
            </p>
          </div>
        )}
      </Card>

      {/* Weekly Goal */}
      <Card className="relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h3 className="font-heading font-bold text-sm dark:text-dark-text-heading">Haftalık Hedef</h3>
          </div>
          <span className="text-xs text-text-muted dark:text-dark-text-muted">Bu hafta</span>
        </div>
        {(() => {
          // Calculate lessons completed this week
          const now = new Date()
          const dayOfWeek = now.getDay()
          const monday = new Date(now)
          monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7))
          monday.setHours(0, 0, 0, 0)
          const weeklyCompleted = Object.values(lessonProgress).filter(p => {
            if (!p.completedAt) return false
            return new Date(p.completedAt) >= monday
          }).length
          const weeklyGoal = 3 // default goal
          const pct = Math.min((weeklyCompleted / weeklyGoal) * 100, 100)
          const done = weeklyCompleted >= weeklyGoal
          return (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-3 bg-surface-alt dark:bg-dark-elevated rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${done ? 'bg-secondary' : 'bg-primary'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-sm font-bold ${done ? 'text-secondary' : 'text-primary'}`}>
                  {weeklyCompleted}/{weeklyGoal}
                </span>
              </div>
              <p className="text-xs text-text-muted dark:text-dark-text-muted">
                {done
                  ? '🎉 Tebrikler! Bu haftaki hedefini tamamladın!'
                  : `Bu hafta ${weeklyGoal - weeklyCompleted} ders daha tamamla`
                }
              </p>
            </div>
          )
        })()}
      </Card>

      {/* Streak Card */}
      <StreakCard />

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
        <div className="h-3 bg-surface-alt dark:bg-dark-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      </Card>

      {/* Progress Map Preview + Milestone Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map Preview */}
        <Card
          hover
          className="relative overflow-hidden cursor-pointer"
          onClick={() => navigate('/harita')}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 dark:bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center shrink-0">
              <Icon name="map" size={28} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-sm dark:text-dark-text-heading">İlerleme Haritası</h3>
              <p className="text-xs text-text-muted dark:text-dark-text-muted mt-0.5">Yolculuğunu görsel olarak takip et</p>
              {/* Mini progress dots */}
              <div className="flex gap-0.5 mt-2">
                {Array.from({ length: 40 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      getLessonStatus(i + 1) === 'completed'
                        ? 'bg-secondary'
                        : i + 1 === completedCount + 1
                        ? 'bg-primary animate-pulse'
                        : 'bg-border-light dark:bg-dark-border'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Icon name="arrow-right" size={20} className="text-text-muted dark:text-dark-text-muted shrink-0" />
          </div>
        </Card>

        {/* Milestone Progress */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 dark:bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🏆</span>
              <h3 className="font-heading font-bold text-sm dark:text-dark-text-heading">Kilometre Taşları</h3>
            </div>
            <div className="space-y-2">
              {[
                { threshold: 10, label: '10 Ders', emoji: '⭐' },
                { threshold: 20, label: 'Yarı Yol', emoji: '🏆' },
                { threshold: 30, label: '30 Ders', emoji: '🔥' },
                { threshold: 40, label: 'Mezuniyet', emoji: '🎓' },
              ].map(milestone => {
                const isReached = completedCount >= milestone.threshold
                const progressPct = Math.min((completedCount / milestone.threshold) * 100, 100)
                return (
                  <div key={milestone.threshold} className="flex items-center gap-2">
                    <span className={`text-sm ${isReached ? '' : 'grayscale opacity-50'}`}>{milestone.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-xs font-medium ${isReached ? 'text-secondary dark:text-secondary-light' : 'text-text-muted dark:text-dark-text-muted'}`}>
                          {milestone.label}
                        </span>
                        <span className="text-[10px] text-text-muted dark:text-dark-text-muted">
                          {Math.min(completedCount, milestone.threshold)}/{milestone.threshold}
                        </span>
                      </div>
                      <div className="h-1.5 bg-surface-alt dark:bg-dark-elevated rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isReached ? 'bg-secondary' : 'bg-primary/40'}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                    {isReached && <span className="text-secondary text-xs">✓</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

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
