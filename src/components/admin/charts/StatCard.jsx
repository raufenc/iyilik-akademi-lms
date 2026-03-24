import { useEffect, useState } from 'react'

const ICONS = {
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  active: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  lessons: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  xp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
}

const GRADIENTS = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-emerald-500 to-emerald-600',
  purple: 'from-violet-500 to-violet-600',
  amber: 'from-amber-500 to-amber-600',
  rose: 'from-rose-500 to-rose-600',
  indigo: 'from-indigo-500 to-indigo-600',
}

const BG_LIGHT = {
  blue: 'bg-blue-50',
  green: 'bg-emerald-50',
  purple: 'bg-violet-50',
  amber: 'bg-amber-50',
  rose: 'bg-rose-50',
  indigo: 'bg-indigo-50',
}

const TEXT_COLORS = {
  blue: 'text-blue-600',
  green: 'text-emerald-600',
  purple: 'text-violet-600',
  amber: 'text-amber-600',
  rose: 'text-rose-600',
  indigo: 'text-indigo-600',
}

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === 0) { setDisplay(0); return }
    let start = 0
    const startTime = performance.now()
    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * value)
      setDisplay(current)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value, duration])

  return <>{display.toLocaleString('tr-TR')}</>
}

export default function StatCard({
  label = '',
  value = 0,
  icon = 'users',
  gradient = 'blue',
  trend = null, // { value: 12, positive: true }
  suffix = '',
}) {
  const IconSvg = ICONS[icon] || ICONS.users

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-soft dark:shadow-dark-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className={`text-3xl font-bold ${TEXT_COLORS[gradient] || 'text-gray-900'} mb-1`}>
            <AnimatedNumber value={value} />
            {suffix && <span className="text-lg ml-0.5">{suffix}</span>}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-emerald-600' : 'text-rose-500'}`}>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className={`w-3.5 h-3.5 ${!trend.positive ? 'rotate-180' : ''}`}
              >
                <path d="M8 4l4 5H4l4-5z" />
              </svg>
              <span>%{Math.abs(trend.value)}</span>
              <span className="text-gray-400 font-normal">gecen haftaya gore</span>
            </div>
          )}
        </div>
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${BG_LIGHT[gradient] || 'bg-gray-50'} ${TEXT_COLORS[gradient] || 'text-gray-600'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {IconSvg}
        </div>
      </div>
    </div>
  )
}
