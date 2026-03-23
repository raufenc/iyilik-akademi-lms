import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'

export default function LessonCard({ lesson }) {
  const { user } = useAuth()
  const { getLessonStatus } = useProgress()
  const status = user ? getLessonStatus(lesson.id) : 'not_started'

  const statusConfig = {
    not_started: { label: 'Başla', ring: 0 },
    pre_quiz: { label: 'Devam Et', ring: 25 },
    video: { label: 'Devam Et', ring: 50 },
    post_quiz: { label: 'Devam Et', ring: 75 },
    completed: { label: 'Tamamlandı', ring: 100 },
  }

  const { label, ring } = statusConfig[status]
  const isCompleted = status === 'completed'

  return (
    <Link
      to={user ? `/ders/${lesson.id}` : '/giris'}
      className="no-underline group"
    >
      <div className={`bg-white rounded-xl border ${isCompleted ? 'border-secondary/40' : 'border-border'} p-5 hover:shadow-md transition-all duration-200 h-full flex flex-col`}>
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${lesson.color}15` }}
          >
            {lesson.icon}
          </div>
          {user && (
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e9ecef"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isCompleted ? '#00B894' : '#6C5CE7'}
                  strokeWidth="3"
                  strokeDasharray={`${ring}, 100`}
                  className="transition-all duration-700"
                />
              </svg>
              {isCompleted && (
                <span className="absolute inset-0 flex items-center justify-center text-sm">✅</span>
              )}
            </div>
          )}
        </div>
        <h3 className="font-semibold text-text group-hover:text-primary transition-colors mb-1">
          {lesson.title}
        </h3>
        <p className="text-sm text-text-muted flex-1">{lesson.subtitle}</p>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-text-muted">Ders {lesson.id}</span>
          <span className={`text-xs font-medium ${isCompleted ? 'text-secondary' : 'text-primary'}`}>
            {label} →
          </span>
        </div>
      </div>
    </Link>
  )
}
