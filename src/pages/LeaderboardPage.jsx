import { useState, useEffect, useRef, useMemo } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { LEVEL_NAMES, calculateLevel } from '../utils/xp'
import Card from '../components/ui/Card'
import Icon from '../components/ui/Icon'
import { SkeletonLeaderboard } from '../components/ui/Skeleton'

const TABS = [
  { key: 'weekly', label: 'Bu Hafta', field: 'weeklyXp' },
  { key: 'monthly', label: 'Bu Ay', field: 'monthlyXp' },
  { key: 'alltime', label: 'Tum Zamanlar', field: 'xp' },
]

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)

  useEffect(() => {
    const start = prevRef.current
    const end = value
    if (start === end) { setDisplay(end); return }
    const startTime = performance.now()
    function animate(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplay(Math.round(start + (end - start) * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
    prevRef.current = end
  }, [value, duration])

  return <>{display.toLocaleString('tr-TR')}</>
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('weekly')
  const [searchQuery, setSearchQuery] = useState('')
  const [tabTransition, setTabTransition] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchLeaderboard() {
      const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(100))
      const snap = await getDocs(q)
      const list = []
      snap.forEach(d => list.push({ uid: d.id, ...d.data() }))
      setUsers(list)
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  const activeField = TABS.find(t => t.key === activeTab)?.field || 'xp'

  const sortedUsers = useMemo(() => {
    const sorted = [...users].sort((a, b) => (b[activeField] || 0) - (a[activeField] || 0))
    if (!searchQuery.trim()) return sorted
    const q = searchQuery.toLowerCase().trim()
    return sorted.filter(u => (u.name || '').toLowerCase().includes(q))
  }, [users, activeField, searchQuery])

  const myRank = useMemo(() => {
    if (!user) return null
    const allSorted = [...users].sort((a, b) => (b[activeField] || 0) - (a[activeField] || 0))
    const idx = allSorted.findIndex(u => u.uid === user.uid)
    return idx >= 0 ? idx + 1 : null
  }, [users, user, activeField])

  function handleTabChange(key) {
    if (key === activeTab) return
    setTabTransition(true)
    setTimeout(() => {
      setActiveTab(key)
      setTabTransition(false)
    }, 150)
  }

  const medals = ['\u{1F947}', '\u{1F948}', '\u{1F949}']
  const podiumColors = [
    'from-yellow-400/20 to-amber-500/10 border-amber-400/40 dark:from-yellow-400/10 dark:to-amber-500/5 dark:border-amber-400/20',
    'from-gray-300/20 to-gray-400/10 border-gray-400/30 dark:from-gray-300/10 dark:to-gray-400/5 dark:border-gray-400/20',
    'from-orange-300/20 to-orange-400/10 border-orange-400/30 dark:from-orange-300/10 dark:to-orange-400/5 dark:border-orange-400/20',
  ]

  if (loading) {
    return <SkeletonLeaderboard />
  }

  const top3 = sortedUsers.slice(0, 3)
  const restUsers = sortedUsers

  return (
    <div className="page-enter max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-heading text-3xl font-bold text-text dark:text-dark-text">
          <span className="inline-block mr-2">{'\u{1F3C6}'}</span>Sıralama Tablosu
        </h1>
        <p className="text-text-muted dark:text-dark-text-muted mt-2">En cok XP kazanan ogrenciler</p>
      </div>

      {/* My Rank Badge */}
      {myRank && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/20 dark:border-primary/30 rounded-full">
            <Icon name="star" size={18} className="text-primary" />
            <span className="font-heading font-bold text-sm text-primary">
              Sen {myRank}. siradasin!
            </span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-surface-alt dark:bg-dark-elevated rounded-xl p-1 mb-6 gap-1">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-white dark:bg-dark-card text-primary shadow-soft dark:shadow-dark-soft'
                : 'text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Icon name="search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-dark-text-muted" />
        <input
          type="text"
          placeholder="Öğrenci ara..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-border-light dark:border-dark-border rounded-xl text-sm text-text dark:text-dark-text placeholder-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text"
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </div>

      {/* Podium - Top 3 */}
      {!searchQuery && top3.length >= 3 && (
        <div className={`flex items-end justify-center gap-3 mb-8 px-4 transition-all duration-300 ${tabTransition ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          {/* 2nd Place */}
          <div className="flex-1 max-w-[140px] animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className={`bg-gradient-to-b ${podiumColors[1]} border rounded-t-2xl rounded-b-xl p-4 text-center`}>
              <span className="text-3xl">{medals[1]}</span>
              <div className="w-14 h-14 rounded-full mx-auto mt-2 bg-gradient-to-br from-gray-400 to-gray-500 text-white flex items-center justify-center font-bold text-lg shadow-soft">
                {(top3[1].name || '?')[0].toUpperCase()}
              </div>
              <p className="font-heading font-semibold text-sm mt-2 truncate text-text dark:text-dark-text">{top3[1].name}</p>
              <p className="text-accent-dark font-bold text-sm">
                <AnimatedNumber value={top3[1][activeField] || 0} /> XP
              </p>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 h-16 rounded-b-xl" />
          </div>

          {/* 1st Place - Tallest */}
          <div className="flex-1 max-w-[160px] animate-slide-up -mt-4">
            <div className={`bg-gradient-to-b ${podiumColors[0]} border rounded-t-2xl rounded-b-xl p-5 text-center shadow-glow-gold`}>
              <span className="text-4xl">{medals[0]}</span>
              <div className="w-16 h-16 rounded-full mx-auto mt-2 bg-gradient-to-br from-amber-400 to-yellow-500 text-white flex items-center justify-center font-bold text-xl shadow-medium ring-4 ring-amber-300/30 dark:ring-amber-500/20">
                {(top3[0].name || '?')[0].toUpperCase()}
              </div>
              <p className="font-heading font-bold text-base mt-2 truncate text-text dark:text-dark-text">{top3[0].name}</p>
              <p className="text-accent-dark font-bold">
                <AnimatedNumber value={top3[0][activeField] || 0} /> XP
              </p>
            </div>
            <div className="bg-amber-200 dark:bg-amber-800 h-24 rounded-b-xl" />
          </div>

          {/* 3rd Place */}
          <div className="flex-1 max-w-[140px] animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className={`bg-gradient-to-b ${podiumColors[2]} border rounded-t-2xl rounded-b-xl p-4 text-center`}>
              <span className="text-3xl">{medals[2]}</span>
              <div className="w-14 h-14 rounded-full mx-auto mt-2 bg-gradient-to-br from-orange-400 to-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-soft">
                {(top3[2].name || '?')[0].toUpperCase()}
              </div>
              <p className="font-heading font-semibold text-sm mt-2 truncate text-text dark:text-dark-text">{top3[2].name}</p>
              <p className="text-accent-dark font-bold text-sm">
                <AnimatedNumber value={top3[2][activeField] || 0} /> XP
              </p>
            </div>
            <div className="bg-orange-200 dark:bg-orange-800 h-10 rounded-b-xl" />
          </div>
        </div>
      )}

      {/* Full List */}
      <Card className="p-0 overflow-hidden">
        <div className={`divide-y divide-border-light dark:divide-dark-border transition-all duration-300 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
          {restUsers.map((u, i) => {
            const isMe = u.uid === user?.uid
            const lvl = calculateLevel(u[activeField] || u.xp || 0)
            // Find actual rank (accounting for search filtering)
            const allSorted = [...users].sort((a, b) => (b[activeField] || 0) - (a[activeField] || 0))
            const actualRank = allSorted.findIndex(x => x.uid === u.uid) + 1
            const displayRank = searchQuery ? actualRank : i + 1
            return (
              <div
                key={u.uid}
                className={`flex items-center gap-4 px-5 py-3.5 transition-all duration-200 ${
                  isMe
                    ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary'
                    : 'hover:bg-surface-alt dark:hover:bg-dark-elevated'
                }`}
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <span className={`w-8 text-center font-bold shrink-0 ${
                  displayRank <= 3 ? 'text-xl' : 'text-sm text-text-muted dark:text-dark-text-muted'
                }`}>
                  {displayRank <= 3 ? medals[displayRank - 1] : displayRank}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  displayRank === 1 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                  displayRank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                  displayRank === 3 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' :
                  'bg-primary/10 dark:bg-primary/20 text-primary'
                }`}>
                  {(u.name || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${
                    isMe
                      ? 'text-primary font-semibold'
                      : 'text-text dark:text-dark-text'
                  }`}>
                    {u.name} {isMe && <span className="text-xs text-primary/60">(Sen)</span>}
                  </p>
                  <p className="text-xs text-text-muted dark:text-dark-text-muted">{LEVEL_NAMES[lvl]} · Lv.{lvl}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading font-bold text-sm text-accent-dark">
                    <AnimatedNumber value={u[activeField] || 0} />
                  </p>
                  <p className="text-xs text-text-muted dark:text-dark-text-muted">XP</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {sortedUsers.length === 0 && !loading && (
        <div className="text-center py-16">
          {searchQuery ? (
            <>
              <Icon name="search" size={48} className="mx-auto mb-4 text-text-muted dark:text-dark-text-muted" />
              <p className="font-heading font-semibold text-lg text-text dark:text-dark-text">Sonuc bulunamadi</p>
              <p className="text-text-muted dark:text-dark-text-muted mt-1">"{searchQuery}" ile eslesen ogrenci yok</p>
            </>
          ) : (
            <>
              <span className="text-5xl block mb-4">{'\u{1F3C6}'}</span>
              <p className="font-heading font-semibold text-lg text-text dark:text-dark-text">Henuz kimse yok</p>
              <p className="text-text-muted dark:text-dark-text-muted mt-1">İlk sen başla ve zirveye çık!</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
