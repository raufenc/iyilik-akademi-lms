import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { Link } from 'react-router-dom'
import { lessons } from '../../data/lessons'
import { calculateLevel, LEVEL_NAMES } from '../../utils/xp'
import StatCard from '../../components/admin/charts/StatCard'
import BarChart from '../../components/admin/charts/BarChart'
import LineChart from '../../components/admin/charts/LineChart'
import DonutChart from '../../components/admin/charts/DonutChart'

const LEVEL_COLORS = [
  '', '#94a3b8', '#60a5fa', '#a78bfa', '#f59e0b', '#f97316', '#ef4444', '#dc2626',
]

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCompletedLessons: 0,
    avgXP: 0,
  })
  const [lessonCompletionData, setLessonCompletionData] = useState([])
  const [levelDistribution, setLevelDistribution] = useState([])
  const [weeklyRegistrations, setWeeklyRegistrations] = useState([])
  const [topStudents, setTopStudents] = useState([])
  const [recentActivities, setRecentActivities] = useState([])

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    try {
      // Fetch all users
      const usersSnap = await getDocs(collection(db, 'users'))
      const users = []
      usersSnap.forEach(d => users.push({ uid: d.id, ...d.data() }))

      const now = Date.now()
      const weekAgo = now - 7 * 24 * 60 * 60 * 1000

      // Basic stats
      const totalUsers = users.length
      const activeUsers = users.filter(u => u.lastActive?.toMillis?.() > weekAgo).length
      const totalXP = users.reduce((s, u) => s + (u.xp || 0), 0)
      const avgXP = totalUsers ? Math.round(totalXP / totalUsers) : 0

      // Fetch all progress data
      let totalCompletedLessons = 0
      const lessonCompletionMap = {} // lessonId -> completion count
      const activities = []

      for (const u of users) {
        try {
          const progSnap = await getDocs(collection(db, 'progress', u.uid, 'lessons'))
          progSnap.forEach(d => {
            const data = d.data()
            if (data.completedAt || data.postQuizDone) {
              totalCompletedLessons++
              const lid = d.id
              lessonCompletionMap[lid] = (lessonCompletionMap[lid] || 0) + 1

              // Track recent activity
              const completedTime = data.completedAt?.toMillis?.() || data.postQuizCompletedAt?.toMillis?.() || 0
              if (completedTime) {
                activities.push({
                  userName: u.name || 'Anonim',
                  lessonId: lid,
                  lessonTitle: lessons.find(l => String(l.id) === lid)?.title || `Ders ${lid}`,
                  completedAt: completedTime,
                  xp: u.xp || 0,
                })
              }
            }
          })
        } catch (e) {
          // Skip users with no progress collection
        }
      }

      setStats({ totalUsers, activeUsers, totalCompletedLessons, avgXP })

      // Lesson completion data - top 10 most completed lessons
      const lessonCompletionArr = lessons
        .map(l => ({
          label: l.title.length > 14 ? l.title.slice(0, 13) + '..' : l.title,
          fullTitle: l.title,
          value: lessonCompletionMap[String(l.id)] || 0,
          color: l.color || '#6366f1',
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
      setLessonCompletionData(lessonCompletionArr)

      // Level distribution
      const levelCounts = {}
      users.forEach(u => {
        const level = calculateLevel(u.xp || 0)
        const name = LEVEL_NAMES[level] || `Seviye ${level}`
        if (!levelCounts[level]) {
          levelCounts[level] = { label: name, value: 0, color: LEVEL_COLORS[level] || '#6366f1', level }
        }
        levelCounts[level].value++
      })
      const levelDist = Object.values(levelCounts).sort((a, b) => a.level - b.level)
      setLevelDistribution(levelDist)

      // Weekly registrations (last 8 weeks)
      const weeklyMap = {}
      const eightWeeksAgo = now - 8 * 7 * 24 * 60 * 60 * 1000
      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date(now - i * 7 * 24 * 60 * 60 * 1000)
        const weekKey = `${weekStart.getDate().toString().padStart(2, '0')}/${(weekStart.getMonth() + 1).toString().padStart(2, '0')}`
        weeklyMap[weekKey] = 0
      }
      const weekKeys = Object.keys(weeklyMap)

      users.forEach(u => {
        const created = u.createdAt?.toMillis?.() || 0
        if (created > eightWeeksAgo) {
          // Find which week bucket
          const weeksAgo = Math.floor((now - created) / (7 * 24 * 60 * 60 * 1000))
          const idx = 7 - weeksAgo
          if (idx >= 0 && idx < 8) {
            weeklyMap[weekKeys[idx]] = (weeklyMap[weekKeys[idx]] || 0) + 1
          }
        }
      })
      setWeeklyRegistrations(weekKeys.map(k => ({ label: k, value: weeklyMap[k] })))

      // Top students by XP
      const topByXP = [...users]
        .sort((a, b) => (b.xp || 0) - (a.xp || 0))
        .slice(0, 10)
        .map((u, i) => ({
          label: u.name?.split(' ')[0] || 'Anonim',
          value: u.xp || 0,
          color: i < 3 ? ['#f59e0b', '#94a3b8', '#cd7f32'][i] : '#6366f1',
        }))
      setTopStudents(topByXP)

      // Recent activities - sort and take last 20
      activities.sort((a, b) => b.completedAt - a.completedAt)
      setRecentActivities(activities.slice(0, 20))

      setLoading(false)
    } catch (err) {
      console.error('Dashboard data fetch error:', err)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-sm text-gray-500 font-medium">Analitik veriler hazirlaniyor...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analitik Panel</h1>
          <p className="text-sm text-gray-500 mt-0.5">Genel bakis ve istatistikler</p>
        </div>
        <Link
          to="/admin/raporlar"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-xl hover:bg-indigo-100 transition-colors no-underline"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
          </svg>
          Detayli Raporlar
        </Link>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Toplam Ogrenci"
          value={stats.totalUsers}
          icon="users"
          gradient="blue"
        />
        <StatCard
          label="Aktif Ogrenci"
          value={stats.activeUsers}
          icon="active"
          gradient="green"
          trend={stats.totalUsers > 0 ? {
            value: Math.round((stats.activeUsers / stats.totalUsers) * 100),
            positive: stats.activeUsers > stats.totalUsers * 0.3,
          } : null}
        />
        <StatCard
          label="Tamamlanan Ders"
          value={stats.totalCompletedLessons}
          icon="lessons"
          gradient="purple"
        />
        <StatCard
          label="Ortalama XP"
          value={stats.avgXP}
          icon="xp"
          gradient="amber"
        />
      </div>

      {/* Row 2: Lesson Completion + Level Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
          <BarChart
            data={lessonCompletionData}
            height={280}
            title="Ders Tamamlanma Oranlari (En Populer 10)"
          />
        </div>
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
          <DonutChart
            segments={levelDistribution}
            size={200}
            title="Seviye Dagilimi"
          />
        </div>
      </div>

      {/* Row 3: Weekly Registrations + Top Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
          <LineChart
            data={weeklyRegistrations}
            height={260}
            title="Haftalik Kayit Trendi (Son 8 Hafta)"
            color="#6366f1"
          />
        </div>
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
          <BarChart
            data={topStudents}
            height={260}
            title="En Aktif Ogrenciler (XP)"
          />
        </div>
      </div>

      {/* Row 4: Recent Activities Table */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Son Aktiviteler</h3>
          <span className="text-xs text-gray-400">{recentActivities.length} kayit</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Ogrenci</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Ders</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Tarih</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    Henuz aktivite bulunamadi
                  </td>
                </tr>
              ) : (
                recentActivities.map((a, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {(a.userName || '?')[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 truncate max-w-[140px]">{a.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-gray-600 truncate max-w-[200px] block">{a.lessonTitle}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-gray-400 text-xs">
                        {formatRelativeDate(a.completedAt)}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                          <polygon points="8 1 10 6 15 6.5 11 10 12.5 15 8 12 3.5 15 5 10 1 6.5 6 6" />
                        </svg>
                        {a.xp.toLocaleString('tr-TR')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/kullanicilar"
          className="flex items-center gap-3 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-soft hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 no-underline group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Kullanici Yonetimi</p>
            <p className="text-xs text-gray-400">{stats.totalUsers} kayitli kullanici</p>
          </div>
        </Link>
        <Link
          to="/admin/dersler"
          className="flex items-center gap-3 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-soft hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 no-underline group"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Ders Yonetimi</p>
            <p className="text-xs text-gray-400">{lessons.length} ders</p>
          </div>
        </Link>
        <Link
          to="/admin/raporlar"
          className="flex items-center gap-3 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-soft hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 no-underline group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Detayli Raporlar</p>
            <p className="text-xs text-gray-400">CSV disari aktar</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

function formatRelativeDate(timestamp) {
  if (!timestamp) return '-'
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Az once'
  if (minutes < 60) return `${minutes} dk once`
  if (hours < 24) return `${hours} saat once`
  if (days < 7) return `${days} gun once`

  const date = new Date(timestamp)
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}
