export default function ProgressBar({ value = 0, max = 100, color = 'bg-primary', size = 'md', showLabel = false }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

  return (
    <div className="w-full">
      <div className={`w-full bg-border dark:bg-dark-border rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-text-muted mt-1 text-right">{Math.round(pct)}%</p>
      )}
    </div>
  )
}
