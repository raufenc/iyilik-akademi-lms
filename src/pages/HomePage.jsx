import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { lessons } from '../data/lessons'
import LessonCard from '../components/lesson/LessonCard'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span>🌟</span> 40 Ders &middot; Quizler &middot; Sertifika
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-text leading-tight mb-4">
          <span className="text-primary">İyilik</span> ile dolu bir <br className="hidden md:block" />
          yolculuğa hazır mısın?
        </h1>
        <p className="text-text-light text-lg max-w-xl mx-auto mb-8">
          Doğruluk, saygı, sabır, kardeşlik ve daha birçok güzel değeri interaktif derslerle öğren, quizlerle pekiştir.
        </p>
        <div className="flex items-center justify-center gap-3">
          {user ? (
            <Link to="/panel" className="no-underline">
              <button className="bg-primary text-white px-8 py-3 rounded-xl text-base font-semibold hover:bg-primary-dark transition-colors">
                Derslerime Git
              </button>
            </Link>
          ) : (
            <>
              <Link to="/kayit" className="no-underline">
                <button className="bg-primary text-white px-8 py-3 rounded-xl text-base font-semibold hover:bg-primary-dark transition-colors">
                  Hemen Başla
                </button>
              </Link>
              <Link to="/dersler" className="no-underline">
                <button className="border border-border px-8 py-3 rounded-xl text-base font-medium text-text-light hover:bg-surface-alt transition-colors">
                  Derslere Göz At
                </button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: '📚', value: '40', label: 'Ders' },
          { icon: '❓', value: '240', label: 'Quiz Sorusu' },
          { icon: '🏆', value: '6', label: 'Rozet' },
          { icon: '📜', value: '2', label: 'Sertifika' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
            <p className="text-sm text-text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Featured Lessons */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Öne Çıkan Dersler</h2>
          <Link to="/dersler" className="text-sm text-primary font-medium no-underline hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.slice(0, 6).map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white rounded-2xl border border-border p-8 mb-12">
        <h2 className="text-xl font-bold text-center mb-8">Nasıl Çalışır?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', icon: '📝', title: 'Ön Quiz', desc: 'Konuyla ilgili bilgini test et' },
            { step: '2', icon: '🎬', title: 'Video Ders', desc: 'Konuyu video ile öğren' },
            { step: '3', icon: '🎯', title: 'Son Quiz', desc: 'Öğrendiklerini pekiştir' },
            { step: '4', icon: '⭐', title: 'XP Kazan', desc: 'Rozet ve sertifika kazan' },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl">
                {s.icon}
              </div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
