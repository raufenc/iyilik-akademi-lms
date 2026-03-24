import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import { LEVEL_NAMES } from '../utils/xp'
import Icon from '../components/ui/Icon'

const SECTIONS = [
  { start: 1, end: 10, label: 'Temel Degerler', emoji: '🌱', color: '#00B894' },
  { start: 11, end: 20, label: 'Ileri Degerler', emoji: '⭐', color: '#6C5CE7' },
  { start: 21, end: 30, label: 'Sosyal Degerler', emoji: '🤝', color: '#E17055' },
  { start: 31, end: 40, label: 'Hayat Dersleri', emoji: '🎓', color: '#F9A825' },
]

function getNodeState(lessonId, getLessonStatus, completedCount) {
  const status = getLessonStatus(lessonId)
  if (status === 'completed') return 'completed'
  // Current = first non-completed
  const isAvailable = lessonId <= completedCount + 1
  if (isAvailable && status !== 'completed') return lessonId === completedCount + 1 ? 'current' : 'available'
  return 'locked'
}

// Winding path coordinates for desktop (4 per row, S-curve)
function getDesktopLayout(total) {
  const nodes = []
  const perRow = 4
  const xPositions = [120, 280, 440, 600]
  const rowHeight = 110
  const startY = 80

  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / perRow)
    const col = i % perRow
    // Alternate row direction for S-curve
    const isReversed = row % 2 === 1
    const x = isReversed ? xPositions[perRow - 1 - col] : xPositions[col]
    const y = startY + row * rowHeight
    nodes.push({ x, y, id: i + 1 })
  }
  return nodes
}

// Generate SVG path between nodes
function generatePath(nodes) {
  if (nodes.length < 2) return ''
  let d = `M ${nodes[0].x} ${nodes[0].y}`
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1]
    const curr = nodes[i]
    // Smooth curve between nodes
    const midX = (prev.x + curr.x) / 2
    const midY = (prev.y + curr.y) / 2
    // Use quadratic bezier for gentle curves
    if (Math.abs(prev.x - curr.x) > 10) {
      d += ` Q ${prev.x} ${midY} ${midX} ${midY}`
      d += ` Q ${curr.x} ${midY} ${curr.x} ${curr.y}`
    } else {
      d += ` L ${curr.x} ${curr.y}`
    }
  }
  return d
}

// Desktop Map Node
function MapNode({ node, lesson, state, onClick, isCurrentUser }) {
  const baseSize = 44
  const isSpecialMilestone = node.id % 10 === 0

  return (
    <g
      className={`cursor-pointer transition-all duration-300 ${state === 'locked' ? 'opacity-50' : ''}`}
      onClick={() => (state !== 'locked' ? onClick(lesson.id) : null)}
    >
      {/* Glow for current */}
      {state === 'current' && (
        <>
          <circle cx={node.x} cy={node.y} r={baseSize / 2 + 12} className="fill-primary/20 animate-pulse" />
          <circle cx={node.x} cy={node.y} r={baseSize / 2 + 6} className="fill-primary/10" />
        </>
      )}

      {/* Milestone marker */}
      {isSpecialMilestone && (
        <circle
          cx={node.x}
          cy={node.y}
          r={baseSize / 2 + 4}
          fill="none"
          stroke="#F9A825"
          strokeWidth="3"
          strokeDasharray="4 3"
          className="animate-spin"
          style={{ animationDuration: '20s' }}
        />
      )}

      {/* Node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={baseSize / 2}
        fill={state === 'completed' ? lesson.color : state === 'current' ? '#6C5CE7' : state === 'available' ? '#FFFFFF' : '#CBD5E0'}
        stroke={state === 'completed' ? lesson.color : state === 'current' ? '#6C5CE7' : state === 'available' ? lesson.color : '#A0AEC0'}
        strokeWidth={state === 'current' ? 3 : 2}
        className={`transition-all duration-300 ${state === 'completed' ? 'drop-shadow-md' : ''} ${state === 'current' ? 'animate-pulse' : ''}`}
      />

      {/* Inner content */}
      {state === 'completed' && (
        <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="central" className="fill-white text-sm font-bold" style={{ fontSize: '14px' }}>
          ✓
        </text>
      )}
      {state === 'current' && (
        <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="central" className="fill-white text-lg" style={{ fontSize: '18px' }}>
          {lesson.icon}
        </text>
      )}
      {state === 'available' && (
        <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '16px' }}>
          {lesson.icon}
        </text>
      )}
      {state === 'locked' && (
        <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="central" className="fill-gray-400" style={{ fontSize: '12px' }}>
          🔒
        </text>
      )}

      {/* Lesson number */}
      <text
        x={node.x}
        y={node.y + baseSize / 2 + 14}
        textAnchor="middle"
        className={`text-xs font-medium ${state === 'locked' ? 'fill-gray-400' : 'fill-current'}`}
        style={{ fontSize: '11px', fill: state === 'locked' ? '#A0AEC0' : '#4A5568' }}
      >
        {lesson.title.length > 12 ? lesson.title.slice(0, 12) + '...' : lesson.title}
      </text>

      {/* "Devam Et" label for current */}
      {state === 'current' && (
        <g>
          <rect x={node.x - 32} y={node.y - baseSize / 2 - 28} width={64} height={20} rx={10} fill="#6C5CE7" />
          <text x={node.x} y={node.y - baseSize / 2 - 15} textAnchor="middle" className="fill-white font-bold" style={{ fontSize: '10px' }}>
            Devam Et
          </text>
        </g>
      )}

      {/* Avatar on current lesson */}
      {isCurrentUser && state === 'current' && (
        <g className="animate-milestone-bounce">
          <text x={node.x + baseSize / 2 + 8} y={node.y - 4} style={{ fontSize: '20px' }}>
            🚶
          </text>
        </g>
      )}
    </g>
  )
}

// Section label in SVG
function SectionLabel({ section, y, nodes }) {
  // Place section label at the start of the section
  const firstNode = nodes.find(n => n.id === section.start)
  if (!firstNode) return null

  return (
    <g>
      <rect
        x={10}
        y={firstNode.y - 16}
        width={90}
        height={32}
        rx={16}
        fill={section.color}
        fillOpacity={0.15}
        stroke={section.color}
        strokeWidth={1}
        strokeOpacity={0.3}
      />
      <text
        x={55}
        y={firstNode.y + 2}
        textAnchor="middle"
        style={{ fontSize: '10px', fontWeight: 600, fill: section.color }}
      >
        {section.emoji} {section.label}
      </text>
    </g>
  )
}

// Milestone marker in SVG
function MilestoneMarker({ node, index }) {
  const icons = ['⭐', '🏆', '🔥', '🎓']
  return (
    <g>
      <circle cx={node.x} cy={node.y - baseSize / 2 - 20} r={14} fill="#F9A825" fillOpacity={0.2} />
      <text x={node.x} y={node.y - baseSize / 2 - 16} textAnchor="middle" style={{ fontSize: '16px' }}>
        {icons[index] || '⭐'}
      </text>
    </g>
  )
}

const baseSize = 44

// Mobile card node
function MobileNode({ lesson, state, index, onClick }) {
  return (
    <div
      className={`relative flex items-center gap-4 py-3 ${state === 'locked' ? 'opacity-50' : 'cursor-pointer'}`}
      onClick={() => (state !== 'locked' ? onClick(lesson.id) : null)}
    >
      {/* Vertical line */}
      <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border-light dark:bg-dark-border" />

      {/* Node dot */}
      <div
        className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300
          ${state === 'completed' ? 'border-transparent text-white shadow-md' : ''}
          ${state === 'current' ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-glow animate-pulse' : ''}
          ${state === 'available' ? 'border-border dark:border-dark-border bg-white dark:bg-dark-card' : ''}
          ${state === 'locked' ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800' : ''}
        `}
        style={state === 'completed' ? { backgroundColor: lesson.color } : {}}
      >
        {state === 'completed' && <span className="text-white font-bold">✓</span>}
        {state === 'current' && <span className="text-xl">{lesson.icon}</span>}
        {state === 'available' && <span className="text-lg">{lesson.icon}</span>}
        {state === 'locked' && <span className="text-sm">🔒</span>}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted dark:text-dark-text-muted">#{lesson.id}</span>
          {state === 'current' && (
            <span className="text-[10px] px-2 py-0.5 bg-primary text-white rounded-full font-medium">Siradaki</span>
          )}
        </div>
        <p className={`font-semibold text-sm truncate ${state === 'locked' ? 'text-gray-400 dark:text-gray-500' : 'dark:text-dark-text'}`}>
          {lesson.title}
        </p>
        <p className={`text-xs truncate ${state === 'locked' ? 'text-gray-300 dark:text-gray-600' : 'text-text-muted dark:text-dark-text-muted'}`}>
          {lesson.subtitle}
        </p>
      </div>

      {/* XP badge */}
      {state !== 'locked' && (
        <div className="shrink-0 text-right">
          <span className="text-xs font-medium text-accent-dark">+{lesson.xp} XP</span>
        </div>
      )}
    </div>
  )
}

// Section divider for mobile
function MobileSectionDivider({ section }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-2xl" style={{ backgroundColor: `${section.color}15` }}>
        {section.emoji}
      </div>
      <div>
        <p className="font-heading font-bold text-sm dark:text-dark-text-heading" style={{ color: section.color }}>
          {section.label}
        </p>
        <p className="text-xs text-text-muted dark:text-dark-text-muted">
          Ders {section.start} - {section.end}
        </p>
      </div>
      <div className="flex-1 h-px bg-border-light dark:bg-dark-border" />
    </div>
  )
}

// Tooltip for desktop hover
function LessonTooltip({ lesson, state, position }) {
  if (!position) return null

  return (
    <div
      className="fixed z-50 bg-white dark:bg-dark-card rounded-xl shadow-medium dark:shadow-dark-medium border border-border-light dark:border-dark-border p-4 min-w-[200px] animate-fade-in pointer-events-none"
      style={{ left: position.x + 20, top: position.y - 20 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{lesson.icon}</span>
        <div>
          <p className="font-heading font-bold text-sm dark:text-dark-text-heading">{lesson.title}</p>
          <p className="text-xs text-text-muted dark:text-dark-text-muted">{lesson.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-accent-dark font-medium">+{lesson.xp} XP</span>
        <span className={`px-2 py-0.5 rounded-full font-medium ${
          state === 'completed' ? 'bg-secondary/10 text-secondary' :
          state === 'current' ? 'bg-primary/10 text-primary' :
          state === 'available' ? 'bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300' :
          'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
        }`}>
          {state === 'completed' ? 'Tamamlandi' : state === 'current' ? 'Devam Et' : state === 'available' ? 'Hazir' : 'Kitli'}
        </span>
      </div>
    </div>
  )
}

export default function ProgressMapPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { completedCount, getLessonStatus, totalXP, level } = useProgress()
  const [hoveredLesson, setHoveredLesson] = useState(null)
  const [tooltipPos, setTooltipPos] = useState(null)

  const desktopNodes = useMemo(() => getDesktopLayout(lessons.length), [])
  const desktopPath = useMemo(() => generatePath(desktopNodes), [desktopNodes])
  const svgHeight = useMemo(() => Math.max(...desktopNodes.map(n => n.y)) + 100, [desktopNodes])

  const progressPercent = Math.round((completedCount / lessons.length) * 100)

  function handleNodeClick(lessonId) {
    navigate(`/ders/${lessonId}`)
  }

  function handleMouseEnter(e, lesson, state) {
    setHoveredLesson({ lesson, state })
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  function handleMouseLeave() {
    setHoveredLesson(null)
    setTooltipPos(null)
  }

  // Split path into completed and remaining
  const completedNodeCount = completedCount
  const completedNodes = desktopNodes.slice(0, completedNodeCount)
  const completedPath = generatePath(completedNodes)

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="font-heading text-3xl font-bold dark:text-dark-text-heading">Ilerleme Haritasi</h1>
            <p className="text-text-muted dark:text-dark-text-muted mt-1">Iyilik yolculugundaki konumun</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Icon name="lightning" size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">{totalXP} XP</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
              <span className="text-sm">🎖️</span>
              <span className="text-sm font-semibold text-secondary">Lv.{level} {LEVEL_NAMES[level]}</span>
            </div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border p-4 shadow-soft dark:shadow-dark-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold dark:text-dark-text">{completedCount} / {lessons.length} Ders</span>
            <span className="text-sm font-bold text-primary">{progressPercent}%</span>
          </div>
          <div className="h-3 bg-surface-alt dark:bg-dark-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary-light to-secondary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
          </div>
          {/* Section progress indicators */}
          <div className="flex justify-between mt-3">
            {SECTIONS.map(section => {
              const sectionCompleted = lessons
                .filter(l => l.id >= section.start && l.id <= section.end)
                .filter(l => getLessonStatus(l.id) === 'completed').length
              return (
                <div key={section.start} className="text-center">
                  <span className="text-xs">{section.emoji}</span>
                  <p className="text-[10px] font-medium" style={{ color: section.color }}>
                    {sectionCompleted}/10
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-secondary" />
          <span className="text-text-muted dark:text-dark-text-muted">Tamamlandi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
          <span className="text-text-muted dark:text-dark-text-muted">Siradaki</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full border-2 border-border dark:border-dark-border bg-white dark:bg-dark-card" />
          <span className="text-text-muted dark:text-dark-text-muted">Hazir</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="text-text-muted dark:text-dark-text-muted">Kitli</span>
        </div>
      </div>

      {/* Desktop SVG Map */}
      <div className="hidden md:block bg-white dark:bg-dark-card rounded-3xl border border-border-light dark:border-dark-border shadow-soft dark:shadow-dark-soft overflow-hidden">
        <svg
          width="100%"
          viewBox={`0 0 720 ${svgHeight}`}
          className="w-full"
          onMouseMove={e => {
            if (hoveredLesson) {
              setTooltipPos({ x: e.clientX, y: e.clientY })
            }
          }}
        >
          {/* Background pattern */}
          <defs>
            <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" className="fill-border-light dark:fill-dark-border" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />

          {/* Full path (gray/dashed) */}
          <path
            d={desktopPath}
            fill="none"
            stroke="#CBD5E0"
            strokeWidth="3"
            strokeDasharray="8 6"
            className="dark:stroke-gray-600"
          />

          {/* Completed path (colored) */}
          {completedPath && (
            <path
              d={completedPath}
              fill="none"
              stroke="url(#completedGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          {/* Gradient for completed path */}
          <defs>
            <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C5CE7" />
              <stop offset="50%" stopColor="#A29BFE" />
              <stop offset="100%" stopColor="#00B894" />
            </linearGradient>
          </defs>

          {/* Section labels */}
          {SECTIONS.map(section => (
            <SectionLabel key={section.start} section={section} nodes={desktopNodes} />
          ))}

          {/* Milestone markers at 10, 20, 30, 40 */}
          {[10, 20, 30, 40].map((id, idx) => {
            const node = desktopNodes.find(n => n.id === id)
            if (!node) return null
            const milestoneIcons = ['⭐', '🏆', '🔥', '🎓']
            return (
              <g key={id}>
                <circle cx={node.x} cy={node.y - baseSize / 2 - 22} r={12} fill="#F9A825" fillOpacity={0.2} />
                <text x={node.x} y={node.y - baseSize / 2 - 18} textAnchor="middle" style={{ fontSize: '14px' }}>
                  {milestoneIcons[idx]}
                </text>
              </g>
            )
          })}

          {/* Lesson nodes */}
          {desktopNodes.map(node => {
            const lesson = lessons.find(l => l.id === node.id)
            if (!lesson) return null
            const state = getNodeState(node.id, getLessonStatus, completedCount)
            return (
              <g
                key={node.id}
                onMouseEnter={e => handleMouseEnter(e, lesson, state)}
                onMouseLeave={handleMouseLeave}
              >
                <MapNode
                  node={node}
                  lesson={lesson}
                  state={state}
                  onClick={handleNodeClick}
                  isCurrentUser={true}
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Mobile vertical list */}
      <div className="md:hidden space-y-0">
        {SECTIONS.map(section => (
          <div key={section.start}>
            <MobileSectionDivider section={section} />
            <div className="pl-2">
              {lessons
                .filter(l => l.id >= section.start && l.id <= section.end)
                .map(lesson => {
                  const state = getNodeState(lesson.id, getLessonStatus, completedCount)
                  return (
                    <MobileNode
                      key={lesson.id}
                      lesson={lesson}
                      state={state}
                      index={lesson.id - 1}
                      onClick={handleNodeClick}
                    />
                  )
                })}
          </div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredLesson && (
        <LessonTooltip
          lesson={hoveredLesson.lesson}
          state={hoveredLesson.state}
          position={tooltipPos}
        />
      )}
    </div>
  )
}
