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

  if (loading) {
    return <div className="text-center py-12 text-text-muted">Yükleniyor...</div>
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sıralama Tablosu</h1>

      {/* Top 3 */}
      {users.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[users[1], users[0], users[2]].map((u, i) => {
            const rank = i === 0 ? 2 : i === 1 ? 1 : 3
            return (
              <Card key={u.uid} className={`text-center ${rank === 1 ? 'ring-2 ring-accent scale-105' : ''}`}>
                <span className="text-2xl">{medals[rank - 1]}</span>
                <div className={`w-12 h-12 rounded-full mx-auto mt-2 flex items-center justify-center text-white font-bold ${
                  rank === 1 ? 'bg-accent-dark text-lg' : 'bg-primary text-sm'
                }`}>
                  {(u.name || '?')[0].toUpperCase()}
                </div>
                <p className="font-semibold text-sm mt-2 truncate">{u.name}</p>
                <p className="text-accent-dark font-bold">{u.xp || 0} XP</p>
              </Card>
            )
          })}
        </div>
      )}

      {/* Full List */}
      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-border">
          {users.map((u, i) => (
            <div
              key={u.uid}
              className={`flex items-center gap-4 px-5 py-3 ${
                u.uid === user?.uid ? 'bg-primary/5' : ''
              }`}
            >
              <span className={`w-8 text-center font-bold ${i < 3 ? 'text-lg' : 'text-sm text-text-muted'}`}>
                {i < 3 ? medals[i] : i + 1}
              </span>
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                {(u.name || '?')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{u.name}</p>
                <p className="text-xs text-text-muted">{LEVEL_NAMES[calculateLevel(u.xp || 0)]}</p>
              </div>
              <p className="font-bold text-sm text-accent-dark">{u.xp || 0} XP</p>
            </div>
          ))}
        </div>
      </Card>

      {users.length === 0 && (
        <div className="text-center py-12 text-text-muted">Henüz kimse yok. İlk sen başla!</div>
      )}
    </div>
  )
}
