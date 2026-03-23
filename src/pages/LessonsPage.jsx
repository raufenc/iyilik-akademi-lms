import { useState } from 'react'
import { lessons } from '../data/lessons'
import LessonCard from '../components/lesson/LessonCard'

export default function LessonsPage() {
  const [search, setSearch] = useState('')

  const filtered = lessons.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tüm Dersler</h1>
          <p className="text-sm text-text-muted">{lessons.length} ders mevcut</p>
        </div>
        <input
          type="text"
          placeholder="Ders ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">Aramanızla eşleşen ders bulunamadı.</p>
        </div>
      )}
    </div>
  )
}
