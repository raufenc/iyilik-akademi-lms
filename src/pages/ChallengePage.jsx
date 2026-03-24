import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

// ---- Helpers ----

function getAllQuestions() {
  const qs = []
  lessons.forEach(lesson => {
    const all = [...(lesson.preQuiz || []), ...(lesson.postQuiz || [])]
    all.forEach(q => qs.push({ ...q, lessonTitle: lesson.title }))
  })
  return qs
}

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getDailyTheme() {
  const themes = [
    { name: 'Ahlak ve Erdemler', filter: l => [1, 2, 3, 4, 5].includes(l.id) },
    { name: 'Ibadet ve Kulluk', filter: l => [6, 7, 8, 9, 10].includes(l.id) },
    { name: 'Toplum ve Iliskiler', filter: l => [11, 12, 13, 14, 15].includes(l.id) },
    { name: 'Bilgi ve Hikmet', filter: l => [16, 17, 18, 19, 20].includes(l.id) },
    { name: 'Sabir ve Sükür', filter: l => [21, 22, 23, 24, 25].includes(l.id) },
    { name: 'Iyilik ve Merhamet', filter: l => [26, 27, 28, 29, 30].includes(l.id) },
    { name: 'Karakter ve Gelisim', filter: l => [31, 32, 33, 34, 35, 36, 37, 38, 39, 40].includes(l.id) },
  ]
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return themes[dayOfYear % themes.length]
}

function getQuestionsForChallenge(type, count) {
  const all = getAllQuestions()
  if (type === 'daily') {
    const theme = getDailyTheme()
    const themed = lessons.filter(theme.filter)
    const qs = []
    themed.forEach(l => {
      const combined = [...(l.preQuiz || []), ...(l.postQuiz || [])]
      combined.forEach(q => qs.push({ ...q, lessonTitle: l.title }))
    })
    if (qs.length < count) {
      // fill with random
      const rest = all.filter(q => !qs.some(x => x.q === q.q))
      return [...shuffleArray(qs), ...shuffleArray(rest)].slice(0, count)
    }
    return shuffleArray(qs).slice(0, count)
  }
  return shuffleArray(all).slice(0, count)
}

function formatTime(ms) {
  const secs = Math.floor(ms / 1000)
  const mins = Math.floor(secs / 60)
  const s = secs % 60
  return `${mins}:${String(s).padStart(2, '0')}`
}

// ---- Challenge Definitions ----

const CHALLENGES = [
  {
    id: 'speed',
    title: 'Hiz Yarisi',
    description: '10 soruyu en hizli sekilde yanitla!',
    icon: 'zap',
    color: 'from-orange-400 to-red-500',
    colorLight: 'from-orange-400/10 to-red-500/10',
    darkColorLight: 'dark:from-orange-400/5 dark:to-red-500/5',
    difficulty: 'Orta',
    difficultyColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    questionCount: 10,
    hasTimer: true,
    timeLimit: 120000, // 2 minutes
  },
  {
    id: 'marathon',
    title: 'Bilgi Maratonu',
    description: '20 soru, zaman siniri yok. En yüksek puan kazansin!',
    icon: 'award',
    color: 'from-blue-400 to-indigo-500',
    colorLight: 'from-blue-400/10 to-indigo-500/10',
    darkColorLight: 'dark:from-blue-400/5 dark:to-indigo-500/5',
    difficulty: 'Zor',
    difficultyColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    questionCount: 20,
    hasTimer: false,
    timeLimit: 0,
  },
  {
    id: 'daily',
    title: 'Günün Mücadelesi',
    description: `5 tematik soru - ${getDailyTheme().name}`,
    icon: 'target',
    color: 'from-emerald-400 to-teal-500',
    colorLight: 'from-emerald-400/10 to-teal-500/10',
    darkColorLight: 'dark:from-emerald-400/5 dark:to-teal-500/5',
    difficulty: 'Kolay',
    difficultyColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    questionCount: 5,
    hasTimer: false,
    timeLimit: 0,
  },
]

// ---- Confetti Component ----

function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces = []
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9']
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * canvas.height,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
      })
    }

    let animId
    let opacity = 1
    const startTime = Date.now()

    function draw() {
      const elapsed = Date.now() - startTime
      if (elapsed > 2500) opacity = Math.max(0, 1 - (elapsed - 2500) / 1000)
      if (opacity <= 0) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = opacity

      pieces.forEach(p => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05
        p.rotation += p.rotSpeed
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}

// ---- Main Page ----

export default function ChallengePage() {
  const { user } = useAuth()
  const { addXP, challengeStats, updateChallengeStats } = useProgress()

  const [screen, setScreen] = useState('menu') // menu | play | results
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showCorrect, setShowCorrect] = useState(false)
  const [timer, setTimer] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [results, setResults] = useState(null)
  const timerRef = useRef(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Timer effect for speed challenge
  useEffect(() => {
    if (screen !== 'play' || !activeChallenge?.hasTimer || !startTime) return

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      setTimer(elapsed)

      if (elapsed >= activeChallenge.timeLimit) {
        clearInterval(timerRef.current)
        finishChallenge(score, questions.length)
      }
    }, 100)

    return () => clearInterval(timerRef.current)
  }, [screen, activeChallenge, startTime])

  function startChallenge(challengeDef) {
    const qs = getQuestionsForChallenge(challengeDef.id, challengeDef.questionCount)
    setActiveChallenge(challengeDef)
    setQuestions(qs)
    setCurrentQ(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowCorrect(false)
    setTimer(0)
    setStartTime(Date.now())
    setScreen('play')
  }

  const finishChallenge = useCallback(async (finalScore, totalQuestions) => {
    if (timerRef.current) clearInterval(timerRef.current)
    const elapsed = Date.now() - startTime
    const percentage = (finalScore / totalQuestions) * 100

    // Calculate stars
    let stars = 1
    if (percentage >= 80) stars = 3
    else if (percentage >= 50) stars = 2

    // Calculate XP (10-50)
    let xpEarned = 10
    if (stars === 2) xpEarned = 25
    if (stars === 3) xpEarned = 50

    // Time bonus for speed challenge
    if (activeChallenge?.hasTimer && elapsed < activeChallenge.timeLimit * 0.5) {
      xpEarned = Math.min(50, xpEarned + 10)
    }

    // Calculate coins (5-25)
    let coinsEarned = 5
    if (stars === 2) coinsEarned = 15
    if (stars === 3) coinsEarned = 25

    const resultData = {
      score: finalScore,
      total: totalQuestions,
      percentage,
      stars,
      xpEarned,
      coinsEarned,
      time: elapsed,
      challengeId: activeChallenge?.id,
    }

    setResults(resultData)
    setScreen('results')

    // Award XP
    if (user) {
      try {
        await addXP(xpEarned)
        await updateChallengeStats(activeChallenge?.id, finalScore, stars >= 2)
      } catch (e) {
        console.error('Error saving challenge results:', e)
      }
    }

    if (stars === 3) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
    }
  }, [startTime, activeChallenge, user, addXP, updateChallengeStats])

  function handleAnswer(optionIndex) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(optionIndex)
    setShowCorrect(true)

    const isCorrect = optionIndex === questions[currentQ].correct
    const newScore = isCorrect ? score + 1 : score

    if (isCorrect) setScore(newScore)

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        finishChallenge(newScore, questions.length)
      } else {
        setCurrentQ(prev => prev + 1)
        setSelectedAnswer(null)
        setShowCorrect(false)
      }
    }, 1200)
  }

  function goToMenu() {
    setScreen('menu')
    setActiveChallenge(null)
    setQuestions([])
    setResults(null)
  }

  // ---- RENDER ----

  // Challenge Menu
  if (screen === 'menu') {
    return (
      <div className="page-enter max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-text dark:text-dark-text">
            <Icon name="swords" size={28} className="inline-block mr-2 -mt-1 text-primary" />
            Meydan Okuma
          </h1>
          <p className="text-text-muted dark:text-dark-text-muted mt-2">Kendini test et, XP kazan!</p>
        </div>

        {/* Stats Summary */}
        {challengeStats.played > 0 && (
          <Card className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-2xl font-heading font-bold text-primary">{challengeStats.played}</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Oynanan</p>
              </div>
              <div className="w-px h-10 bg-border-light dark:bg-dark-border" />
              <div className="text-center flex-1">
                <p className="text-2xl font-heading font-bold text-secondary">{challengeStats.won}</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Kazanilan</p>
              </div>
              <div className="w-px h-10 bg-border-light dark:bg-dark-border" />
              <div className="text-center flex-1">
                <p className="text-2xl font-heading font-bold text-accent-dark">
                  {challengeStats.played > 0 ? Math.round((challengeStats.won / challengeStats.played) * 100) : 0}%
                </p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Basari</p>
              </div>
            </div>
          </Card>
        )}

        {/* Challenge Cards */}
        <div className="space-y-4">
          {CHALLENGES.map(ch => {
            const best = challengeStats.bestScores?.[ch.id]
            return (
              <Card key={ch.id} hover className="!p-0 overflow-hidden">
                <div className="flex items-stretch">
                  {/* Icon side */}
                  <div className={`w-24 shrink-0 bg-gradient-to-br ${ch.color} flex items-center justify-center`}>
                    <Icon name={ch.icon} size={36} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-text dark:text-dark-text">{ch.title}</h3>
                        <p className="text-sm text-text-muted dark:text-dark-text-muted mt-0.5">{ch.description}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2 ${ch.difficultyColor}`}>
                        {ch.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        {best !== undefined && (
                          <span className="text-xs text-text-muted dark:text-dark-text-muted flex items-center gap-1">
                            <Icon name="trophy" size={14} className="text-accent-dark" />
                            En iyi: {best}/{ch.questionCount}
                          </span>
                        )}
                        {ch.hasTimer && (
                          <span className="text-xs text-text-muted dark:text-dark-text-muted flex items-center gap-1">
                            <Icon name="clock" size={14} />
                            {ch.timeLimit / 1000}sn
                          </span>
                        )}
                      </div>
                      <Button size="sm" onClick={() => startChallenge(ch)}>
                        Basla
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Login prompt for non-authed */}
        {!user && (
          <Card className="mt-6 text-center">
            <Icon name="lock" size={32} className="mx-auto mb-2 text-text-muted dark:text-dark-text-muted" />
            <p className="text-sm text-text-muted dark:text-dark-text-muted">
              Meydan okuma oynayabilirsin ama puanlarin kaydedilmez. <br />
              <a href="/giris" className="text-primary font-semibold hover:underline">Giris yap</a> veya{' '}
              <a href="/kayit" className="text-primary font-semibold hover:underline">kayit ol</a> puanlarin kayit altina alinsin!
            </p>
          </Card>
        )}
      </div>
    )
  }

  // Play Screen
  if (screen === 'play' && activeChallenge && questions.length > 0) {
    const q = questions[currentQ]
    const progress = ((currentQ) / questions.length) * 100
    const timerProgress = activeChallenge.hasTimer ? Math.min((timer / activeChallenge.timeLimit) * 100, 100) : 0
    const timerDanger = activeChallenge.hasTimer && timer > activeChallenge.timeLimit * 0.75

    return (
      <div className="page-enter max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToMenu}
            className="flex items-center gap-1 text-sm text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text transition-colors"
          >
            <Icon name="arrow-right" size={16} className="rotate-180" />
            Cik
          </button>
          <div className="text-center">
            <p className="font-heading font-bold text-sm text-text dark:text-dark-text">{activeChallenge.title}</p>
            <p className="text-xs text-text-muted dark:text-dark-text-muted">Soru {currentQ + 1}/{questions.length}</p>
          </div>
          <div className="text-right">
            <p className="font-heading font-bold text-sm text-primary">{score}/{questions.length}</p>
            <p className="text-xs text-text-muted dark:text-dark-text-muted">Dogru</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-surface-alt dark:bg-dark-elevated rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timer (for speed challenge) */}
        {activeChallenge.hasTimer && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={`font-bold ${timerDanger ? 'text-danger animate-pulse' : 'text-text-muted dark:text-dark-text-muted'}`}>
                <Icon name="clock" size={14} className="inline-block mr-1 -mt-0.5" />
                {formatTime(timer)}
              </span>
              <span className="text-text-muted dark:text-dark-text-muted">
                {formatTime(activeChallenge.timeLimit)}
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-alt dark:bg-dark-elevated rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-200 ${
                  timerDanger ? 'bg-danger' : 'bg-accent-dark'
                }`}
                style={{ width: `${timerProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Question Card */}
        <Card className="mb-4">
          {q.lessonTitle && (
            <p className="text-xs text-primary/60 dark:text-primary/40 mb-2 font-medium">{q.lessonTitle}</p>
          )}
          <h2 className="font-heading font-bold text-lg text-text dark:text-dark-text leading-relaxed">
            {q.q}
          </h2>
        </Card>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let optClass = 'bg-white dark:bg-dark-card border-border-light dark:border-dark-border hover:border-primary/40 dark:hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10'

            if (showCorrect) {
              if (idx === q.correct) {
                optClass = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-500/50 ring-2 ring-emerald-200 dark:ring-emerald-800'
              } else if (idx === selectedAnswer && idx !== q.correct) {
                optClass = 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-500/50 ring-2 ring-red-200 dark:ring-red-800'
              } else {
                optClass = 'bg-white dark:bg-dark-card border-border-light dark:border-dark-border opacity-50'
              }
            } else if (selectedAnswer === idx) {
              optClass = 'bg-primary/10 dark:bg-primary/20 border-primary/40 dark:border-primary/30'
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 ${optClass} disabled:cursor-default`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    showCorrect && idx === q.correct
                      ? 'bg-emerald-500 text-white'
                      : showCorrect && idx === selectedAnswer && idx !== q.correct
                        ? 'bg-red-500 text-white'
                        : 'bg-surface-alt dark:bg-dark-elevated text-text-muted dark:text-dark-text-muted'
                  }`}>
                    {showCorrect && idx === q.correct ? (
                      <Icon name="check" size={16} />
                    ) : showCorrect && idx === selectedAnswer && idx !== q.correct ? (
                      <Icon name="close" size={16} />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className={`text-sm font-medium ${
                    showCorrect && idx === q.correct
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : showCorrect && idx === selectedAnswer && idx !== q.correct
                        ? 'text-red-700 dark:text-red-300'
                        : 'text-text dark:text-dark-text'
                  }`}>
                    {opt}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Results Screen
  if (screen === 'results' && results) {
    const starEmojis = ['\u{2B50}', '\u{2B50}', '\u{2B50}']

    return (
      <div className="page-enter max-w-md mx-auto text-center">
        {showConfetti && <Confetti />}

        <Card className="!p-8">
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4">
            {starEmojis.map((s, i) => (
              <span
                key={i}
                className={`text-4xl transition-all duration-500 ${
                  i < results.stars ? 'opacity-100 scale-100' : 'opacity-20 scale-75 grayscale'
                }`}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="font-heading font-bold text-2xl text-text dark:text-dark-text mb-1">
            {results.stars === 3 ? 'Muhteesem!' : results.stars === 2 ? 'Aferin!' : 'Iyi Deneme!'}
          </h2>
          <p className="text-text-muted dark:text-dark-text-muted text-sm mb-6">
            {activeChallenge?.title} tamamlandi
          </p>

          {/* Score */}
          <div className="bg-surface-alt dark:bg-dark-elevated rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-4xl font-heading font-bold text-primary">{results.score}</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">/ {results.total} Dogru</p>
              </div>
              <div className="w-px h-12 bg-border-light dark:bg-dark-border" />
              <div>
                <p className="text-4xl font-heading font-bold text-accent-dark">{Math.round(results.percentage)}%</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Basari</p>
              </div>
            </div>

            {activeChallenge?.hasTimer && (
              <div className="mt-4 pt-4 border-t border-border-light dark:border-dark-border">
                <div className="flex items-center justify-center gap-2">
                  <Icon name="clock" size={16} className="text-text-muted dark:text-dark-text-muted" />
                  <span className="font-heading font-bold text-sm text-text dark:text-dark-text">
                    {formatTime(results.time)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Rewards */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-xl">
              <Icon name="lightning" size={18} className="text-primary" />
              <span className="font-heading font-bold text-primary">+{results.xpEarned} XP</span>
            </div>
            <div className="flex items-center gap-2 bg-accent/10 dark:bg-accent-dark/20 px-4 py-2 rounded-xl">
              <span className="text-lg">{'\u{1FA99}'}</span>
              <span className="font-heading font-bold text-accent-dark">+{results.coinsEarned}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => startChallenge(activeChallenge)}
            >
              <Icon name="arrow-right" size={16} className="rotate-180" />
              Tekrar Dene
            </Button>
            <Button className="flex-1" onClick={goToMenu}>
              Baska Meydan Okuma
            </Button>
          </div>
        </Card>

        {/* Challenge History */}
        {challengeStats.played > 0 && (
          <Card className="mt-6 text-left">
            <h3 className="font-heading font-bold text-sm text-text dark:text-dark-text mb-3 flex items-center gap-2">
              <Icon name="chart" size={16} className="text-primary" />
              Istatistikler
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-surface-alt dark:bg-dark-elevated rounded-xl">
                <p className="font-heading font-bold text-lg text-text dark:text-dark-text">{challengeStats.played}</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Toplam</p>
              </div>
              <div className="text-center p-3 bg-surface-alt dark:bg-dark-elevated rounded-xl">
                <p className="font-heading font-bold text-lg text-text dark:text-dark-text">{challengeStats.won}</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Kazanilan</p>
              </div>
              <div className="text-center p-3 bg-surface-alt dark:bg-dark-elevated rounded-xl">
                <p className="font-heading font-bold text-lg text-text dark:text-dark-text">
                  {Math.round((challengeStats.won / Math.max(challengeStats.played, 1)) * 100)}%
                </p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Oran</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    )
  }

  // Fallback
  return null
}
