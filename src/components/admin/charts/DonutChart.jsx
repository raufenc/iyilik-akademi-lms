import { useState, useEffect } from 'react'

export default function DonutChart({ segments = [], size = 220, title = '' }) {
  const [animated, setAnimated] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [segments])

  if (!segments.length || segments.every(s => s.value === 0)) {
    return (
      <div className="flex items-center justify-center" style={{ height: size }}>
        <p className="text-sm text-text-muted">Veri bulunamadi</p>
      </div>
    )
  }

  const total = segments.reduce((s, seg) => s + seg.value, 0)
  const cx = size / 2
  const cy = size / 2
  const outerRadius = size / 2 - 8
  const innerRadius = outerRadius * 0.62
  const strokeWidth = outerRadius - innerRadius

  // Calculate cumulative angles
  let cumulative = 0
  const arcs = segments.map((seg, i) => {
    const fraction = seg.value / total
    const startAngle = cumulative * 360
    cumulative += fraction
    const endAngle = cumulative * 360
    const circumference = 2 * Math.PI * ((outerRadius + innerRadius) / 2)
    const dashLen = fraction * circumference
    const dashGap = circumference - dashLen

    // For arc path calculation
    const midRadius = (outerRadius + innerRadius) / 2

    return {
      ...seg,
      fraction,
      startAngle,
      endAngle,
      circumference,
      dashLen,
      dashGap,
      midRadius,
      rotation: startAngle - 90,
    }
  })

  const hoveredSeg = hoverIndex !== null ? arcs[hoverIndex] : null

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-semibold text-text mb-3">{title}</h3>
      )}
      <div className="flex flex-col items-center gap-4">
        <div className="relative" style={{ width: size, height: size }}>
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            {/* Background ring */}
            <circle
              cx={cx}
              cy={cy}
              r={(outerRadius + innerRadius) / 2}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {arcs.map((arc, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={arc.midRadius}
                fill="none"
                stroke={arc.color || '#6366f1'}
                strokeWidth={hoverIndex === i ? strokeWidth + 6 : strokeWidth}
                strokeDasharray={animated ? `${arc.dashLen} ${arc.dashGap}` : `0 ${arc.circumference}`}
                strokeLinecap="butt"
                transform={`rotate(${arc.rotation} ${cx} ${cy})`}
                opacity={hoverIndex !== null && hoverIndex !== i ? 0.4 : 1}
                style={{
                  transition: 'stroke-dasharray 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease, stroke-width 0.2s ease',
                  transitionDelay: `${i * 100}ms`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              />
            ))}

            {/* Center text */}
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#111827"
              style={{ fontSize: '28px', fontWeight: '700' }}
            >
              {hoveredSeg ? hoveredSeg.value : total}
            </text>
            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9ca3af"
              style={{ fontSize: '11px' }}
            >
              {hoveredSeg ? hoveredSeg.label : 'Toplam'}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
          {arcs.map((arc, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 cursor-pointer group"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                style={{ backgroundColor: arc.color || '#6366f1' }}
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                {arc.label}
              </span>
              <span className="text-xs font-semibold text-gray-400">
                {arc.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
