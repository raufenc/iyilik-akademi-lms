import { useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Icon from '../ui/Icon'

/**
 * Interactive Review — shows interaktifDuraklamalar as a step between video and postQuiz.
 * Supports: bilgi_karti (info), dogru_yanlis (true/false), coktan_secmeli (multiple choice)
 */
export default function InteractiveReview({ items, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  if (!items || items.length === 0) {
    onComplete(0, 0)
    return null
  }

  const item = items[current]
  const isLast = current === items.length - 1
  const totalQuestions = items.filter(i => i.tip !== 'bilgi_karti').length

  function handleNext() {
    setSelected(null)
    setShowResult(false)
    if (isLast) {
      onComplete(score, totalQuestions)
    } else {
      setCurrent(current + 1)
    }
  }

  function handleConfirm() {
    if (item.tip === 'dogru_yanlis') {
      const isCorrect = (selected === 0) === item.dogruCevap
      if (isCorrect) setScore(s => s + 1)
    } else if (item.tip === 'coktan_secmeli') {
      const correctIdx = item.secenekler.findIndex(s => s.dogruMu)
      if (selected === correctIdx) setScore(s => s + 1)
    }
    setShowResult(true)
  }

  // Calculate correct answer and feedback
  let isCorrect = false
  let feedback = ''
  if (showResult) {
    if (item.tip === 'dogru_yanlis') {
      isCorrect = (selected === 0) === item.dogruCevap
      feedback = isCorrect ? item.geriBildirimDogru : item.geriBildirimYanlis
    } else if (item.tip === 'coktan_secmeli') {
      const correctIdx = item.secenekler.findIndex(s => s.dogruMu)
      isCorrect = selected === correctIdx
      feedback = isCorrect ? item.geriBildirimDogru : item.geriBildirimYanlis
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">Video Ici Sorular</h2>
        <p className="text-sm text-text-muted">Videodan ogrendiklerini pekistir</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < current ? 'bg-secondary' :
              i === current ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Info Card */}
      {item.tip === 'bilgi_karti' && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <span className="mb-3 block">
              <Icon name="bulb" size={32} className="text-amber-500 mx-auto" />
            </span>
            <p className="text-xs text-text-muted mb-2 font-medium">Biliyor muydun?</p>
            <p className="text-sm leading-relaxed">{item.metin}</p>
          </div>
          <div className="mt-5 text-center">
            <Button onClick={handleNext}>
              {isLast ? 'Tamamla' : 'Devam Et'}
            </Button>
          </div>
        </Card>
      )}

      {/* True/False Question */}
      {item.tip === 'dogru_yanlis' && (
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6">
          <p className="text-xs text-text-muted mb-2 flex items-center gap-1.5">
            <Icon name="check" size={14} className="text-secondary" />
            <Icon name="close" size={14} className="text-danger" />
            Dogru mu, Yanlis mi?
          </p>
          <h3 className="font-semibold text-lg mb-5">{item.soruMetni}</h3>

          <div className="grid grid-cols-2 gap-3">
            {['Dogru', 'Yanlis'].map((label, idx) => {
              let cls = 'border-border hover:border-primary/40 hover:bg-primary/5'
              const correctIdx = item.dogruCevap ? 0 : 1

              if (showResult) {
                if (idx === correctIdx) cls = 'border-secondary bg-secondary/10'
                else if (idx === selected && idx !== correctIdx) cls = 'border-danger bg-danger/10'
                else cls = 'border-border opacity-50'
              } else if (selected === idx) {
                cls = 'border-primary bg-primary/5 ring-2 ring-primary/20'
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && setSelected(idx)}
                  disabled={showResult}
                  className={`px-4 py-4 rounded-xl border text-base font-medium transition-all ${cls}`}
                >
                  <span className="mb-1 block">
                    {idx === 0
                      ? <Icon name="check" size={28} className="text-secondary mx-auto" />
                      : <Icon name="close" size={28} className="text-danger mx-auto" />
                    }
                  </span>
                  {label}
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              isCorrect ? 'bg-secondary/10 text-secondary' : 'bg-danger/10 text-danger'
            }`}>
              {feedback}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            {!showResult ? (
              <Button onClick={handleConfirm} disabled={selected === null}>
                Kontrol Et
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {isLast ? 'Tamamla' : 'Devam Et'}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Multiple Choice Question */}
      {item.tip === 'coktan_secmeli' && (
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6">
          <p className="text-xs text-text-muted mb-2 flex items-center gap-1.5">
            <Icon name="sparkle" size={14} className="text-accent" />
            Coktan secmeli
          </p>
          <h3 className="font-semibold text-lg mb-5">{item.soruMetni}</h3>

          <div className="space-y-3">
            {item.secenekler.map((opt, idx) => {
              const correctIdx = item.secenekler.findIndex(s => s.dogruMu)
              let cls = 'border-border hover:border-primary/40 hover:bg-primary/5'

              if (showResult) {
                if (idx === correctIdx) cls = 'border-secondary bg-secondary/10'
                else if (idx === selected && idx !== correctIdx) cls = 'border-danger bg-danger/10'
                else cls = 'border-border opacity-50'
              } else if (selected === idx) {
                cls = 'border-primary bg-primary/5 ring-2 ring-primary/20'
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && setSelected(idx)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls}`}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                      selected === idx && !showResult ? 'bg-primary text-white border-primary' :
                      showResult && idx === correctIdx ? 'bg-secondary text-white border-secondary' :
                      showResult && idx === selected ? 'bg-danger text-white border-danger' :
                      'border-border text-text-muted'
                    }`}>
                      {opt.id || String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.metin}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              isCorrect ? 'bg-secondary/10 text-secondary' : 'bg-danger/10 text-danger'
            }`}>
              {feedback}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            {!showResult ? (
              <Button onClick={handleConfirm} disabled={selected === null}>
                Kontrol Et
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {isLast ? 'Tamamla' : 'Devam Et'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
