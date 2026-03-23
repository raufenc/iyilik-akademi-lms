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

  const progress = ((MINIMUM_WATCH_SECONDS - secondsLeft) / MINIMUM_WATCH_SECONDS) * 100

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Video container */}
      <div className="relative rounded-3xl overflow-hidden shadow-medium bg-surface-dark">
        <div className="aspect-video">
          <iframe
            src={`https://drive.google.com/file/d/${driveId}/preview`}
            width="100%"
            height="100%"
            allow="autoplay"
            allowFullScreen
            className="border-0"
          />
        </div>

        {/* Progress overlay at bottom */}
        {!unlocked && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Status area */}
      <div className="mt-6 text-center">
        {!unlocked ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-2xl">
              {/* Circular progress */}
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6C5CE7" strokeWidth="3" strokeDasharray={`${progress}, 100`} strokeLinecap="round" className="transition-all duration-1000 ease-linear" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                  {secondsLeft}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-text">Videoyu izlemeye devam et</p>
                <p className="text-xs text-text-muted">{secondsLeft} saniye kaldı</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-bounce-in">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2.5 rounded-2xl">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/>
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-semibold">Video tamamlandı!</span>
            </div>
            <div>
              <Button onClick={onComplete} size="lg">
                Devam Et →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
