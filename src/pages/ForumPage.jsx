import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { lessons } from '../data/lessons'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function ForumPage() {
  const { user, userData } = useAuth()
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [threads, setThreads] = useState([])
  const [showNew, setShowNew] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedLesson) fetchThreads()
  }, [selectedLesson])

  async function fetchThreads() {
    setLoading(true)
    const q = query(
      collection(db, 'forum', String(selectedLesson), 'threads'),
      orderBy('createdAt', 'desc')
    )
    const snap = await getDocs(q)
    const list = []
    snap.forEach(d => list.push({ id: d.id, ...d.data() }))
    setThreads(list)
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    await addDoc(collection(db, 'forum', String(selectedLesson), 'threads'), {
      title: title.trim(),
      content: content.trim(),
      authorId: user.uid,
      authorName: userData?.name || 'Anonim',
      createdAt: serverTimestamp(),
      replyCount: 0,
    })
    setTitle('')
    setContent('')
    setShowNew(false)
    fetchThreads()
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Tartışma Forumu</h1>

      {!selectedLesson ? (
        <div>
          <p className="text-text-muted mb-4">Bir ders seçerek tartışmaya katıl:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lessons.map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLesson(l.id)}
                className="text-left p-4 bg-white dark:bg-dark-card rounded-xl border border-border dark:border-dark-border hover:border-primary/40 hover:shadow-sm transition-all dark:text-dark-text"
              >
                <span className="text-xl mr-2">{l.icon}</span>
                <span className="font-medium text-sm">{l.title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedLesson(null)} className="text-sm text-text-muted hover:text-primary mb-4 inline-block">
            ← Tüm Dersler
          </button>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">
              {lessons.find(l => l.id === selectedLesson)?.title}
            </h2>
            <Button onClick={() => setShowNew(!showNew)} size="sm">
              {showNew ? 'İptal' : 'Yeni Konu'}
            </Button>
          </div>

          {showNew && (
            <Card className="mb-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Konu başlığı"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border dark:border-dark-border dark:bg-dark-elevated dark:text-dark-text focus:border-primary outline-none text-sm"
                />
                <textarea
                  placeholder="Mesajınız..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-border dark:border-dark-border dark:bg-dark-elevated dark:text-dark-text focus:border-primary outline-none text-sm resize-none"
                />
                <Button type="submit" size="sm">Gönder</Button>
              </form>
            </Card>
          )}

          {loading ? (
            <p className="text-text-muted text-center py-8">Yükleniyor...</p>
          ) : threads.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-text-muted">Henüz tartışma yok. İlk konuyu sen aç!</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {threads.map(t => (
                <Card key={t.id}>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm text-text-light mt-1">{t.content}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-text-muted">
                    <span>{t.authorName}</span>
                    <span>&middot;</span>
                    <span>{t.createdAt?.toDate?.()?.toLocaleDateString('tr-TR') || ''}</span>
                    <span>&middot;</span>
                    <span>{t.replyCount || 0} yanıt</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
