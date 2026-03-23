import { useState } from 'react'
import Button from '../ui/Button'

export default function QuizView({ questions, onComplete, title, subtitle }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  const q = questions[currentQ]

  function handleSelect(idx) {
    if (showResult) return
    setSelected(idx)
  }

  function handleConfirm() {
    const isCorrect = selected === q.correct
    const newScore = isCorrect ? score + 1 : score
    setScore(newScore)
    setAnswers([...answers, { selected, correct: q.correct, isCorrect }])
    setShowResult(true)
  }

  function handleNext() {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1)
      setSelected(null)
      setShowResult(false)
    } else {
      onComplete(score + (selected === q.correct ? 1 : 0), questions.length)
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-text-muted">{subtitle}</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentQ ? 'bg-secondary' :
              i === currentQ ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <p className="text-xs text-text-muted mb-2">Soru {currentQ + 1} / {questions.length}</p>
        <h3 className="font-semibold text-lg mb-5">{q.q}</h3>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let cls = 'border-border hover:border-primary/40 hover:bg-primary/5'
            if (showResult) {
              if (idx === q.correct) cls = 'border-secondary bg-secondary/10'
              else if (idx === selected && idx !== q.correct) cls = 'border-danger bg-danger/10'
              else cls = 'border-border opacity-50'
            } else if (selected === idx) {
              cls = 'border-primary bg-primary/5 ring-2 ring-primary/20'
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                    selected === idx && !showResult ? 'bg-primary text-white border-primary' :
                    showResult && idx === q.correct ? 'bg-secondary text-white border-secondary' :
                    showResult && idx === selected ? 'bg-danger text-white border-danger' :
                    'border-border text-text-muted'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </span>
              </button>
            )
          })}
        </div>

        {showResult && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            selected === q.correct ? 'bg-secondary/10 text-secondary' : 'bg-danger/10 text-danger'
          }`}>
            {selected === q.correct ? 'Doğru! Harika!' : `Yanlış. Doğru cevap: ${q.options[q.correct]}`}
          </div>
        )}

        <div className="mt-5 flex justify-end">
          {!showResult ? (
            <Button onClick={handleConfirm} disabled={selected === null}>
              Kontrol Et
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQ + 1 < questions.length ? 'Sonraki Soru' : 'Tamamla'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
