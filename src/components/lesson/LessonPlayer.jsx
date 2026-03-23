import { useState, useEffect, useRef } from 'react'
import Button from '../ui/Button'

const MINIMUM_WATCH_SECONDS = 60

export default function LessonPlayer({ driveId, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(MINIMUM_WATCH_SECONDS)
  const [unlocked, setUnlocked] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setUnlocked(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-6">
        <iframe
          src={`https://drive.google.com/file/d/${driveId}/preview`}
          width="100%"
          height="100%"
          allow="autoplay"
          allowFullScreen
          className="border-0"
        />
      </div>
      <div className="text-center">
        {!unlocked ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-primary animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-medium text-primary">
                Videoyu izlemeye devam et ({secondsLeft}s)
              </span>
            </div>
            <p className="text-xs text-text-muted">Video izleme süresi dolunca devam edebilirsin</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-secondary font-medium">Video izleme tamamlandı!</p>
            <Button onClick={onComplete} size="lg">
              Devam Et
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
