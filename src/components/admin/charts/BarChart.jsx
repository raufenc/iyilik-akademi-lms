import { useState, useEffect, useRef } from 'react'

export default function BarChart({ data = [], height = 260, title = '', horizontal = false }) {
  const [animated, setAnimated] = useState(false)
  const [tooltip, setTooltip] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [data])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-sm text-text-muted">Veri bulunamadı</p>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value), 1)
  const padding = { top: 24, right: 16, bottom: 52, left: 48 }
  const svgWidth = 100 // percentage-based
  const chartHeight = height - padding.top - padding.bottom
  const barGap = 4

  // Grid lines
  const gridLines = 5
  const gridValues = Array.from({ length: gridLines }, (_, i) => Math.round((maxValue / (gridLines - 1)) * i))

  return (
    <div ref={containerRef} className="w-full">
      {title && (
        <h3 className="text-sm font-semibold text-text mb-3">{title}</h3>
      )}
      <div className="relative" style={{ height }}>
        <svg
          viewBox={`0 0 600 ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full"
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Grid lines */}
          {gridValues.map((val, i) => {
            const y = padding.top + chartHeight - (val / maxValue) * chartHeight
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={600 - padding.right}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="0.5"
                  strokeDasharray="4,4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px]"
                  fill="#9ca3af"
                  style={{ fontSize: '10px' }}
                >
                  {val}
                </text>
              </g>
            )
          })}

          {/* Bars */}
          {data.map((item, i) => {
            const barWidth = (600 - padding.left - padding.right - barGap * (data.length + 1)) / data.length
            const x = padding.left + barGap + i * (barWidth + barGap)
            const barHeight = animated ? (item.value / maxValue) * chartHeight : 0
            const y = padding.top + chartHeight - barHeight
            const color = item.color || '#6366f1'
            const gradientId = `bar-grad-${i}`

            return (
              <g
                key={i}
                onMouseEnter={() => setTooltip({ x: x + barWidth / 2, y: y - 8, label: item.label, value: item.value })}
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: 'pointer' }}
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={Math.min(barWidth / 4, 6)}
                  fill={`url(#${gradientId})`}
                  style={{
                    transition: 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), y 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
                {/* Hover overlay */}
                <rect
                  x={x}
                  y={padding.top}
                  width={barWidth}
                  height={chartHeight}
                  fill="transparent"
                />
                {/* Label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 12}
                  textAnchor="middle"
                  fill="#6b7280"
                  style={{ fontSize: '9px' }}
                >
                  {item.label?.length > 12 ? item.label.slice(0, 11) + '..' : item.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none z-20"
            style={{
              left: `${(tooltip.x / 600) * 100}%`,
              top: `${(tooltip.y / height) * 100}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              <div className="font-semibold">{tooltip.label}</div>
              <div className="text-gray-300">{tooltip.value.toLocaleString('tr-TR')}</div>
            </div>
            <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>
    </div>
  )
}
