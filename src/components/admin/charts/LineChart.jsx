import { useState, useEffect, useRef } from 'react'

function smoothPath(points) {
  if (points.length < 2) return ''
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
  }

  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    const tension = 0.3
    const cp1x = p1.x + (p2.x - p0.x) * tension
    const cp1y = p1.y + (p2.y - p0.y) * tension
    const cp2x = p2.x - (p3.x - p1.x) * tension
    const cp2y = p2.y - (p3.y - p1.y) * tension

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }
  return path
}

export default function LineChart({ data = [], height = 260, title = '', color = '#6366f1' }) {
  const [animated, setAnimated] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null)
  const pathRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [data])

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [data, animated])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-sm text-text-muted">Veri bulunamadi</p>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value), 1)
  const padding = { top: 24, right: 24, bottom: 52, left: 48 }
  const svgW = 600
  const chartWidth = svgW - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const points = data.map((item, i) => ({
    x: padding.left + (i / Math.max(data.length - 1, 1)) * chartWidth,
    y: padding.top + chartHeight - (item.value / maxValue) * chartHeight,
    label: item.label,
    value: item.value,
  }))

  const linePath = smoothPath(points)

  // Area path (same curve + close at bottom)
  const areaPath = linePath +
    ` L ${points[points.length - 1].x} ${padding.top + chartHeight}` +
    ` L ${points[0].x} ${padding.top + chartHeight} Z`

  // Grid
  const gridLines = 5
  const gridValues = Array.from({ length: gridLines }, (_, i) => Math.round((maxValue / (gridLines - 1)) * i))

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-semibold text-text mb-3">{title}</h3>
      )}
      <div className="relative" style={{ height }}>
        <svg
          viewBox={`0 0 ${svgW} ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="line-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="0.01" />
            </linearGradient>
            <filter id="line-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {gridValues.map((val, i) => {
            const y = padding.top + chartHeight - (val / maxValue) * chartHeight
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgW - padding.right}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="0.5"
                  strokeDasharray="4,4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#9ca3af"
                  style={{ fontSize: '10px' }}
                >
                  {val}
                </text>
              </g>
            )
          })}

          {/* X axis labels */}
          {points.map((p, i) => (
            <text
              key={`label-${i}`}
              x={p.x}
              y={height - 12}
              textAnchor="middle"
              fill="#6b7280"
              style={{ fontSize: '10px' }}
            >
              {data[i].label}
            </text>
          ))}

          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#line-area-grad)"
            opacity={animated ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease' }}
          />

          {/* Line */}
          <path
            ref={pathRef}
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#line-glow)"
            strokeDasharray={pathLength || 2000}
            strokeDashoffset={animated ? 0 : (pathLength || 2000)}
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          {/* Hover columns for interaction */}
          {points.map((p, i) => (
            <rect
              key={`hover-${i}`}
              x={p.x - chartWidth / data.length / 2}
              y={padding.top}
              width={chartWidth / data.length}
              height={chartHeight}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}

          {/* Hover vertical line */}
          {hoverIndex !== null && (
            <line
              x1={points[hoverIndex].x}
              y1={padding.top}
              x2={points[hoverIndex].x}
              y2={padding.top + chartHeight}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.4"
            />
          )}

          {/* Data points */}
          {points.map((p, i) => (
            <g key={`dot-${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={hoverIndex === i ? 6 : 4}
                fill="white"
                stroke={color}
                strokeWidth="2.5"
                opacity={animated ? 1 : 0}
                style={{
                  transition: `opacity 0.3s ease ${0.8 + i * 0.08}s, r 0.15s ease`,
                }}
              />
              {hoverIndex === i && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={10}
                  fill={color}
                  opacity="0.15"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hoverIndex !== null && (
          <div
            className="absolute pointer-events-none z-20"
            style={{
              left: `${(points[hoverIndex].x / svgW) * 100}%`,
              top: `${(points[hoverIndex].y / height) * 100}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              <div className="font-semibold">{points[hoverIndex].label}</div>
              <div className="text-gray-300">{points[hoverIndex].value.toLocaleString('tr-TR')}</div>
            </div>
            <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>
    </div>
  )
}
