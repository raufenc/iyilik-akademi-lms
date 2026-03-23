import { useState, useEffect } from 'react'
import Button from '../ui/Button'

// Confetti particle component
function ConfettiParticle({ delay, color }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${20 + Math.random() * 60}%`,
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

const CONFETTI_COLORS = ['#6C5CE7', '#A29BFE', '#00B894', '#55EFC4', '#FDCB6E', '#F9A825', '#E17055', '#FAB1A0']

export default function QuizView({ questions, onComplete, title, subtitle }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animateQuestion, setAnimateQuestion] = useState(true)

  const q = questions[currentQ]
  const isTrueFalse = q.tip === 'dogru_yanlis'
  const options = isTrueFalse
    ? ['Doğru', 'Yanlış']
    : (q.options || q.secenekler?.map(s => s.metin) || [])

  const correctIndex = isTrueFalse
    ? (q.dogruCevap === true ? 0 : 1)
    : (q.correct ?? q.secenekler?.findIndex(s => s.dogru_mu) ?? 0)

  function handleSelect(idx) {
    if (showResult) return
    setSelected(idx)
  }

  function handleConfirm() {
    const isCorrect = selected === correctIndex
    if (isCorrect) {
      setScore(score + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500)
    }
    setShowResult(true)
  }

  function handleNext() {
    if (currentQ + 1 < questions.length) {
      setAnimateQuestion(false)
      setTimeout(() => {
        setCurrentQ(currentQ + 1)
        setSelected(null)
        setShowResult(false)
        setAnimateQuestion(true)
      }, 50)
    } else {
      onComplete(score, questions.length)
    }
  }

  const isCorrect = selected === correctIndex
  const feedbackText = showResult
    ? isCorrect
      ? (q.geriDogruBildirim || q.geri_bildirim_dogru || 'Doğru! Harika!')
      : (q.geriYanlisBildirim || q.geri_bildirim_yanlis || `Yanlış. Doğru cevap: ${options[correctIndex]}`)
    : ''

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-heading text-xl font-bold">{title}</h2>
        <p className="text-sm text-text-muted mt-1">{subtitle}</p>
      </div>

      {/* Progress Bar — Segmented */}
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
      <div className={`relative bg-white rounded-3xl border border-border-light p-7 shadow-soft overflow-hidden ${
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

        {/* Question number badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            Soru {currentQ + 1} / {questions.length}
          </span>
          {score > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/>
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {score} doğru
            </span>
          )}
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
                      isTrueFalse ? (idx === 0 ? '✓' : '✗') : String.fromCharCode(65 + idx)
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
              {currentQ + 1 < questions.length ? 'Sonraki Soru →' : 'Tamamla ✨'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
