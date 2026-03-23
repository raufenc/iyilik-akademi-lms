import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import LessonCard from '../components/lesson/LessonCard'
import ProgressBar from '../components/ui/ProgressBar'

export default function LessonsPage() {
  const [search, setSearch] = useState('')
  const { user } = useAuth()
  const { completedCount } = useProgress()

  const filtered = lessons.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  const progressPercent = Math.round((completedCount / lessons.length) * 100)

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold">Tüm Dersler</h1>
            <p className="text-text-muted mt-1">{lessons.length} ders ile güzel ahlak yolculuğu</p>
          </div>
          <div className="relative w-full sm:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
            <input
              type="text"
              placeholder="Ders ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm shadow-soft transition-all"
            />
          </div>
        </div>

        {/* Overall Progress */}
        {user && completedCount > 0 && (
          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-heading font-bold text-lg shadow-glow/30">
                {progressPercent}%
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1.5">Genel İlerleme</p>
              <div className="h-2.5 bg-surface-alt rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-1">{completedCount} / {lessons.length} ders tamamlandı</p>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {filtered.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="font-heading font-semibold text-lg">Sonuç bulunamadı</p>
          <p className="text-text-muted mt-1">Farklı bir arama terimi deneyin.</p>
        </div>
      )}
    </div>
  )
}
