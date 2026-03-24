// Skeleton loading placeholders with shimmer animation

function SkeletonBase({ className = '', style = {} }) {
  return (
    <div
      className={`skeleton-purple ${className}`}
      style={style}
    />
  )
}

// Text line placeholder - configurable width
export function SkeletonText({ width = '100%', height = '16px', className = '' }) {
  return (
    <SkeletonBase
      className={`${className}`}
      style={{ width, height, borderRadius: '6px' }}
    />
  )
}

// Circle placeholder for avatars
export function SkeletonAvatar({ size = 48, className = '' }) {
  return (
    <SkeletonBase
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size, borderRadius: '50%' }}
    />
  )
}

// Lesson card placeholder
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border p-6 shadow-soft ${className}`}>
      {/* Icon area */}
      <SkeletonBase className="mb-4" style={{ width: 56, height: 56, borderRadius: '16px' }} />
      {/* Title */}
      <SkeletonText width="75%" height="20px" className="mb-3" />
      {/* Subtitle */}
      <SkeletonText width="90%" height="14px" className="mb-2" />
      <SkeletonText width="60%" height="14px" className="mb-4" />
      {/* Progress bar area */}
      <SkeletonText width="100%" height="8px" className="mb-2" />
      {/* Footer row */}
      <div className="flex items-center justify-between mt-3">
        <SkeletonText width="60px" height="12px" />
        <SkeletonText width="40px" height="12px" />
      </div>
    </div>
  )
}

// Full dashboard skeleton layout
export function SkeletonDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero banner */}
      <SkeletonBase
        className="w-full"
        style={{ height: 180, borderRadius: '24px' }}
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border p-6 shadow-soft text-center">
            <SkeletonBase className="mx-auto mb-3" style={{ width: 48, height: 48, borderRadius: '16px' }} />
            <SkeletonText width="60%" height="28px" className="mx-auto mb-2" />
            <SkeletonText width="40%" height="12px" className="mx-auto" />
          </div>
        ))}
      </div>

      {/* XP progress card */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <SkeletonText width="150px" height="16px" />
          <SkeletonText width="80px" height="14px" />
        </div>
        <SkeletonText width="100%" height="12px" />
      </div>

      {/* Next lesson card */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <SkeletonBase className="shrink-0" style={{ width: 64, height: 64, borderRadius: '16px' }} />
          <div className="flex-1">
            <SkeletonText width="80px" height="12px" className="mb-2" />
            <SkeletonText width="200px" height="20px" className="mb-1" />
            <SkeletonText width="150px" height="14px" />
          </div>
          <SkeletonBase className="shrink-0" style={{ width: 80, height: 40, borderRadius: '12px' }} />
        </div>
      </div>
    </div>
  )
}

// Leaderboard skeleton
export function SkeletonLeaderboard() {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="text-center mb-8">
        <SkeletonText width="260px" height="32px" className="mx-auto mb-2" />
        <SkeletonText width="200px" height="16px" className="mx-auto" />
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-3 mb-8 px-4">
        {[120, 160, 100].map((h, i) => (
          <SkeletonBase
            key={i}
            style={{ width: i === 1 ? 160 : 140, height: h, borderRadius: '16px' }}
          />
        ))}
      </div>

      {/* List */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border shadow-soft overflow-hidden">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-border-light last:border-b-0">
            <SkeletonText width="32px" height="20px" />
            <SkeletonAvatar size={40} />
            <div className="flex-1">
              <SkeletonText width="120px" height="14px" className="mb-1" />
              <SkeletonText width="80px" height="12px" />
            </div>
            <div className="text-right">
              <SkeletonText width="50px" height="14px" className="mb-1" />
              <SkeletonText width="24px" height="12px" className="ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Lessons page skeleton
export function SkeletonLessons() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <SkeletonText width="180px" height="28px" className="mb-2" />
            <SkeletonText width="240px" height="16px" />
          </div>
          <SkeletonBase style={{ width: 288, height: 48, borderRadius: '12px' }} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}

// Default export for generic skeleton block
export default function Skeleton({ width, height, rounded = 'lg', className = '' }) {
  const radiusMap = {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  }

  return (
    <SkeletonBase
      className={className}
      style={{
        width: width || '100%',
        height: height || '20px',
        borderRadius: radiusMap[rounded] || rounded,
      }}
    />
  )
}
