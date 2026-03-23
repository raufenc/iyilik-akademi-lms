import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const snap = await getDocs(collection(db, 'users'))
      const list = []
      snap.forEach(d => list.push({ uid: d.id, ...d.data() }))
      setUsers(list.sort((a, b) => (b.xp || 0) - (a.xp || 0)))
      setLoading(false)
    }
    fetch()
  }, [])

  async function changeRole(uid, newRole) {
    await updateDoc(doc(db, 'users', uid), { role: newRole })
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role: newRole } : u))
  }

  const filtered = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Kullanıcı Yönetimi</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="İsim veya e-posta ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 rounded-lg border border-border focus:border-primary outline-none text-sm"
        />
      </div>

      {loading ? (
        <p className="text-text-muted text-center py-8">Yükleniyor...</p>
      ) : (
        <Card className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-alt">
                <th className="text-left px-4 py-3 font-medium text-text-muted">Kullanıcı</th>
                <th className="text-left px-4 py-3 font-medium text-text-muted">E-posta</th>
                <th className="text-center px-4 py-3 font-medium text-text-muted">XP</th>
                <th className="text-center px-4 py-3 font-medium text-text-muted">Rol</th>
                <th className="text-center px-4 py-3 font-medium text-text-muted">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(u => (
                <tr key={u.uid} className="hover:bg-surface-alt/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {(u.name || '?')[0].toUpperCase()}
                      </div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{u.email}</td>
                  <td className="px-4 py-3 text-center font-bold text-accent-dark">{u.xp || 0}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      u.role === 'admin' ? 'bg-danger/10 text-danger' :
                      u.role === 'teacher' ? 'bg-primary/10 text-primary' :
                      'bg-surface-alt text-text-muted'
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={u.role}
                      onChange={e => changeRole(u.uid, e.target.value)}
                      className="text-xs px-2 py-1 border border-border rounded-lg"
                    >
                      <option value="student">Öğrenci</option>
                      <option value="teacher">Öğretmen</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <p className="text-xs text-text-muted mt-4">{filtered.length} kullanıcı</p>
    </div>
  )
}
