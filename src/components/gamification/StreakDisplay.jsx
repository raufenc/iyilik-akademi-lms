import { useProgress } from '../../contexts/ProgressContext'
import { Link } from 'react-router-dom'

const DAY_LABELS = ['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt', 'Paz']

// Compact version for Navbar
export function StreakBadge() {
  const { streakData, isActiveToday } = useProgress()
  const streak = streakData.streak || 0

  // If streak is 0 and not active today, show muted
  const isHot = isActiveToday && streak > 0

  return (
    <Link
      to="/gunluk-quiz"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full no-underline transition-all duration-300 ${
        isHot
          ? 'bg-gradient-to-r from-orange-100 to-red-50 border border-orange-200/60'
          : 'bg-surface-alt border border-border-light hover:border-orange-200'
      }`}
      title={isActiveToday ? `${streak} gunluk seri!` : 'Bugun henuz aktif degilsin'}
    >
      <span className={`text-base ${isHot ? 'animate-pulse' : 'opacity-50 grayscale'}`}>
        {'\uD83D\uDD25'}
      </span>
      <span className={`text-sm font-bold tabular-nums ${
        isHot ? 'text-orange-600' : 'text-text-muted'
      }`}>
        {streak}
      </span>
    </Link>
  )
}

// Full version for Dashboard
export function StreakCard() {
  const { streakData, isActiveToday, getWeekDays, getTodayStr } = useProgress()
  const streak = streakData.streak || 0
  const longestStreak = streakData.longestStreak || 0
  const activeDays = streakData.activeDays || []
  const weekDays = getWeekDays()
  const today = getTodayStr()

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border p-6 shadow-soft dark:shadow-dark-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
            isActiveToday
              ? 'bg-gradient-to-br from-orange-100 to-red-100 shadow-lg shadow-orange-200/40'
              : 'bg-surface-alt'
          }`}>
            <span className={isActiveToday ? 'streak-fire' : 'grayscale opacity-40'}>
              {'\uD83D\uDD25'}
            </span>
          </div>
          <div>
            <p className="font-heading font-bold text-2xl leading-tight">
              {streak} <span className="text-base font-medium text-text-muted">gun</span>
            </p>
            <p className="text-xs text-text-muted">
              {isActiveToday
                ? 'Harika, bugun aktifsin!'
                : streak > 0
                  ? 'Seriyi kaybetmemek icin bugun bir ders yap!'
                  : 'Yeni bir seri baslatmak icin ders yap!'}
            </p>
          </div>
        </div>

        {/* Longest streak badge */}
        {longestStreak > 0 && (
          <div className="text-center px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200/50">
            <p className="text-xs text-amber-600 font-medium">En uzun</p>
            <p className="text-lg font-bold text-amber-700">{longestStreak}</p>
          </div>
        )}
      </div>

      {/* Warning banner */}
      {!isActiveToday && streak > 0 && (
        <Link
          to="/gunluk-quiz"
          className="flex items-center gap-2 p-3 mb-4 bg-amber-50 border border-amber-200/60 rounded-xl text-sm text-amber-700 no-underline hover:bg-amber-100 transition-colors"
        >
          <span>{'\u26A0\uFE0F'}</span>
          <span className="font-medium">Bugun henuz ders yapmadiniz! Seriyi korumak icin gunluk quiz coz.</span>
          <span className="ml-auto text-amber-500">{'\u2192'}</span>
        </Link>
      )}

      {/* Weekly Calendar */}
      <div className="flex gap-2 justify-between">
        {weekDays.map((day, i) => {
          const isActive = activeDays.includes(day)
          const isToday = day === today
          const isFuture = day > today

          return (
            <div key={day} className="flex-1 text-center">
              <p className={`text-[10px] font-medium mb-1.5 ${isToday ? 'text-primary' : 'text-text-muted'}`}>
                {DAY_LABELS[i]}
              </p>
              <div className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-orange-400 to-red-400 text-white shadow-md shadow-orange-300/40 scale-110'
                  : isToday
                    ? 'bg-primary/10 border-2 border-primary/30 border-dashed'
                    : isFuture
                      ? 'bg-surface-alt/50'
                      : 'bg-surface-alt'
              }`}>
                {isActive ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : isToday ? (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick action */}
      {!isActiveToday && (
        <Link
          to="/gunluk-quiz"
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold text-sm no-underline shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          {'\uD83C\uDFAF'} Günlük Quiz Coz
        </Link>
      )}

      <style>{`
        .streak-fire {
          animation: streakPulse 2s ease-in-out infinite;
        }
        @keyframes streakPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.15); filter: brightness(1.2); }
        }
      `}</style>
    </div>
  )
}
