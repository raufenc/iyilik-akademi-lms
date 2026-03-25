import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const DAILY_QUIZ_XP = 25
const QUESTION_COUNT = 5

const CONFETTI_COLORS = ['#6C5CE7', '#A29BFE', '#00B894', '#55EFC4', '#FDCB6E', '#F9A825', '#E17055', '#FAB1A0', '#FD79A8', '#74B9FF']

function ConfettiParticle({ delay, color }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${10 + Math.random() * 80}%`,
        top: '40%',
        animation: `confetti 1.2s ease-out ${delay}s forwards`,
      }}
    >
      <div
        className="w-2.5 h-2.5 rounded-sm"
        style={{ backgroundColor: color, transform: `rotate(${Math.random() * 360}deg)` }}
      />
    </div>
  )
}

// Collect all questions from all lessons
function getAllQuestions() {
  const allQs = []
  lessons.forEach(lesson => {
    const preQs = lesson.preQuiz || []
    const postQs = lesson.postQuiz || []
    ;[...preQs, ...postQs].forEach(q => {
      allQs.push({
        ...q,
        lessonTitle: lesson.title,
        lessonIcon: lesson.icon,
      })
    })
  })
  return allQs
}

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Pick N random questions and shuffle their options
function pickQuestions(count) {
  const all = getAllQuestions()
  const picked = shuffle(all).slice(0, count)

  return picked.map(q => {
    const options = q.options || []
    const correctText = options[q.correct ?? 0]

    // Shuffle options
    const shuffledOptions = shuffle(options)
    const newCorrectIndex = shuffledOptions.indexOf(correctText)

    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex,
    }
  })
}

// Motivational messages based on score
function getResultMessage(score, total) {
  const pct = score / total
  if (pct === 1) return { emoji: '\uD83C\uDF1F', text: 'Muhkemmel! Hepsini bildin!', sub: 'Gercek bir iyilik kahramanisin!' }
  if (pct >= 0.8) return { emoji: '\uD83C\uDF89', text: 'Harika sonuc!', sub: 'Bilgi seviyen cok iyi!' }
  if (pct >= 0.6) return { emoji: '\uD83D\uDCAA', text: 'Iyi gidiyorsun!', sub: 'Biraz daha tekrar ile mukemmel olacaksin.' }
  if (pct >= 0.4) return { emoji: '\uD83D\uDE0A', text: 'Fena degil!', sub: 'Dersleri tekrar ederek gelis.' }
  return { emoji: '\uD83D\uDCDA', text: 'Derslere goz at!', sub: 'Tekrar yaparak bilgini guclendir.' }
}

export default function DailyQuizPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addXP, recordActivity, isActiveToday, streakData, incrementDailyTask } = useProgress()

  const [phase, setPhase] = useState('intro') // intro | quiz | result
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animateQuestion, setAnimateQuestion] = useState(true)
  const [xpAwarded, setXpAwarded] = useState(false)
  const [resultConfetti, setResultConfetti] = useState(false)

  function startQuiz() {
    const qs = pickQuestions(QUESTION_COUNT)
    setQuestions(qs)
    setCurrentQ(0)
    setSelected(null)
    setShowResult(false)
    setScore(0)
    setPhase('quiz')
    setAnimateQuestion(true)
  }

  function handleSelect(idx) {
    if (showResult) return
    setSelected(idx)
  }

  function handleConfirm() {
    const isCorrect = selected === questions[currentQ].correct
    if (isCorrect) {
      setScore(s => s + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500)
    }
    setShowResult(true)
  }

  function handleNext() {
    if (currentQ + 1 < questions.length) {
      setAnimateQuestion(false)
      setTimeout(() => {
        setCurrentQ(c => c + 1)
        setSelected(null)
        setShowResult(false)
        setAnimateQuestion(true)
      }, 50)
    } else {
      setPhase('result')
      setResultConfetti(true)
      setTimeout(() => setResultConfetti(false), 3000)
    }
  }

  // Award XP and record activity when results show
  useEffect(() => {
    if (phase === 'result' && !xpAwarded && user) {
      setXpAwarded(true)
      addXP(DAILY_QUIZ_XP)
      recordActivity()
      incrementDailyTask('quizzesToday')
    }
  }, [phase, xpAwarded, user])

  // Intro screen
  if (phase === 'intro') {
    return (
      <div className="animate-fade-in max-w-lg mx-auto py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-5xl shadow-soft daily-quiz-icon">
            {'\uD83C\uDFAF'}
          </div>
          <h1 className="font-heading text-3xl font-bold mb-2">Günlük Quiz</h1>
          <p className="text-text-muted">Her gun 5 rastgele soru. Bilgini test et, seriyi koru!</p>
        </div>

        <Card className="mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{QUESTION_COUNT}</p>
              <p className="text-xs text-text-muted mt-0.5">Soru</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent-dark">+{DAILY_QUIZ_XP}</p>
              <p className="text-xs text-text-muted mt-0.5">XP Odul</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">
                {'\uD83D\uDD25'} {streakData.streak || 0}
              </p>
              <p className="text-xs text-text-muted mt-0.5">Seri</p>
            </div>
          </div>
        </Card>

        {isActiveToday && (
          <div className="mb-4 p-3 bg-secondary/10 border border-secondary/20 rounded-xl text-sm text-secondary-dark text-center">
            {'\u2705'} Bugun zaten aktifsin! Yine de tekrar cozebilirsin.
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full text-base" onClick={startQuiz}>
            {'\uD83D\uDE80'} Quiz'e Başla
          </Button>
          <Button variant="ghost" size="md" className="w-full" onClick={() => navigate('/panel')}>
            {'\u2190'} Dashboard'a Don
          </Button>
        </div>

        <style>{`
          .daily-quiz-icon {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </div>
    )
  }

  // Result screen
  if (phase === 'result') {
    const result = getResultMessage(score, questions.length)
    return (
      <div className="animate-fade-in max-w-lg mx-auto py-8 text-center relative overflow-hidden">
        {/* Result confetti */}
        {resultConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <ConfettiParticle key={i} delay={i * 0.04} color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} />
            ))}
          </div>
        )}

        <div className="relative z-20">
          <div className="text-6xl mb-4 result-emoji">{result.emoji}</div>
          <h1 className="font-heading text-3xl font-bold mb-2">{result.text}</h1>
          <p className="text-text-muted mb-6">{result.sub}</p>

          {/* Score card */}
          <Card className="mb-6 inline-block mx-auto">
            <div className="flex items-center gap-8 px-4">
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary">{score}</p>
                <p className="text-xs text-text-muted mt-0.5">/ {questions.length} Doğru</p>
              </div>
              <div className="w-px h-12 bg-border-light" />
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-accent-dark">+{DAILY_QUIZ_XP}</p>
                <p className="text-xs text-text-muted mt-0.5">XP Kazandin</p>
              </div>
              <div className="w-px h-12 bg-border-light" />
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-orange-500">{'\uD83D\uDD25'} {streakData.streak}</p>
                <p className="text-xs text-text-muted mt-0.5">Gun Seri</p>
              </div>
            </div>
          </Card>

          {/* Question Review */}
          <div className="space-y-2 mb-6 text-left">
            {questions.map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-surface-alt rounded-xl text-sm">
                <span className="shrink-0">{q.lessonIcon}</span>
                <span className="flex-1 truncate">{q.q || q.soru_metni || q.soru}</span>
                <span className="shrink-0 text-lg">
                  {/* We don't track per-question correctness in this simple version, show lesson icon */}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={startQuiz}>
              {'\uD83D\uDD01'} Tekrar Coz
            </Button>
            <Button variant="outline" size="md" className="w-full" onClick={() => navigate('/panel')}>
              {'\uD83C\uDFE0'} Dashboard'a Don
            </Button>
            <Button variant="ghost" size="md" className="w-full" onClick={() => navigate('/dersler')}>
              {'\uD83D\uDCDA'} Derslere Git
            </Button>
          </div>
        </div>

        <style>{`
          .result-emoji {
            animation: resultBounce 0.6s ease-out;
          }
          @keyframes resultBounce {
            0% { transform: scale(0) rotate(-15deg); opacity: 0; }
            60% { transform: scale(1.3) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}</style>
      </div>
    )
  }

  // Quiz phase
  const q = questions[currentQ]
  if (!q) return null

  const options = q.options || []
  const correctIndex = q.correct ?? 0
  const isCorrect = selected === correctIndex

  const feedbackText = showResult
    ? isCorrect
      ? 'Doğru! Harika!'
      : `Yanlış. Doğru cevap: ${options[correctIndex]}`
    : ''

  return (
    <div className="animate-fade-in max-w-2xl mx-auto py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-heading text-xl font-bold flex items-center justify-center gap-2">
          {'\uD83C\uDFAF'} Günlük Quiz
        </h2>
        <p className="text-sm text-text-muted mt-0.5">
          Farkli derslerden {QUESTION_COUNT} soru
        </p>
      </div>

      {/* Progress Bar - Segmented */}
      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full overflow-hidden bg-border-light">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                i < currentQ ? 'bg-secondary w-full' :
                i === currentQ ? 'bg-primary w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Question Card */}
      <div className={`relative bg-white dark:bg-dark-card rounded-3xl border border-border-light dark:border-dark-border p-7 shadow-soft dark:shadow-dark-soft overflow-hidden ${
        animateQuestion ? 'animate-fade-in' : 'opacity-0'
      }`}>
        {/* Confetti overlay */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <ConfettiParticle key={i} delay={i * 0.05} color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} />
            ))}
          </div>
        )}

        {/* Question number + lesson badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            Soru {currentQ + 1} / {questions.length}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted bg-surface-alt px-2.5 py-1 rounded-full">
            {q.lessonIcon} {q.lessonTitle}
          </span>
        </div>

        {/* Question text */}
        <h3 className="font-heading font-semibold text-lg leading-relaxed mb-6">
          {q.q || q.soru_metni || q.soru}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt, idx) => {
            const isSelected = selected === idx
            const isAnswer = idx === correctIndex

            let cls = 'border-border-light hover:border-primary/30 hover:bg-primary/3 hover:shadow-sm'
            let badgeCls = 'border-border-light text-text-muted bg-surface-alt'

            if (showResult) {
              if (isAnswer) {
                cls = 'border-secondary bg-secondary/8 shadow-sm shadow-secondary/10'
                badgeCls = 'bg-secondary text-white border-secondary'
              } else if (isSelected && !isAnswer) {
                cls = 'border-danger bg-danger/5'
                badgeCls = 'bg-danger text-white border-danger'
              } else {
                cls = 'border-border-light opacity-40'
              }
            } else if (isSelected) {
              cls = 'border-primary bg-primary/5 ring-2 ring-primary/15 shadow-sm shadow-primary/10'
              badgeCls = 'bg-primary text-white border-primary'
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm transition-all duration-200 ${cls}`}
              >
                <span className="inline-flex items-center gap-3.5">
                  <span className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 shrink-0 ${badgeCls}`}>
                    {showResult && isAnswer ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : showResult && isSelected && !isAnswer ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/></svg>
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className={`${showResult && isAnswer ? 'font-semibold' : ''}`}>{opt}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {showResult && (
          <div className={`mt-5 p-4 rounded-2xl text-sm leading-relaxed flex items-start gap-3 animate-slide-up ${
            isCorrect ? 'bg-secondary/10 text-secondary-dark' : 'bg-danger/10 text-danger'
          }`}>
            <span className="text-lg shrink-0 mt-0.5">
              {isCorrect ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round"/><line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round"/></svg>
              )}
            </span>
            <span>{feedbackText}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          {!showResult ? (
            <Button onClick={handleConfirm} disabled={selected === null} size="lg">
              Kontrol Et
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg">
              {currentQ + 1 < questions.length ? 'Sonraki Soru \u2192' : 'Tamamla \u2728'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
