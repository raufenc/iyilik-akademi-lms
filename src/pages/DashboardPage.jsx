import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import { xpToNextLevel, LEVEL_NAMES } from '../utils/xp'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import LessonCard from '../components/lesson/LessonCard'

export default function DashboardPage() {
  const { userData } = useAuth()
  const { completedCount, totalXP, level, getLessonStatus } = useProgress()
  const { current, needed, progress } = xpToNextLevel(totalXP)

  const inProgressLessons = lessons.filter(l => {
    const s = getLessonStatus(l.id)
    return s !== 'not_started' && s !== 'completed'
  })

  const nextLesson = lessons.find(l => getLessonStatus(l.id) === 'not_started')

  return (
    <div className="animate-fade-in space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Hoş geldin, {userData?.name}!</h1>
        <p className="text-white/80 text-sm">İyilik yolculuğuna devam et.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-text-muted">Tamamlanan</p>
          <p className="text-2xl font-bold text-primary">{completedCount}</p>
          <p className="text-xs text-text-muted">/ 40 ders</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Toplam XP</p>
          <p className="text-2xl font-bold text-accent-dark">{totalXP}</p>
          <p className="text-xs text-text-muted">puan</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Seviye</p>
          <p className="text-2xl font-bold">{level}</p>
          <p className="text-xs text-text-muted">{LEVEL_NAMES[level]}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Rozetler</p>
          <p className="text-2xl font-bold text-secondary">{userData?.badges?.length || 0}</p>
          <p className="text-xs text-text-muted">/ 6 rozet</p>
        </Card>
      </div>

      {/* XP Progress */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Seviye {level} → {level < 7 ? level + 1 : 'MAX'}</p>
          <p className="text-sm text-text-muted">{current} / {needed} XP</p>
        </div>
        <ProgressBar value={progress * 100} max={100} size="lg" />
      </Card>

      {/* In Progress */}
      {inProgressLessons.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Devam Eden Dersler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressLessons.map(l => <LessonCard key={l.id} lesson={l} />)}
          </div>
        </div>
      )}

      {/* Next Lesson */}
      {nextLesson && (
        <div>
          <h2 className="text-lg font-bold mb-3">Sıradaki Ders</h2>
          <div className="max-w-sm">
            <LessonCard lesson={nextLesson} />
          </div>
        </div>
      )}

      {/* Completed All */}
      {completedCount === 40 && (
        <Card className="text-center bg-gradient-to-r from-secondary/10 to-primary/10">
          <span className="text-4xl">🏆</span>
          <h2 className="text-xl font-bold mt-2">Tüm Dersleri Tamamladın!</h2>
          <p className="text-text-muted">Harika bir başarı. Sertifikanı indirebilirsin.</p>
          <Link to="/profil" className="text-primary font-medium no-underline hover:underline text-sm mt-2 inline-block">
            Sertifikalarıma Git →
          </Link>
        </Card>
      )}
    </div>
  )
}
