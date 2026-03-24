import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { lessons } from '../../data/lessons'
import { calculateLevel, LEVEL_NAMES } from '../../utils/xp'
import BarChart from '../../components/admin/charts/BarChart'
import DonutChart from '../../components/admin/charts/DonutChart'

const TOTAL_LESSONS = lessons.length

export default function AdminReports() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [progressMap, setProgressMap] = useState({}) // uid -> { lessonId -> data }
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortKey, setSortKey] = useState('xp')
  const [sortDir, setSortDir] = useState('desc')
  const [activeTab, setActiveTab] = useState('progress') // 'progress' | 'quiz'

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const usersSnap = await getDocs(collection(db, 'users'))
      const usersList = []
      usersSnap.forEach(d => usersList.push({ uid: d.id, ...d.data() }))

      const progMap = {}
      for (const u of usersList) {
        try {
          const progSnap = await getDocs(collection(db, 'progress', u.uid, 'lessons'))
          const lessonProg = {}
          progSnap.forEach(d => {
            lessonProg[d.id] = d.data()
          })
          progMap[u.uid] = lessonProg
        } catch (e) {
          progMap[u.uid] = {}
        }
      }

      setUsers(usersList)
      setProgressMap(progMap)
      setLoading(false)
    } catch (err) {
      console.error('Reports data fetch error:', err)
      setLoading(false)
    }
  }

  // Computed data
  const enrichedUsers = useMemo(() => {
    return users.map(u => {
      const prog = progressMap[u.uid] || {}
      const completedLessons = Object.values(prog).filter(p => p.completedAt || p.postQuizDone).length

      // Quiz stats
      let totalPreQuizScore = 0
      let totalPostQuizScore = 0
      let preQuizCount = 0
      let postQuizCount = 0

      Object.values(prog).forEach(p => {
        if (p.preQuizScore !== undefined) {
          totalPreQuizScore += p.preQuizScore || 0
          preQuizCount++
        }
        if (p.postQuizScore !== undefined) {
          totalPostQuizScore += p.postQuizScore || 0
          postQuizCount++
        }
      })

      return {
        ...u,
        completedLessons,
        completionPercent: Math.round((completedLessons / TOTAL_LESSONS) * 100),
        level: calculateLevel(u.xp || 0),
        levelName: LEVEL_NAMES[calculateLevel(u.xp || 0)] || 'Bilinmiyor',
        avgPreQuiz: preQuizCount > 0 ? Math.round((totalPreQuizScore / preQuizCount) * 100) : null,
        avgPostQuiz: postQuizCount > 0 ? Math.round((totalPostQuizScore / postQuizCount) * 100) : null,
        preQuizCount,
        postQuizCount,
        createdMs: u.createdAt?.toMillis?.() || 0,
        lastActiveMs: u.lastActive?.toMillis?.() || 0,
      }
    })
  }, [users, progressMap])

  // Filter
  const filtered = useMemo(() => {
    let result = enrichedUsers

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(u =>
        (u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      )
    }

    // Date range
    if (dateFrom) {
      const from = new Date(dateFrom).getTime()
      result = result.filter(u => u.createdMs >= from)
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() + 86400000
      result = result.filter(u => u.createdMs <= to)
    }

    // Sort
    result.sort((a, b) => {
      let va, vb
      switch (sortKey) {
        case 'name': va = (a.name || '').toLowerCase(); vb = (b.name || '').toLowerCase(); break
        case 'xp': va = a.xp || 0; vb = b.xp || 0; break
        case 'completed': va = a.completedLessons; vb = b.completedLessons; break
        case 'level': va = a.level; vb = b.level; break
        case 'preQuiz': va = a.avgPreQuiz || 0; vb = b.avgPreQuiz || 0; break
        case 'postQuiz': va = a.avgPostQuiz || 0; vb = b.avgPostQuiz || 0; break
        case 'created': va = a.createdMs; vb = b.createdMs; break
        default: va = a.xp || 0; vb = b.xp || 0
      }
      if (typeof va === 'string') {
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
      }
      return sortDir === 'asc' ? va - vb : vb - va
    })

    return result
  }, [enrichedUsers, search, dateFrom, dateTo, sortKey, sortDir])

  // Quiz performance per lesson (aggregate)
  const quizPerformance = useMemo(() => {
    const lessonQuizData = {}

    Object.values(progressMap).forEach(userProg => {
      Object.entries(userProg).forEach(([lid, data]) => {
        if (!lessonQuizData[lid]) {
          lessonQuizData[lid] = { preScores: [], postScores: [] }
        }
        if (data.preQuizScore !== undefined) {
          lessonQuizData[lid].preScores.push(data.preQuizScore || 0)
        }
        if (data.postQuizScore !== undefined) {
          lessonQuizData[lid].postScores.push(data.postQuizScore || 0)
        }
      })
    })

    return lessons.map(l => {
      const d = lessonQuizData[String(l.id)] || { preScores: [], postScores: [] }
      return {
        id: l.id,
        title: l.title,
        icon: l.icon,
        color: l.color,
        avgPre: d.preScores.length > 0 ? Math.round((d.preScores.reduce((a, b) => a + b, 0) / d.preScores.length) * 100) : null,
        avgPost: d.postScores.length > 0 ? Math.round((d.postScores.reduce((a, b) => a + b, 0) / d.postScores.length) * 100) : null,
        preCount: d.preScores.length,
        postCount: d.postScores.length,
        improvement: (d.preScores.length > 0 && d.postScores.length > 0)
          ? Math.round(((d.postScores.reduce((a, b) => a + b, 0) / d.postScores.length) - (d.preScores.reduce((a, b) => a + b, 0) / d.preScores.length)) * 100)
          : null,
      }
    }).filter(l => l.preCount > 0 || l.postCount > 0)
  }, [progressMap])

  // Quiz performance chart data
  const quizChartData = useMemo(() => {
    return quizPerformance
      .filter(q => q.avgPost !== null)
      .slice(0, 10)
      .map(q => ({
        label: q.title.length > 12 ? q.title.slice(0, 11) + '..' : q.title,
        value: q.avgPost,
        color: q.color || '#6366f1',
      }))
  }, [quizPerformance])

  // Completion distribution for donut
  const completionDistribution = useMemo(() => {
    const buckets = [
      { label: '%0', value: 0, color: '#ef4444', min: 0, max: 0 },
      { label: '%1-25', value: 0, color: '#f97316', min: 1, max: 25 },
      { label: '%26-50', value: 0, color: '#f59e0b', min: 26, max: 50 },
      { label: '%51-75', value: 0, color: '#60a5fa', min: 51, max: 75 },
      { label: '%76-99', value: 0, color: '#a78bfa', min: 76, max: 99 },
      { label: '%100', value: 0, color: '#10b981', min: 100, max: 100 },
    ]
    enrichedUsers.forEach(u => {
      const pct = u.completionPercent
      for (const b of buckets) {
        if (pct >= b.min && pct <= b.max) { b.value++; break }
      }
    })
    return buckets.filter(b => b.value > 0)
  }, [enrichedUsers])

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  function exportCSV() {
    const headers = activeTab === 'progress'
      ? ['Ad', 'E-posta', 'Seviye', 'XP', 'Tamamlanan Ders', 'Tamamlanma %', 'Kayit Tarihi']
      : ['Ad', 'E-posta', 'Ort. On Quiz %', 'Ort. Son Quiz %', 'On Quiz Sayisi', 'Son Quiz Sayisi']

    const rows = filtered.map(u => {
      if (activeTab === 'progress') {
        return [
          u.name || '',
          u.email || '',
          u.levelName,
          u.xp || 0,
          u.completedLessons,
          u.completionPercent + '%',
          u.createdMs ? new Date(u.createdMs).toLocaleDateString('tr-TR') : '',
        ]
      }
      return [
        u.name || '',
        u.email || '',
        u.avgPreQuiz !== null ? u.avgPreQuiz + '%' : '-',
        u.avgPostQuiz !== null ? u.avgPostQuiz + '%' : '-',
        u.preQuizCount,
        u.postQuizCount,
      ]
    })

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `iyilik-akademi-${activeTab === 'progress' ? 'ilerleme' : 'quiz'}-rapor-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <span className="text-gray-300 ml-0.5">&#8597;</span>
    return <span className="text-indigo-500 ml-0.5">{sortDir === 'asc' ? '&#8593;' : '&#8595;'}</span>
  }

  if (loading) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-sm text-gray-500 font-medium">Rapor hazirlaniyor...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detayli Raporlar</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} ogrenci listeleniyor</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          CSV Indir
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'progress'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Ogrenci Ilerlemesi
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'quiz'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Quiz Performansi
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 shadow-soft">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Arama</label>
            <input
              type="text"
              placeholder="Ad veya e-posta..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="block text-xs font-medium text-gray-500 mb-1">Baslangic Tarihi</label>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="block text-xs font-medium text-gray-500 mb-1">Bitis Tarihi</label>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
            />
          </div>
          {(search || dateFrom || dateTo) && (
            <div className="flex items-end">
              <button
                onClick={() => { setSearch(''); setDateFrom(''); setDateTo('') }}
                className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Temizle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Charts Row */}
      {activeTab === 'quiz' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
            <BarChart
              data={quizChartData}
              height={240}
              title="Son Quiz Ortalama Basari (%)"
            />
          </div>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
            <DonutChart
              segments={completionDistribution}
              size={190}
              title="Tamamlanma Dagilimi"
            />
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
            {/* Summary Stats */}
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Genel Ozet</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">{enrichedUsers.length}</p>
                <p className="text-xs text-blue-500 mt-0.5">Toplam Ogrenci</p>
              </div>
              <div className="text-center p-3 bg-emerald-50 rounded-xl">
                <p className="text-2xl font-bold text-emerald-600">
                  {enrichedUsers.filter(u => u.completionPercent === 100).length}
                </p>
                <p className="text-xs text-emerald-500 mt-0.5">Tum Dersleri Bitiren</p>
              </div>
              <div className="text-center p-3 bg-violet-50 rounded-xl">
                <p className="text-2xl font-bold text-violet-600">
                  {enrichedUsers.length > 0 ? Math.round(enrichedUsers.reduce((s, u) => s + u.completionPercent, 0) / enrichedUsers.length) : 0}%
                </p>
                <p className="text-xs text-violet-500 mt-0.5">Ort. Tamamlanma</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-xl">
                <p className="text-2xl font-bold text-amber-600">
                  {enrichedUsers.length > 0 ? Math.round(enrichedUsers.reduce((s, u) => s + (u.xp || 0), 0) / enrichedUsers.length) : 0}
                </p>
                <p className="text-xs text-amber-500 mt-0.5">Ort. XP</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-soft">
            <DonutChart
              segments={completionDistribution}
              size={190}
              title="Tamamlanma Dagilimi"
            />
          </div>
        </div>
      )}

      {/* Progress Table */}
      {activeTab === 'progress' && (
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th
                    className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                    onClick={() => handleSort('name')}
                  >
                    Ogrenci <SortIcon col="name" />
                  </th>
                  <th
                    className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                    onClick={() => handleSort('level')}
                  >
                    Seviye <SortIcon col="level" />
                  </th>
                  <th
                    className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                    onClick={() => handleSort('xp')}
                  >
                    XP <SortIcon col="xp" />
                  </th>
                  <th
                    className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                    onClick={() => handleSort('completed')}
                  >
                    Ilerleme <SortIcon col="completed" />
                  </th>
                  <th
                    className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                    onClick={() => handleSort('created')}
                  >
                    Kayit <SortIcon col="created" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                      Sonuc bulunamadi
                    </td>
                  </tr>
                ) : (
                  filtered.map(u => (
                    <tr key={u.uid} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {(u.name || '?')[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{u.name || 'Anonim'}</p>
                            <p className="text-xs text-gray-400 truncate">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">
                          Lv.{u.level} {u.levelName}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center font-bold text-amber-600">
                        {(u.xp || 0).toLocaleString('tr-TR')}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${u.completionPercent}%`,
                                background: u.completionPercent === 100
                                  ? 'linear-gradient(90deg, #10b981, #059669)'
                                  : u.completionPercent > 50
                                  ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                                  : 'linear-gradient(90deg, #94a3b8, #64748b)',
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-14 text-right flex-shrink-0">
                            {u.completedLessons}/{TOTAL_LESSONS}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-400">
                        {u.createdMs ? new Date(u.createdMs).toLocaleDateString('tr-TR') : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quiz Performance Table */}
      {activeTab === 'quiz' && (
        <>
          {/* Per-Lesson Quiz Breakdown */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Ders Bazli Quiz Performansi</h3>
              <p className="text-xs text-gray-400 mt-0.5">Tum ogrencilerin ortalama puanlari</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Ders</th>
                    <th className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">On Quiz Ort.</th>
                    <th className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Son Quiz Ort.</th>
                    <th className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Gelisim</th>
                    <th className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Katilim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {quizPerformance.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                        Quiz verisi bulunamadi
                      </td>
                    </tr>
                  ) : (
                    quizPerformance.map(q => (
                      <tr key={q.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{q.icon}</span>
                            <span className="font-medium text-gray-900 truncate max-w-[200px]">{q.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {q.avgPre !== null ? (
                            <span className={`font-semibold ${q.avgPre >= 70 ? 'text-emerald-600' : q.avgPre >= 40 ? 'text-amber-600' : 'text-rose-500'}`}>
                              %{q.avgPre}
                            </span>
                          ) : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {q.avgPost !== null ? (
                            <span className={`font-semibold ${q.avgPost >= 70 ? 'text-emerald-600' : q.avgPost >= 40 ? 'text-amber-600' : 'text-rose-500'}`}>
                              %{q.avgPost}
                            </span>
                          ) : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {q.improvement !== null ? (
                            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                              q.improvement > 0 ? 'bg-emerald-50 text-emerald-600' :
                              q.improvement < 0 ? 'bg-rose-50 text-rose-500' :
                              'bg-gray-50 text-gray-500'
                            }`}>
                              {q.improvement > 0 ? '+' : ''}{q.improvement}%
                            </span>
                          ) : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="px-5 py-3.5 text-center text-xs text-gray-500">
                          {Math.max(q.preCount, q.postCount)} kisi
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Per-User Quiz Table */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Ogrenci Bazli Quiz Performansi</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th
                      className="text-left px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                      onClick={() => handleSort('name')}
                    >
                      Ogrenci <SortIcon col="name" />
                    </th>
                    <th
                      className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                      onClick={() => handleSort('preQuiz')}
                    >
                      Ort. On Quiz <SortIcon col="preQuiz" />
                    </th>
                    <th
                      className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                      onClick={() => handleSort('postQuiz')}
                    >
                      Ort. Son Quiz <SortIcon col="postQuiz" />
                    </th>
                    <th className="text-center px-5 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">
                      Quiz Sayisi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-12 text-center text-gray-400">
                        Sonuc bulunamadi
                      </td>
                    </tr>
                  ) : (
                    filtered.map(u => (
                      <tr key={u.uid} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {(u.name || '?')[0].toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate">{u.name || 'Anonim'}</p>
                              <p className="text-xs text-gray-400 truncate">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {u.avgPreQuiz !== null ? (
                            <span className={`font-semibold ${u.avgPreQuiz >= 70 ? 'text-emerald-600' : u.avgPreQuiz >= 40 ? 'text-amber-600' : 'text-rose-500'}`}>
                              %{u.avgPreQuiz}
                            </span>
                          ) : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {u.avgPostQuiz !== null ? (
                            <span className={`font-semibold ${u.avgPostQuiz >= 70 ? 'text-emerald-600' : u.avgPostQuiz >= 40 ? 'text-amber-600' : 'text-rose-500'}`}>
                              %{u.avgPostQuiz}
                            </span>
                          ) : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="px-5 py-3.5 text-center text-xs text-gray-500">
                          {u.preQuizCount + u.postQuizCount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
