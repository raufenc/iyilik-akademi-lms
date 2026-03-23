import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { LEVEL_NAMES, calculateLevel } from '../utils/xp'
import Card from '../components/ui/Card'

export default function LeaderboardPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchLeaderboard() {
      const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(50))
      const snap = await getDocs(q)
      const list = []
      snap.forEach(d => list.push({ uid: d.id, ...d.data() }))
      setUsers(list)
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  const medals = ['🥇', '🥈', '🥉']
  const podiumColors = [
    'from-yellow-400/20 to-amber-500/10 border-amber-400/40',
    'from-gray-300/20 to-gray-400/10 border-gray-400/30',
    'from-orange-300/20 to-orange-400/10 border-orange-400/30',
  ]

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-4">
        {[1,2,3].map(i => <div key={i} className="skeleton h-16 rounded-2xl" />)}
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold">🏆 Sıralama Tablosu</h1>
        <p className="text-text-muted mt-2">En çok XP kazanan öğrenciler</p>
      </div>

      {/* Podium — Top 3 */}
      {users.length >= 3 && (
        <div className="flex items-end justify-center gap-3 mb-8 px-4">
          {/* 2nd Place */}
          <div className="flex-1 max-w-[140px] animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className={`bg-gradient-to-b ${podiumColors[1]} border rounded-t-2xl rounded-b-xl p-4 text-center`}>
              <span className="text-3xl">{medals[1]}</span>
              <div className="w-14 h-14 rounded-full mx-auto mt-2 bg-gradient-to-br from-gray-400 to-gray-500 text-white flex items-center justify-center font-bold text-lg shadow-soft">
                {(users[1].name || '?')[0].toUpperCase()}
              </div>
              <p className="font-heading font-semibold text-sm mt-2 truncate">{users[1].name}</p>
              <p className="text-accent-dark font-bold text-sm">{users[1].xp || 0} XP</p>
            </div>
            <div className="bg-gray-200 h-16 rounded-b-xl" />
          </div>

          {/* 1st Place — Tallest */}
          <div className="flex-1 max-w-[160px] animate-slide-up -mt-4">
            <div className={`bg-gradient-to-b ${podiumColors[0]} border rounded-t-2xl rounded-b-xl p-5 text-center shadow-glow-gold`}>
              <span className="text-4xl">🥇</span>
              <div className="w-16 h-16 rounded-full mx-auto mt-2 bg-gradient-to-br from-amber-400 to-yellow-500 text-white flex items-center justify-center font-bold text-xl shadow-medium ring-4 ring-amber-300/30">
                {(users[0].name || '?')[0].toUpperCase()}
              </div>
              <p className="font-heading font-bold text-base mt-2 truncate">{users[0].name}</p>
              <p className="text-accent-dark font-bold">{users[0].xp || 0} XP</p>
            </div>
            <div className="bg-amber-200 h-24 rounded-b-xl" />
          </div>

          {/* 3rd Place */}
          <div className="flex-1 max-w-[140px] animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className={`bg-gradient-to-b ${podiumColors[2]} border rounded-t-2xl rounded-b-xl p-4 text-center`}>
              <span className="text-3xl">{medals[2]}</span>
              <div className="w-14 h-14 rounded-full mx-auto mt-2 bg-gradient-to-br from-orange-400 to-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-soft">
                {(users[2].name || '?')[0].toUpperCase()}
              </div>
              <p className="font-heading font-semibold text-sm mt-2 truncate">{users[2].name}</p>
              <p className="text-accent-dark font-bold text-sm">{users[2].xp || 0} XP</p>
            </div>
            <div className="bg-orange-200 h-10 rounded-b-xl" />
          </div>
        </div>
      )}

      {/* Full List */}
      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-border-light">
          {users.map((u, i) => {
            const isMe = u.uid === user?.uid
            const lvl = calculateLevel(u.xp || 0)
            return (
              <div
                key={u.uid}
                className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                  isMe ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-surface-alt'
                }`}
              >
                <span className={`w-8 text-center font-bold shrink-0 ${
                  i < 3 ? 'text-xl' : 'text-sm text-text-muted'
                }`}>
                  {i < 3 ? medals[i] : i + 1}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  i === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                  i === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                  i === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' :
                  'bg-primary/10 text-primary'
                }`}>
                  {(u.name || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${isMe ? 'text-primary font-semibold' : ''}`}>
                    {u.name} {isMe && <span className="text-xs text-primary/60">(Sen)</span>}
                  </p>
                  <p className="text-xs text-text-muted">{LEVEL_NAMES[lvl]} · Lv.{lvl}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading font-bold text-sm text-accent-dark">{u.xp || 0}</p>
                  <p className="text-xs text-text-muted">XP</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {users.length === 0 && (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🏆</span>
          <p className="font-heading font-semibold text-lg">Henüz kimse yok</p>
          <p className="text-text-muted mt-1">İlk sen başla ve zirveye çık!</p>
        </div>
      )}
    </div>
  )
}
