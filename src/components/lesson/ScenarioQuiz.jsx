import { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function ScenarioQuiz({ scenarios, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState([]) // track answers per scenario
  const [finished, setFinished] = useState(false)

  if (!scenarios || scenarios.length === 0) return null

  const scenario = scenarios[currentIdx]
  const options = scenario?.secenekler || scenario?.options || []
  const bestIdx = options.findIndex(o => o.enIyi || o.best)
  const currentAnswer = answered[currentIdx] ?? null

  function handleSelect(idx) {
    if (currentAnswer !== null) return
    setSelected(idx)
  }

  function handleConfirm() {
    if (selected === null) return
    const newAnswered = [...answered]
    newAnswered[currentIdx] = selected
    setAnswered(newAnswered)
    setSelected(null)
  }

  function handleNext() {
    if (currentIdx + 1 < scenarios.length) {
      setSelected(null)
      setCurrentIdx(currentIdx + 1)
    } else {
      setFinished(true)
    }
  }

  function handleFinish() {
    onComplete?.()
  }

  // Summary screen
  if (finished) {
    const bestCount = answered.filter((ans, i) => {
      const opts = scenarios[i]?.secenekler || scenarios[i]?.options || []
      const bi = opts.findIndex(o => o.enIyi || o.best)
      return ans === bi
    }).length

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card className="text-center py-10">
          <div className="text-5xl mb-4">
            {bestCount === scenarios.length ? '🌟' : bestCount >= scenarios.length / 2 ? '👏' : '💪'}
          </div>
          <h2 className="font-heading text-2xl font-bold mb-3">
            Senaryolar Tamamlandı!
          </h2>
          <p className="text-text-muted dark:text-dark-text-muted mb-2">
            {scenarios.length} senaryodan {bestCount} tanesinde en iyi seçimi yaptın.
          </p>
          <p className="text-sm text-text-muted dark:text-dark-text-muted mb-6 max-w-md mx-auto leading-relaxed">
            {bestCount === scenarios.length
              ? 'Mükemmel! Her durumda en doğru kararı verdin. Bu ahlâkî olgunluk çok kıymetli.'
              : bestCount >= scenarios.length / 2
                ? 'Güzel gidiyorsun! Ahlâkî muhakeme yeteneğin gelişiyor. Öğrenmeye devam et.'
                : 'Her deneyim bir öğrenme fırsatıdır. Bu senaryoları tekrar düşünmek seni daha da güçlendirecek.'}
          </p>
          <Button onClick={handleFinish} size="lg">
            Devam Et ✨
          </Button>
        </Card>
      </div>
    )
  }

  const isAnswered = currentAnswer !== null
  const displaySelected = isAnswered ? currentAnswer : selected
  const feedbackObj = isAnswered ? options[currentAnswer] : null

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-heading text-xl font-bold">Senaryo Değerlendirmesi</h2>
        <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
          Durumu oku ve en uygun tepkiyi seç
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {scenarios.map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full overflow-hidden bg-border-light dark:bg-dark-border">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                i < currentIdx ? 'bg-secondary w-full'
                  : i === currentIdx ? 'bg-primary w-full'
                    : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Scenario Card */}
      <div className="animate-fade-in">
        {/* Situation */}
        <Card className="mb-4 border-l-4 border-l-primary bg-primary/3 dark:bg-primary/5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">📖</span>
            <div>
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-2">
                Senaryo {currentIdx + 1} / {scenarios.length}
              </span>
              <p className="text-sm leading-relaxed font-medium">
                {scenario.durum || scenario.situation}
              </p>
            </div>
          </div>
        </Card>

        {/* Question */}
        <Card className="mb-4">
          <h3 className="font-heading font-semibold text-lg leading-relaxed mb-5">
            {scenario.soru || scenario.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {options.map((opt, idx) => {
              const isBest = idx === bestIdx
              const isSelected = displaySelected === idx
              const optText = opt.metin || opt.text || opt

              let cls = 'border-border-light dark:border-dark-border hover:border-primary/30 hover:bg-primary/3 hover:shadow-sm'
              let badgeCls = 'border-border-light dark:border-dark-border text-text-muted dark:text-dark-text-muted bg-surface-alt dark:bg-dark-elevated'

              if (isAnswered) {
                if (isBest) {
                  cls = 'border-secondary bg-secondary/8 dark:bg-secondary/15 shadow-sm shadow-secondary/10'
                  badgeCls = 'bg-secondary text-white border-secondary'
                } else if (isSelected && !isBest) {
                  cls = 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                  badgeCls = 'bg-amber-500 text-white border-amber-500'
                } else {
                  cls = 'border-border-light dark:border-dark-border opacity-40'
                }
              } else if (isSelected) {
                cls = 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/15 shadow-sm shadow-primary/10'
                badgeCls = 'bg-primary text-white border-primary'
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm transition-all duration-200 ${cls}`}
                >
                  <span className="inline-flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 shrink-0 ${badgeCls}`}>
                      {isAnswered && isBest ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </span>
                    <span className={isAnswered && isBest ? 'font-semibold' : ''}>
                      {optText}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {isAnswered && feedbackObj && (
            <div className="mt-5 space-y-3 animate-slide-up">
              {/* Selected option feedback */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed flex items-start gap-3 ${
                currentAnswer === bestIdx
                  ? 'bg-secondary/10 dark:bg-secondary/15 text-secondary-dark dark:text-secondary'
                  : 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
              }`}>
                <span className="text-lg shrink-0 mt-0.5">
                  {currentAnswer === bestIdx ? '⭐' : '💡'}
                </span>
                <span>
                  {feedbackObj.geriBildirim || feedbackObj.feedback || ''}
                </span>
              </div>

              {/* If not best, show what the best answer was */}
              {currentAnswer !== bestIdx && bestIdx >= 0 && (
                <div className="p-4 rounded-2xl text-sm leading-relaxed flex items-start gap-3 bg-secondary/10 dark:bg-secondary/15 text-secondary-dark dark:text-secondary">
                  <span className="text-lg shrink-0 mt-0.5">⭐</span>
                  <span>
                    <strong>En iyi seçim:</strong>{' '}
                    {options[bestIdx]?.metin || options[bestIdx]?.text}{' — '}
                    {options[bestIdx]?.geriBildirim || options[bestIdx]?.feedback || ''}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            {!isAnswered ? (
              <Button onClick={handleConfirm} disabled={selected === null} size="lg">
                Seçimimi Onayla
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg">
                {currentIdx + 1 < scenarios.length ? 'Sonraki Senaryo →' : 'Tamamla ✨'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
