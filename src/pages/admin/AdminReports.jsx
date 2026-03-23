import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'

export default function AdminReports() {
  const [data, setData] = useState({ users: [], completionRates: {} })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const usersSnap = await getDocs(collection(db, 'users'))
      const users = []
      usersSnap.forEach(d => users.push({ uid: d.id, ...d.data() }))

      const completionRates = {}
      for (const u of users) {
        const progSnap = await getDocs(collection(db, 'progress', u.uid, 'lessons'))
        let completed = 0
        progSnap.forEach(d => { if (d.data().completedAt || d.data().postQuizDone) completed++ })
        completionRates[u.uid] = completed
      }

      setData({ users, completionRates })
      setLoading(false)
    }
    fetch()
  }, [])

  const totalUsers = data.users.length
  const avgXP = totalUsers ? Math.round(data.users.reduce((s, u) => s + (u.xp || 0), 0) / totalUsers) : 0
  const avgCompletion = totalUsers ? Math.round(Object.values(data.completionRates).reduce((s, c) => s + c, 0) / totalUsers) : 0

  if (loading) return <p className="text-text-muted text-center py-12">Rapor hazırlanıyor...</p>

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold">Raporlar</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-text-muted">Ortalama XP</p>
          <p className="text-2xl font-bold text-accent-dark">{avgXP}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Ort. Tamamlanan Ders</p>
          <p className="text-2xl font-bold text-secondary">{avgCompletion}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Toplam Kullanıcı</p>
          <p className="text-2xl font-bold text-primary">{totalUsers}</p>
        </Card>
      </div>

      <Card>
        <h2 className="font-bold mb-4">Öğrenci İlerleme Detayı</h2>
        <div className="space-y-3">
          {data.users.sort((a, b) => (data.completionRates[b.uid] || 0) - (data.completionRates[a.uid] || 0)).map(u => (
            <div key={u.uid} className="flex items-center gap-4">
              <div className="w-32 truncate text-sm font-medium">{u.name}</div>
              <div className="flex-1">
                <ProgressBar value={data.completionRates[u.uid] || 0} max={40} color="bg-secondary" />
              </div>
              <span className="text-xs text-text-muted w-16 text-right">{data.completionRates[u.uid] || 0}/40</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
