import { useState, useMemo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons as rawLessons } from '../data/lessons'
import { richContent } from '../data/richContent'
import FlashCard from '../components/lesson/FlashCard'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Icon from '../components/ui/Icon'

const lessons = rawLessons.map(l => ({ ...l, ...(richContent[l.id] || {}) }))

const XP_PER_PRACTICE = 15
const MAX_PRACTICE_PER_DAY = 2

export default function PracticeModePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    lessonProgress,
    getLessonStatus,
    wrongAnswers = [],
    practiceCountToday = 0,
    addXP,
    recordActivity,
    addPracticeSession,
    recordPracticeWrong,
    removePracticeWrong,
  } = useProgress()

  const [mode, setMode] = useState(null) // null | 'quick' | 'weak' | 'topic'
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [cards, setCards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [cardStatuses, setCardStatuses] = useState({})
  const [sessionDone, setSessionDone] = useState(false)
  const [needsReviewQueue, setNeedsReviewQueue] = useState([])

  if (!user) {
    navigate('/giris')
    return null
  }

  // Completed lessons
  const completedLessons = useMemo(() => {
    return lessons.filter(l => getLessonStatus(l.id) === 'completed')
  }, [lessonProgress, getLessonStatus])

  // Build all questions from completed lessons with metadata
  const allQuestions = useMemo(() => {
    const questions = []
    completedLessons.forEach(lesson => {
      const quizSets = [
        ...(lesson.preQuiz || []).map((q, i) => ({ ...q, lessonId: lesson.id, lessonTitle: lesson.title, lessonIcon: lesson.icon, questionIndex: i, quizType: 'pre' })),
        ...(lesson.postQuiz || []).map((q, i) => ({ ...q, lessonId: lesson.id, lessonTitle: lesson.title, lessonIcon: lesson.icon, questionIndex: i, quizType: 'post' })),
      ]
      questions.push(...quizSets)
    })
    return questions
  }, [completedLessons])

  // Weak questions (ones user got wrong before)
  const weakQuestions = useMemo(() => {
    if (!wrongAnswers || wrongAnswers.length === 0) return []
    return wrongAnswers.map(wa => {
      const lesson = lessons.find(l => l.id === wa.lessonId)
      if (!lesson) return null
      const quizArr = wa.quizType === 'pre' ? lesson.preQuiz : lesson.postQuiz
      const q = quizArr?.[wa.questionIndex]
      if (!q) return null
      return {
        ...q,
        lessonId: wa.lessonId,
        lessonTitle: lesson.title,
        lessonIcon: lesson.icon,
        questionIndex: wa.questionIndex,
        quizType: wa.quizType || 'post',
      }
    }).filter(Boolean)
  }, [wrongAnswers])

  // Transform quiz question to flashcard format
  const toFlashCard = useCallback((q) => {
    const questionText = q.q || q.soru_metni || q.soru || ''
    const options = q.options || q.secenekler?.map(s => s.metin) || []
    const correctIndex = q.correct ?? q.secenekler?.findIndex(s => s.dogru_mu) ?? 0
    const answer = options[correctIndex] || ''
    const explanation = q.geriDogruBildirim || q.geri_bildirim_dogru || `${q.lessonTitle} dersinden`
    return { question: questionText, answer, explanation, lessonId: q.lessonId, questionIndex: q.questionIndex, quizType: q.quizType }
  }, [])

  // Shuffle helper
  function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function startQuickReview() {
    if (allQuestions.length === 0) return
    const shuffled = shuffle(allQuestions).slice(0, 5)
    setCards(shuffled.map(toFlashCard))
    setCardStatuses({})
    setCurrentCardIndex(0)
    setSessionDone(false)
    setNeedsReviewQueue([])
    setMode('quick')
  }

  function startWeakReview() {
    if (weakQuestions.length === 0) return
    const shuffled = shuffle(weakQuestions).slice(0, 10)
    setCards(shuffled.map(toFlashCard))
    setCardStatuses({})
    setCurrentCardIndex(0)
    setSessionDone(false)
    setNeedsReviewQueue([])
    setMode('weak')
  }

  function startTopicReview(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId)
    if (!lesson) return
    const lessonQuestions = [
      ...(lesson.preQuiz || []).map((q, i) => ({ ...q, lessonId: lesson.id, lessonTitle: lesson.title, lessonIcon: lesson.icon, questionIndex: i, quizType: 'pre' })),
      ...(lesson.postQuiz || []).map((q, i) => ({ ...q, lessonId: lesson.id, lessonTitle: lesson.title, lessonIcon: lesson.icon, questionIndex: i, quizType: 'post' })),
    ]
    setCards(lessonQuestions.map(toFlashCard))
    setCardStatuses({})
    setCurrentCardIndex(0)
    setSessionDone(false)
    setNeedsReviewQueue([])
    setSelectedLesson(lessonId)
    setMode('topic')
  }

  function handleKnown() {
    setCardStatuses(prev => ({ ...prev, [currentCardIndex]: 'known' }))
    // Remove from wrongAnswers if it was there
    const card = cards[currentCardIndex]
    if (card) {
      removePracticeWrong?.(card.lessonId, card.questionIndex, card.quizType)
    }
    advanceCard()
  }

  function handleNeedsReview() {
    setCardStatuses(prev => ({ ...prev, [currentCardIndex]: 'needs_review' }))
    // Add to needs-review queue for spaced repetition within session
    setNeedsReviewQueue(prev => [...prev, currentCardIndex])
    // Track in wrongAnswers
    const card = cards[currentCardIndex]
    if (card) {
      recordPracticeWrong?.(card.lessonId, card.questionIndex, card.quizType)
    }
    advanceCard()
  }

  function advanceCard() {
    if (currentCardIndex + 1 < cards.length) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else if (needsReviewQueue.length > 0) {
      // Spaced repetition: re-show cards marked "needs review"
      const nextReview = needsReviewQueue[0]
      setNeedsReviewQueue(prev => prev.slice(1))
      setCurrentCardIndex(nextReview)
    } else {
      finishSession()
    }
  }

  async function finishSession() {
    setSessionDone(true)
    // Award XP if under daily limit
    if (practiceCountToday < MAX_PRACTICE_PER_DAY) {
      try {
        await addXP(XP_PER_PRACTICE)
        await recordActivity()
        await addPracticeSession?.()
      } catch (e) {
        console.error('Practice XP error:', e)
      }
    }
  }

  function resetToMenu() {
    setMode(null)
    setCards([])
    setCurrentCardIndex(0)
    setCardStatuses({})
    setSessionDone(false)
    setSelectedLesson(null)
    setNeedsReviewQueue([])
  }

  // Calculate results
  const knownCount = Object.values(cardStatuses).filter(s => s === 'known').length
  const reviewCount = Object.values(cardStatuses).filter(s => s === 'needs_review').length
  const totalCards = cards.length
  const masteryPct = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0

  // Progress within the session
  const answeredCount = Object.keys(cardStatuses).length
  const progressPct = totalCards > 0 ? (answeredCount / totalCards) * 100 : 0

  // --- MODE SELECTION SCREEN ---
  if (!mode) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-heading dark:text-dark-text">Tekrar Modu</h1>
          <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
            Ogrendiklerini pekistir, zayif noktalarin uzerinde calis
          </p>
        </div>

        {completedLessons.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-lg font-bold mb-2 dark:text-dark-text">Henuz tamamlanmis ders yok</h2>
            <p className="text-sm text-text-muted dark:text-dark-text-muted mb-4">
              Tekrar modu icin once en az bir ders tamamla
            </p>
            <Button onClick={() => navigate('/dersler')}>Derslere Git</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Daily XP info */}
            <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 dark:bg-primary/20 flex items-center justify-center">
                    <Icon name="lightning" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm dark:text-dark-text">Gunluk Tekrar XP</p>
                    <p className="text-xs text-text-muted dark:text-dark-text-muted">
                      Gunluk {MAX_PRACTICE_PER_DAY} tekrar icin +{XP_PER_PRACTICE} XP kazan
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{practiceCountToday}/{MAX_PRACTICE_PER_DAY}</p>
                  <p className="text-[10px] text-text-muted dark:text-dark-text-muted">bugun</p>
                </div>
              </div>
            </Card>

            {/* Quick Review */}
            <Card hover onClick={startQuickReview} className="cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-200">
                  ⚡
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base dark:text-dark-text">Hizli Tekrar</h3>
                  <p className="text-sm text-text-muted dark:text-dark-text-muted">
                    Tamamladigin derslerden rastgele 5 soru, kart cevirme stili
                  </p>
                </div>
                <div className="text-text-muted dark:text-dark-text-muted group-hover:text-primary transition-colors">
                  <Icon name="arrow-right" size={20} />
                </div>
              </div>
            </Card>

            {/* Weak Areas */}
            <Card
              hover
              onClick={weakQuestions.length > 0 ? startWeakReview : undefined}
              className={`cursor-pointer group ${weakQuestions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-dark to-accent flex items-center justify-center text-white text-2xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-200">
                  🎯
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base dark:text-dark-text">Zayif Noktalar</h3>
                  <p className="text-sm text-text-muted dark:text-dark-text-muted">
                    {weakQuestions.length > 0
                      ? `${weakQuestions.length} soru tekrar bekliyor`
                      : 'Henuz yanlis cevaplanan soru yok. Harika!'}
                  </p>
                </div>
                {weakQuestions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="bg-accent/10 text-accent-dark dark:text-accent px-2.5 py-1 rounded-full text-xs font-bold">
                      {weakQuestions.length}
                    </span>
                    <div className="text-text-muted dark:text-dark-text-muted group-hover:text-accent-dark transition-colors">
                      <Icon name="arrow-right" size={20} />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Topic Review */}
            <Card>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white text-2xl shadow-lg shadow-secondary/20">
                  📖
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base dark:text-dark-text">Konu Tekrari</h3>
                  <p className="text-sm text-text-muted dark:text-dark-text-muted">
                    Belirli bir dersin sorularini tekrar et
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {completedLessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => startTopicReview(lesson.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border-light dark:border-dark-border hover:border-secondary/40 hover:bg-secondary/5 dark:hover:bg-secondary/10 text-left transition-all duration-200 group"
                  >
                    <span className="text-lg">{lesson.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate dark:text-dark-text group-hover:text-secondary">
                        {lesson.title}
                      </p>
                      <p className="text-[11px] text-text-muted dark:text-dark-text-muted">
                        {(lesson.preQuiz?.length || 0) + (lesson.postQuiz?.length || 0)} soru
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-text-muted dark:text-dark-text-muted group-hover:text-secondary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // --- SESSION RESULTS SCREEN ---
  if (sessionDone) {
    const canEarnXP = practiceCountToday <= MAX_PRACTICE_PER_DAY
    // Suggest weakest lessons
    const wrongByLesson = {}
    Object.entries(cardStatuses).forEach(([idx, status]) => {
      if (status === 'needs_review') {
        const card = cards[Number(idx)]
        if (card) {
          wrongByLesson[card.lessonId] = (wrongByLesson[card.lessonId] || 0) + 1
        }
      }
    })
    const suggestedLessons = Object.entries(wrongByLesson)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => lessons.find(l => l.id === Number(id)))
      .filter(Boolean)

    return (
      <div className="animate-fade-in max-w-lg mx-auto">
        <Card className="text-center py-8">
          <div className="text-5xl mb-4">
            {masteryPct >= 80 ? '🌟' : masteryPct >= 50 ? '💪' : '📚'}
          </div>
          <h2 className="text-xl font-bold mb-2 dark:text-dark-text">Tekrar Tamamlandi!</h2>

          {/* Mastery Ring */}
          <div className="relative w-28 h-28 mx-auto my-6">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-border-light dark:text-dark-border" />
              <circle
                cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 48}`}
                strokeDashoffset={`${2 * Math.PI * 48 * (1 - masteryPct / 100)}`}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${masteryPct >= 80 ? 'text-secondary' : masteryPct >= 50 ? 'text-accent' : 'text-danger'}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${masteryPct >= 80 ? 'text-secondary' : masteryPct >= 50 ? 'text-accent-dark' : 'text-danger'}`}>
                %{masteryPct}
              </span>
              <span className="text-[10px] text-text-muted dark:text-dark-text-muted">hakimiyet</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">{knownCount}</p>
              <p className="text-xs text-text-muted dark:text-dark-text-muted">Biliyorum</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-danger">{reviewCount}</p>
              <p className="text-xs text-text-muted dark:text-dark-text-muted">Tekrar Et</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text dark:text-dark-text">{totalCards}</p>
              <p className="text-xs text-text-muted dark:text-dark-text-muted">Toplam</p>
            </div>
          </div>

          {/* XP Earned */}
          {canEarnXP && (
            <div className="inline-flex items-center gap-1.5 bg-primary/10 dark:bg-primary/15 text-primary px-4 py-2 rounded-xl text-sm font-bold mb-6">
              <Icon name="lightning" size={16} />
              +{XP_PER_PRACTICE} XP Kazandin!
            </div>
          )}

          {/* Suggested lessons */}
          {suggestedLessons.length > 0 && (
            <div className="mt-4 mb-6 text-left">
              <p className="text-sm font-semibold mb-2 dark:text-dark-text">Tekrar Onerileri:</p>
              <div className="space-y-2">
                {suggestedLessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => startTopicReview(lesson.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-border-light dark:border-dark-border hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 text-left"
                  >
                    <span className="text-lg">{lesson.icon}</span>
                    <span className="text-sm font-medium dark:text-dark-text">{lesson.title}</span>
                    <span className="ml-auto text-xs text-danger font-medium">
                      {wrongByLesson[lesson.id]} yanlis
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <Button onClick={resetToMenu} variant="outline">
              Ana Menu
            </Button>
            <Button onClick={() => {
              if (mode === 'quick') startQuickReview()
              else if (mode === 'weak') startWeakReview()
              else if (mode === 'topic' && selectedLesson) startTopicReview(selectedLesson)
            }}>
              Tekrar Yap
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // --- FLASHCARD SESSION SCREEN ---
  const currentCard = cards[currentCardIndex]
  const currentStatus = cardStatuses[currentCardIndex] || 'unreviewed'

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={resetToMenu} className="text-sm text-text-muted dark:text-dark-text-muted hover:text-primary transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Geri
        </button>
        <h2 className="font-heading font-bold text-sm dark:text-dark-text">
          {mode === 'quick' && 'Hizli Tekrar'}
          {mode === 'weak' && 'Zayif Noktalar'}
          {mode === 'topic' && (lessons.find(l => l.id === selectedLesson)?.title || 'Konu Tekrari')}
        </h2>
        <span className="text-xs text-text-muted dark:text-dark-text-muted">
          {answeredCount}/{totalCards}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-border-light dark:bg-dark-border rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Flash Card */}
      {currentCard && (
        <FlashCard
          question={currentCard.question}
          answer={currentCard.answer}
          explanation={currentCard.explanation}
          status={currentStatus}
          onKnown={handleKnown}
          onNeedsReview={handleNeedsReview}
          index={currentCardIndex}
          total={totalCards}
        />
      )}

      {/* Skip / Finish button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={finishSession}
          className="text-xs text-text-muted dark:text-dark-text-muted hover:text-primary transition-colors"
        >
          Oturumu Bitir
        </button>
      </div>
    </div>
  )
}
