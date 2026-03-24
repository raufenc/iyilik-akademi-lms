import { useState, useRef } from 'react'

export default function FlashCard({
  question,
  answer,
  explanation,
  status = 'unreviewed', // 'unreviewed' | 'known' | 'needs_review'
  onKnown,
  onNeedsReview,
  index,
  total,
}) {
  const [flipped, setFlipped] = useState(false)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const statusColors = {
    unreviewed: 'border-border-light dark:border-dark-border',
    known: 'border-secondary/40 bg-secondary/3 dark:border-secondary/30',
    needs_review: 'border-accent/40 bg-accent/3 dark:border-accent/30',
  }

  const statusBadge = {
    unreviewed: null,
    known: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary/10 text-secondary dark:bg-secondary/20">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Biliyorum
      </span>
    ),
    needs_review: (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent-dark dark:bg-accent/20 dark:text-accent">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 4v6h6" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Tekrar
      </span>
    ),
  }

  function handleFlip() {
    setFlipped(!flipped)
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    const diffY = e.changedTouches[0].clientY - touchStartY.current

    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && flipped) {
        // Swipe right = known
        onKnown?.()
        setFlipped(false)
      } else if (diffX < 0 && flipped) {
        // Swipe left = needs review
        onNeedsReview?.()
        setFlipped(false)
      }
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card counter */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-text-muted dark:text-dark-text-muted">
          Kart {index + 1} / {total}
        </span>
        {statusBadge[status]}
      </div>

      {/* 3D Flip Container */}
      <div
        className="relative w-full cursor-pointer select-none"
        style={{ perspective: '1200px', minHeight: '280px' }}
        onClick={handleFlip}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '280px',
          }}
        >
          {/* Front - Question */}
          <div
            className={`absolute inset-0 rounded-3xl border-2 p-7 shadow-soft dark:shadow-dark-soft flex flex-col ${statusColors[status]} bg-white dark:bg-dark-card`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <p className="font-heading font-semibold text-lg leading-relaxed text-text dark:text-dark-text">
                {question}
              </p>
            </div>
            <div className="text-center mt-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-text-muted dark:text-dark-text-muted">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 15l-2 5L9 9l11 4-5 2z"/>
                </svg>
                Cevabi gormek icin tikla
              </span>
            </div>
          </div>

          {/* Back - Answer */}
          <div
            className={`absolute inset-0 rounded-3xl border-2 p-7 shadow-soft dark:shadow-dark-soft flex flex-col ${statusColors[status]} bg-white dark:bg-dark-card`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 dark:bg-secondary/15 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p className="font-heading font-bold text-lg text-secondary dark:text-secondary-light mb-3">
                {answer}
              </p>
              {explanation && (
                <p className="text-sm text-text-light dark:text-dark-text-muted leading-relaxed max-w-sm">
                  {explanation}
                </p>
              )}
            </div>

            {/* Action buttons on the back */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setFlipped(false)
                  onNeedsReview?.()
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-danger/30 text-danger bg-danger/5 hover:bg-danger/10 dark:border-danger/40 dark:bg-danger/10 dark:hover:bg-danger/20 font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                </svg>
                Tekrar Et
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setFlipped(false)
                  onKnown?.()
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-secondary/30 text-secondary bg-secondary/5 hover:bg-secondary/10 dark:border-secondary/40 dark:bg-secondary/10 dark:hover:bg-secondary/20 font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Biliyorum
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe hint on mobile */}
      <p className="text-center text-[11px] text-text-muted dark:text-dark-text-muted mt-3 sm:hidden">
        Saga kaydir = Biliyorum &middot; Sola kaydir = Tekrar Et
      </p>
    </div>
  )
}
