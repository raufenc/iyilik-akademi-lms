import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'

export default function LessonCard({ lesson, compact = false }) {
  const { user } = useAuth()
  const { getLessonStatus } = useProgress()
  const status = user ? getLessonStatus(lesson.id) : 'not_started'

  const statusConfig = {
    not_started: { label: 'Başla', ring: 0, color: 'text-text-muted' },
    pre_quiz: { label: 'Devam Et', ring: 25, color: 'text-primary' },
    video: { label: 'Devam Et', ring: 50, color: 'text-primary' },
    interactive: { label: 'Devam Et', ring: 62, color: 'text-primary' },
    post_quiz: { label: 'Devam Et', ring: 75, color: 'text-primary' },
    completed: { label: 'Tamamlandı', ring: 100, color: 'text-secondary' },
  }

  const { label, ring, color } = statusConfig[status] || statusConfig.not_started
  const isCompleted = status === 'completed'
  const isInProgress = ring > 0 && !isCompleted

  if (compact) {
    return (
      <Link to={user ? `/ders/${lesson.id}` : '/giris'} className="no-underline group">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: `${lesson.color}15` }}>
            {lesson.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{lesson.title}</p>
            <p className="text-xs text-text-muted truncate">{lesson.subtitle}</p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={user ? `/ders/${lesson.id}` : '/giris'} className="no-underline group">
      <div className={`relative bg-white dark:bg-dark-card rounded-2xl border ${
        isCompleted ? 'border-secondary/30 bg-secondary/5 dark:bg-secondary/10' :
        isInProgress ? 'border-primary/30 shadow-glow/10' :
        'border-border-light dark:border-dark-border'
      } p-5 hover:-translate-y-1 hover:shadow-medium dark:hover:shadow-dark-medium transition-all duration-300 h-full flex flex-col overflow-hidden`}>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${lesson.color}, ${lesson.color}80)` }} />

        <div className="flex items-start justify-between mb-3 mt-1">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-soft transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${lesson.color}12` }}
          >
            {lesson.icon}
          </div>
          {user && (
            <div className="relative w-11 h-11">
              <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={isCompleted ? '#00B894' : '#6C5CE7'} strokeWidth="2.5" strokeDasharray={`${ring}, 100`} strokeLinecap="round" className="transition-all duration-700" />
              </svg>
              {isCompleted && (
                <span className="absolute inset-0 flex items-center justify-center text-sm">✅</span>
              )}
              {isInProgress && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">{ring}%</span>
              )}
            </div>
          )}
        </div>

        <h3 className="font-heading font-semibold text-text dark:text-dark-text-heading group-hover:text-primary transition-colors mb-1">
          {lesson.title}
        </h3>
        <p className="text-sm text-text-muted dark:text-dark-text-muted flex-1 leading-relaxed">{lesson.subtitle}</p>

        <div className="mt-4 pt-3 border-t border-border-light dark:border-dark-border flex items-center justify-between">
          <span className="text-xs text-text-muted dark:text-dark-text-muted font-medium">Ders {lesson.id}</span>
          <span className={`text-xs font-semibold ${color} flex items-center gap-1`}>
            {isCompleted && '✓ '}{label}
            {!isCompleted && <span className="group-hover:translate-x-0.5 transition-transform">→</span>}
          </span>
        </div>
      </div>
    </Link>
  )
}
