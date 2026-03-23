const STEPS = [
  { id: 'intro', label: 'Giriş', icon: '📖' },
  { id: 'preQuiz', label: 'Ön Quiz', icon: '📝' },
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'interactive', label: 'Pekiştir', icon: '💡' },
  { id: 'postQuiz', label: 'Son Quiz', icon: '🎯' },
  { id: 'done', label: 'Tamamla', icon: '⭐' },
]

export default function LessonSteps({ currentStep, hasIntro = true, hasInteractive = true }) {
  let steps = STEPS
  if (!hasIntro) steps = steps.filter(s => s.id !== 'intro')
  if (!hasInteractive) steps = steps.filter(s => s.id !== 'interactive')

  const currentIdx = steps.findIndex(s => s.id === currentStep)

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            i < currentIdx ? 'bg-secondary/10 text-secondary' :
            i === currentIdx ? 'bg-primary/10 text-primary ring-2 ring-primary/20' :
            'bg-surface-alt text-text-muted'
          }`}>
            <span>{i < currentIdx ? '✅' : step.icon}</span>
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-6 h-0.5 mx-1 ${i < currentIdx ? 'bg-secondary' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
