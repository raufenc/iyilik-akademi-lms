import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons as rawLessons } from '../data/lessons'
import { richContent } from '../data/richContent'
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

const lessons = rawLessons.map(l => ({ ...l, ...(richContent[l.id] || {}) }))

export default function StudyNotesPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getLessonStatus } = useProgress()

  const [selectedLessonId, setSelectedLessonId] = useState(null)
  const [notes, setNotes] = useState({}) // { [lessonId]: { content, updatedAt } }
  const [currentContent, setCurrentContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const saveTimerRef = useRef(null)
  const textareaRef = useRef(null)

  if (!user) {
    navigate('/giris')
    return null
  }

  // Fetch all notes from Firestore
  useEffect(() => {
    async function fetchNotes() {
      if (!user) return
      try {
        const snap = await getDocs(collection(db, 'notes', user.uid, 'lessons'))
        const notesData = {}
        snap.forEach(d => { notesData[d.id] = d.data() })
        setNotes(notesData)
      } catch (e) {
        console.error('Notes fetch error:', e)
      }
      setLoading(false)
    }
    fetchNotes()
  }, [user])

  // When selecting a lesson, load its note or pre-populate
  useEffect(() => {
    if (!selectedLessonId) return
    const existing = notes[String(selectedLessonId)]
    if (existing) {
      setCurrentContent(existing.content || '')
      setLastSaved(existing.updatedAt?.toDate?.() || existing.updatedAt || null)
    } else {
      // Pre-populate with lesson summary
      const lesson = lessons.find(l => l.id === selectedLessonId)
      let template = ''
      if (lesson) {
        if (lesson.tema) template += `Tema: ${lesson.tema}\n\n`
        if (lesson.kavramlar?.length) {
          template += 'Kavramlar:\n'
          lesson.kavramlar.forEach(k => {
            template += `- ${k.kavram}: ${k.anlam}\n`
          })
          template += '\n'
        }
        if (lesson.ayetHadis) {
          template += `"${lesson.ayetHadis.metin}" ${lesson.ayetHadis.kaynak}\n\n`
        }
        template += '--- Notlarim ---\n\n'
      }
      setCurrentContent(template)
      setLastSaved(null)
    }
  }, [selectedLessonId, notes])

  // Debounced auto-save
  const saveNote = useCallback(async (content) => {
    if (!user || !selectedLessonId) return
    setSaving(true)
    try {
      const ref = doc(db, 'notes', user.uid, 'lessons', String(selectedLessonId))
      await setDoc(ref, {
        content,
        updatedAt: serverTimestamp(),
      }, { merge: true })
      setNotes(prev => ({
        ...prev,
        [String(selectedLessonId)]: { content, updatedAt: new Date() },
      }))
      setLastSaved(new Date())
    } catch (e) {
      console.error('Note save error:', e)
    }
    setSaving(false)
  }, [user, selectedLessonId])

  function handleContentChange(e) {
    const value = e.target.value
    setCurrentContent(value)

    // Debounce save
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      saveNote(value)
    }, 1000)
  }

  // Bold / Italic helpers
  function insertFormatting(type) {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = currentContent
    const selected = text.substring(start, end)
    const marker = type === 'bold' ? '**' : '*'
    const newText = text.substring(0, start) + marker + selected + marker + text.substring(end)
    setCurrentContent(newText)

    // Debounce save
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      saveNote(newText)
    }, 1000)

    // Restore cursor
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + marker.length, end + marker.length)
    }, 10)
  }

  // Export all notes as text
  function exportNotes() {
    let text = 'Iyilik Akademi - Notlarim\n'
    text += '='.repeat(40) + '\n\n'

    lessons.forEach(lesson => {
      const note = notes[String(lesson.id)]
      if (note?.content) {
        text += `${lesson.icon} ${lesson.title}\n`
        text += '-'.repeat(30) + '\n'
        text += note.content + '\n\n'
      }
    })

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'iyilik-akademi-notlarim.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Search across all notes
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons
    const q = searchQuery.toLowerCase()
    return lessons.filter(l => {
      if (l.title.toLowerCase().includes(q)) return true
      const note = notes[String(l.id)]
      if (note?.content?.toLowerCase().includes(q)) return true
      return false
    })
  }, [searchQuery, notes])

  const selectedLesson = lessons.find(l => l.id === selectedLessonId)
  const charCount = currentContent.length

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading dark:text-dark-text">Notlarim</h1>
          <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
            Her ders icin kisisel notlarin
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg border border-border-light dark:border-dark-border hover:bg-surface-alt dark:hover:bg-dark-elevated transition-colors"
          >
            <Icon name="menu" size={20} className="dark:text-dark-text" />
          </button>
          <Button variant="outline" size="sm" onClick={exportNotes}>
            <Icon name="download" size={16} />
            Disari Aktar
          </Button>
        </div>
      </div>

      <div className="flex gap-4 relative">
        {/* Left Sidebar - Lesson List */}
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/30 dark:bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <aside className={`
            fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-dark-surface border-r border-border-light dark:border-dark-border z-40 p-4 overflow-y-auto
            transform transition-transform duration-200
            lg:static lg:transform-none lg:w-72 lg:shrink-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            {/* Search */}
            <div className="relative mb-3">
              <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-dark-text-muted" />
              <input
                type="text"
                placeholder="Notlarda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-border-light dark:border-dark-border bg-surface-alt dark:bg-dark-elevated text-text dark:text-dark-text placeholder:text-text-muted dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            {/* Lesson list */}
            <div className="space-y-1">
              {filteredLessons.map(lesson => {
                const isCompleted = getLessonStatus(lesson.id) === 'completed'
                const hasNote = !!notes[String(lesson.id)]?.content
                const isSelected = selectedLessonId === lesson.id

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLessonId(lesson.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary/10 dark:bg-primary/15 text-primary font-medium border border-primary/20'
                        : 'hover:bg-surface-alt dark:hover:bg-dark-elevated border border-transparent'
                    }`}
                  >
                    <span className="text-base shrink-0">{lesson.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`truncate ${isSelected ? 'text-primary' : 'text-text dark:text-dark-text'} ${!isCompleted ? 'opacity-50' : ''}`}>
                        {lesson.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {hasNote && (
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" title="Not var" />
                      )}
                      {isCompleted && (
                        <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>
        </>

        {/* Right Panel - Note Editor */}
        <div className="flex-1 min-w-0">
          {!selectedLessonId ? (
            <Card className="text-center py-16">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-lg font-bold mb-2 dark:text-dark-text">Bir ders sec</h2>
              <p className="text-sm text-text-muted dark:text-dark-text-muted">
                Sol panelden bir ders secerek notlarini goruntule veya duzenle
              </p>
            </Card>
          ) : loading ? (
            <Card className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-sm text-text-muted dark:text-dark-text-muted">Yuklenyor...</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {/* Lesson header */}
              <Card className="py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedLesson?.icon}</span>
                  <div className="flex-1">
                    <h2 className="font-bold text-base dark:text-dark-text">{selectedLesson?.title}</h2>
                    <p className="text-xs text-text-muted dark:text-dark-text-muted">{selectedLesson?.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted dark:text-dark-text-muted">
                    {saving ? (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Kaydediliyor...
                      </span>
                    ) : lastSaved ? (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        Kaydedildi {formatTime(lastSaved)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Card>

              {/* Formatting toolbar */}
              <div className="flex items-center gap-1 px-1">
                <button
                  onClick={() => insertFormatting('bold')}
                  className="p-1.5 rounded-lg text-text-muted dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated hover:text-text dark:hover:text-dark-text transition-colors"
                  title="Kalin (Bold)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/>
                    <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/>
                  </svg>
                </button>
                <button
                  onClick={() => insertFormatting('italic')}
                  className="p-1.5 rounded-lg text-text-muted dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated hover:text-text dark:hover:text-dark-text transition-colors"
                  title="Italik"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="4" x2="10" y2="4"/>
                    <line x1="14" y1="20" x2="5" y2="20"/>
                    <line x1="15" y1="4" x2="9" y2="20"/>
                  </svg>
                </button>
                <div className="flex-1" />
                <span className="text-[11px] text-text-muted dark:text-dark-text-muted">
                  {charCount} karakter
                </span>
              </div>

              {/* Text editor */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={currentContent}
                  onChange={handleContentChange}
                  placeholder="Bu ders hakkinda notlarini yaz..."
                  className="w-full min-h-[400px] p-5 rounded-2xl border border-border-light dark:border-dark-border bg-white dark:bg-dark-card text-text dark:text-dark-text text-sm leading-relaxed placeholder:text-text-muted dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-y transition-all shadow-soft dark:shadow-dark-soft"
                  style={{ fontFamily: 'inherit' }}
                />
              </div>

              {/* Lesson quick info (kavramlar) */}
              {selectedLesson?.kavramlar?.length > 0 && (
                <Card className="bg-primary/3 dark:bg-primary/8 border-primary/10 dark:border-primary/20">
                  <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1.5">
                    <Icon name="bulb" size={14} />
                    Ders Kavramlari
                  </h4>
                  <div className="space-y-1.5">
                    {selectedLesson.kavramlar.map((k, i) => (
                      <div key={i} className="text-xs dark:text-dark-text">
                        <span className="font-semibold">{k.kavram}:</span>{' '}
                        <span className="text-text-light dark:text-dark-text-muted">{k.anlam}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function formatTime(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  const now = new Date()
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60) return 'az once'
  if (diff < 3600) return `${Math.floor(diff / 60)} dk once`
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat once`
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}
