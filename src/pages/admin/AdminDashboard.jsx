import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import Card from '../../components/ui/Card'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, active: 0 })
  const [recentUsers, setRecentUsers] = useState([])

  useEffect(() => {
    async function fetch() {
      const usersSnap = await getDocs(collection(db, 'users'))
      const users = []
      usersSnap.forEach(d => users.push({ uid: d.id, ...d.data() }))

      const now = Date.now()
      const weekAgo = now - 7 * 24 * 60 * 60 * 1000
      const active = users.filter(u => u.lastActive?.toMillis?.() > weekAgo).length

      setStats({ users: users.length, active })
      setRecentUsers(users.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)).slice(0, 5))
    }
    fetch()
  }, [])

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold">Admin Paneli</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-text-muted">Toplam Kullanıcı</p>
          <p className="text-3xl font-bold text-primary">{stats.users}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Aktif (7 gün)</p>
          <p className="text-3xl font-bold text-secondary">{stats.active}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Toplam Ders</p>
          <p className="text-3xl font-bold">40</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Son Kayıtlar</h2>
            <Link to="/admin/kullanicilar" className="text-sm text-primary no-underline">Tümü →</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map(u => (
              <div key={u.uid} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {(u.name || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-text-muted">{u.email}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  u.role === 'admin' ? 'bg-danger/10 text-danger' :
                  u.role === 'teacher' ? 'bg-primary/10 text-primary' :
                  'bg-surface-alt text-text-muted'
                }`}>{u.role}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-bold mb-4">Hızlı İşlemler</h2>
          <div className="space-y-2">
            <Link to="/admin/kullanicilar" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-alt no-underline text-text">
              <span>👥</span><span className="text-sm">Kullanıcı Yönetimi</span>
            </Link>
            <Link to="/admin/dersler" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-alt no-underline text-text">
              <span>📚</span><span className="text-sm">Ders Yönetimi</span>
            </Link>
            <Link to="/admin/raporlar" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-alt no-underline text-text">
              <span>📊</span><span className="text-sm">Raporlar</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
