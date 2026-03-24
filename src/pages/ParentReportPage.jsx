import { useState, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons, badges as badgeDefs } from '../data/lessons'
import { LEVEL_NAMES, xpToNextLevel } from '../utils/xp'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const LEVEL_COLORS = {
  1: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  2: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  3: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  4: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  5: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  6: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  7: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
}

export default function ParentReportPage() {
  const { userData } = useAuth()
  const { completedCount, totalXP, level, lessonProgress, getLessonStatus } = useProgress()
  const { current, needed, progress } = xpToNextLevel(totalXP)
  const [generating, setGenerating] = useState(false)

  const levelColors = LEVEL_COLORS[level] || LEVEL_COLORS[1]
  const userBadges = userData?.badges || []
  const memberSince = userData?.createdAt?.toDate
    ? userData.createdAt.toDate().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
    : userData?.createdAt?.seconds
      ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
      : '-'

  // Completed lessons with dates
  const completedLessons = useMemo(() => {
    return lessons
      .filter(l => {
        const status = getLessonStatus(l.id)
        return status === 'completed'
      })
      .map(l => {
        const prog = lessonProgress[String(l.id)]
        let completedDate = '-'
        if (prog?.completedAt?.toDate) {
          completedDate = prog.completedAt.toDate().toLocaleDateString('tr-TR')
        } else if (prog?.completedAt?.seconds) {
          completedDate = new Date(prog.completedAt.seconds * 1000).toLocaleDateString('tr-TR')
        } else if (prog?.completedAt) {
          completedDate = new Date(prog.completedAt).toLocaleDateString('tr-TR')
        }
        return { ...l, completedDate }
      })
  }, [lessonProgress, getLessonStatus])

  // Weekly summary - lessons completed in the last 7 days
  const weeklySummary = useMemo(() => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    let weekLessons = 0
    let weekXP = 0

    Object.entries(lessonProgress).forEach(([id, prog]) => {
      let ts = null
      if (prog?.completedAt?.toDate) ts = prog.completedAt.toDate().getTime()
      else if (prog?.completedAt?.seconds) ts = prog.completedAt.seconds * 1000
      else if (prog?.completedAt) ts = new Date(prog.completedAt).getTime()

      if (ts && ts > oneWeekAgo) {
        weekLessons++
        const lesson = lessons.find(l => String(l.id) === String(id))
        weekXP += lesson?.xp || 100
      }
    })

    return { weekLessons, weekXP }
  }, [lessonProgress])

  // Strengths and improvement areas based on quiz performance
  const { strengths, improvements } = useMemo(() => {
    const topicScores = []

    lessons.forEach(l => {
      const prog = lessonProgress[String(l.id)]
      if (!prog) return

      // Estimate score from quiz data
      let score = null
      if (prog.postQuizScore !== undefined) {
        score = prog.postQuizScore
      } else if (prog.preQuizScore !== undefined) {
        score = prog.preQuizScore
      }

      if (score !== null) {
        topicScores.push({
          title: l.title,
          score,
          icon: l.icon,
        })
      }
    })

    // Sort by score
    const sorted = [...topicScores].sort((a, b) => b.score - a.score)

    const strengths = sorted.filter(t => t.score >= 80).slice(0, 3)
    const improvements = sorted.filter(t => t.score < 60).slice(0, 3)

    return { strengths, improvements }
  }, [lessonProgress])

  // Earned badges with details
  const earnedBadges = useMemo(() => {
    return badgeDefs.filter(b => userBadges.includes(b.id))
  }, [userBadges])

  function handlePrint() {
    window.print()
  }

  async function handleDownloadPDF() {
    setGenerating(true)
    try {
      // Use Canvas to generate a printable report image
      const canvas = document.createElement('canvas')
      const s = 2
      canvas.width = 800 * s
      canvas.height = 1200 * s
      const ctx = canvas.getContext('2d')

      // White background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Header
      ctx.fillStyle = '#6C5CE7'
      ctx.fillRect(0, 0, canvas.width, 80 * s)

      ctx.font = `bold ${24 * s}px Poppins, Inter, sans-serif`
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.fillText('IYILIK AKADEMI', canvas.width / 2, 35 * s)

      ctx.font = `${14 * s}px Inter, sans-serif`
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.fillText('Ebeveyn İlerleme Raporu', canvas.width / 2, 58 * s)

      let y = 110 * s

      // Student info
      ctx.textAlign = 'left'
      ctx.font = `bold ${16 * s}px Inter, sans-serif`
      ctx.fillStyle = '#2D3436'
      ctx.fillText('Öğrenci Bilgileri', 40 * s, y)
      y += 30 * s

      ctx.font = `${13 * s}px Inter, sans-serif`
      ctx.fillStyle = '#636E72'
      ctx.fillText(`Ad: ${userData?.name || '-'}`, 40 * s, y)
      y += 22 * s
      ctx.fillText(`Seviye: ${LEVEL_NAMES[level]} (Lv.${level})`, 40 * s, y)
      y += 22 * s
      ctx.fillText(`Toplam XP: ${totalXP}`, 40 * s, y)
      y += 22 * s
      ctx.fillText(`Tamamlanan Ders: ${completedCount} / 40`, 40 * s, y)
      y += 22 * s
      ctx.fillText(`Uyelik: ${memberSince}`, 40 * s, y)
      y += 40 * s

      // Progress bar
      ctx.font = `bold ${16 * s}px Inter, sans-serif`
      ctx.fillStyle = '#2D3436'
      ctx.fillText('Genel İlerleme', 40 * s, y)
      y += 25 * s

      // Draw progress bar
      const barWidth = 720 * s
      const barHeight = 16 * s
      const barX = 40 * s

      ctx.fillStyle = '#F0F0F0'
      ctx.beginPath()
      ctx.roundRect(barX, y, barWidth, barHeight, 8 * s)
      ctx.fill()

      const fillWidth = (completedCount / 40) * barWidth
      ctx.fillStyle = '#6C5CE7'
      ctx.beginPath()
      ctx.roundRect(barX, y, fillWidth, barHeight, 8 * s)
      ctx.fill()

      ctx.font = `bold ${11 * s}px Inter, sans-serif`
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.fillText(`%${Math.round((completedCount / 40) * 100)}`, barX + fillWidth / 2, y + 12 * s)
      ctx.textAlign = 'left'

      y += 50 * s

      // Weekly summary
      ctx.font = `bold ${16 * s}px Inter, sans-serif`
      ctx.fillStyle = '#2D3436'
      ctx.fillText('Haftalık Özet', 40 * s, y)
      y += 25 * s

      ctx.font = `${13 * s}px Inter, sans-serif`
      ctx.fillStyle = '#636E72'
      ctx.fillText(`Bu hafta ${weeklySummary.weekLessons} ders tamamlandi, ${weeklySummary.weekXP} XP kazanildi.`, 40 * s, y)
      y += 40 * s

      // Completed lessons
      ctx.font = `bold ${16 * s}px Inter, sans-serif`
      ctx.fillStyle = '#2D3436'
      ctx.fillText('Tamamlanan Dersler', 40 * s, y)
      y += 25 * s

      ctx.font = `${12 * s}px Inter, sans-serif`
      ctx.fillStyle = '#636E72'
      completedLessons.slice(0, 15).forEach(l => {
        ctx.fillText(`${l.icon} ${l.title} — ${l.completedDate}`, 50 * s, y)
        y += 20 * s
      })
      if (completedLessons.length > 15) {
        ctx.fillText(`...ve ${completedLessons.length - 15} ders daha`, 50 * s, y)
        y += 20 * s
      }

      y += 20 * s

      // Strengths
      if (strengths.length > 0) {
        ctx.font = `bold ${16 * s}px Inter, sans-serif`
        ctx.fillStyle = '#2D3436'
        ctx.fillText('Guclu Yonler', 40 * s, y)
        y += 25 * s

        ctx.font = `${12 * s}px Inter, sans-serif`
        ctx.fillStyle = '#00B894'
        strengths.forEach(s2 => {
          ctx.fillText(`✓ ${s2.title} — %${Math.round(s2.score)}`, 50 * s, y)
          y += 20 * s
        })
        y += 10 * s
      }

      // Footer
      ctx.fillStyle = '#B2BEC3'
      ctx.font = `${11 * s}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.fillText(
        `Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')} — İyilik Akademi`,
        canvas.width / 2,
        canvas.height - 30 * s
      )

      // Download
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = `iyilik-akademi-rapor-${userData?.name || 'ogrenci'}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error('Rapor oluşturulamadı', e)
    }
    setGenerating(false)
  }

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .print-area .shadow-soft, .print-area .shadow-medium { box-shadow: none !important; }
        }
      `}</style>

      <div className="animate-fade-in space-y-6 max-w-3xl mx-auto print-area">
        {/* Page Header */}
        <div className="bg-gradient-hero rounded-2xl p-6 text-white relative overflow-hidden print:rounded-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-lg" />
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold">Ebeveyn Raporu</h1>
              <p className="text-white/70 text-sm mt-1">
                {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex gap-2 no-print">
              <Button
                size="sm"
                variant="secondary"
                onClick={handlePrint}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9V2h12v7" />
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  Yazdir
                </span>
              </Button>
              <Button
                size="sm"
                loading={generating}
                onClick={handleDownloadPDF}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M12 15V3" />
                  </svg>
                  PDF Indir
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* 1. Student Info */}
        <Card>
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-lg">👤</span>
            Öğrenci Bilgileri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-full ${levelColors.bg} ${levelColors.text} flex items-center justify-center text-2xl font-bold ${levelColors.border} border-2`}>
                {userData?.avatar?.emoji || (userData?.name || 'O')[0].toUpperCase()}
              </div>
              <div>
                <p className="font-heading font-bold">{userData?.name}</p>
                <p className="text-xs text-text-muted">{userData?.email}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-text-muted">Seviye</p>
              <p className="font-heading font-bold text-primary">Lv.{level} - {LEVEL_NAMES[level]}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Toplam XP</p>
              <p className="font-heading font-bold text-accent-dark">{totalXP} XP</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Tamamlanan Ders</p>
              <p className="font-heading font-bold text-secondary">{completedCount} / 40</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Uyelik Tarihi</p>
              <p className="font-heading font-bold text-text">{memberSince}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Kazanilan Rozet</p>
              <p className="font-heading font-bold text-text">{earnedBadges.length} / {badgeDefs.length}</p>
            </div>
          </div>
        </Card>

        {/* 2. Weekly Summary */}
        <Card>
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-lg">📊</span>
            Haftalık Özet
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-alt rounded-xl p-4 text-center">
              <p className="font-heading text-3xl font-bold text-primary">{weeklySummary.weekLessons}</p>
              <p className="text-sm text-text-muted mt-1">Ders Tamamlandı</p>
            </div>
            <div className="bg-surface-alt rounded-xl p-4 text-center">
              <p className="font-heading text-3xl font-bold text-accent-dark">{weeklySummary.weekXP}</p>
              <p className="text-sm text-text-muted mt-1">XP Kazanildi</p>
            </div>
          </div>
          <p className="text-sm text-text-light mt-4 text-center">
            {weeklySummary.weekLessons > 0
              ? `Bu hafta ${weeklySummary.weekLessons} ders tamamlandi ve ${weeklySummary.weekXP} XP kazanildi. Harika bir ilerleme!`
              : 'Bu hafta henuz ders tamamlanmadi. Yeni derslere baslamak icin harika bir zaman!'}
          </p>
        </Card>

        {/* 3. Overall Progress */}
        <Card>
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-lg">📈</span>
            Genel İlerleme
          </h2>
          <div className="space-y-4">
            {/* Big progress bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text">{completedCount} / 40 Ders</span>
                <span className="text-sm font-bold text-primary">%{Math.round((completedCount / 40) * 100)}</span>
              </div>
              <div className="h-4 bg-surface-alt rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000"
                  style={{ width: `${(completedCount / 40) * 100}%` }}
                />
              </div>
            </div>

            {/* XP progress to next level */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted">Seviye {level} → {level < 7 ? level + 1 : 'MAX'}</span>
                <span className="text-xs text-text-muted">{current} / {needed} XP</span>
              </div>
              <div className="h-2.5 bg-surface-alt rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(progress * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Milestone markers */}
            <div className="flex items-center justify-between text-xs text-text-muted mt-2">
              <div className={`text-center ${completedCount >= 1 ? 'text-secondary' : ''}`}>
                <span className="block text-lg">{completedCount >= 1 ? '✅' : '⬜'}</span>
                <span>Başlangic</span>
              </div>
              <div className={`text-center ${completedCount >= 10 ? 'text-secondary' : ''}`}>
                <span className="block text-lg">{completedCount >= 10 ? '✅' : '⬜'}</span>
                <span>10 Ders</span>
              </div>
              <div className={`text-center ${completedCount >= 20 ? 'text-secondary' : ''}`}>
                <span className="block text-lg">{completedCount >= 20 ? '✅' : '⬜'}</span>
                <span>Yari Yol</span>
              </div>
              <div className={`text-center ${completedCount >= 30 ? 'text-secondary' : ''}`}>
                <span className="block text-lg">{completedCount >= 30 ? '✅' : '⬜'}</span>
                <span>30 Ders</span>
              </div>
              <div className={`text-center ${completedCount >= 40 ? 'text-secondary' : ''}`}>
                <span className="block text-lg">{completedCount >= 40 ? '🏆' : '⬜'}</span>
                <span>Mezuniyet</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 4. Completed Lessons */}
        <Card>
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-lg">✅</span>
            Tamamlanan Dersler ({completedLessons.length})
          </h2>
          {completedLessons.length > 0 ? (
            <div className="space-y-2">
              {completedLessons.map((l, i) => (
                <div
                  key={l.id}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg bg-surface-alt/50 hover:bg-surface-alt transition-colors"
                >
                  <span className="text-xl w-8 text-center">{l.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{l.title}</p>
                    <p className="text-xs text-text-muted">{l.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-text-muted">{l.completedDate}</p>
                    <p className="text-xs font-medium text-accent-dark">+{l.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">
              Henuz tamamlanan ders bulunmuyor. İlk derse başlamak icin harika bir zaman!
            </p>
          )}
        </Card>

        {/* 5. Earned Badges */}
        <Card>
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-lg">🏅</span>
            Kazanilan Rozetler ({earnedBadges.length} / {badgeDefs.length})
          </h2>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {earnedBadges.map(badge => (
                <div key={badge.id} className="text-center p-3 rounded-xl bg-accent/5 border border-accent/20">
                  <span className="text-3xl block">{badge.icon}</span>
                  <p className="font-heading font-semibold text-xs mt-2">{badge.name}</p>
                  <p className="text-[11px] text-text-muted">{badge.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">
              Henuz rozet kazanilmadi. Dersleri tamamlayarak rozetler kazanilabilir.
            </p>
          )}

          {/* Next badges to earn */}
          {earnedBadges.length < badgeDefs.length && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-text-muted mb-2 font-medium">Siradaki Rozetler:</p>
              <div className="flex flex-wrap gap-2">
                {badgeDefs
                  .filter(b => !userBadges.includes(b.id))
                  .slice(0, 3)
                  .map(badge => (
                    <span key={badge.id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-alt rounded-full text-xs text-text-muted">
                      <span className="opacity-50">{badge.icon}</span>
                      {badge.desc}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </Card>

        {/* 6. Strengths */}
        <Card>
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-lg">💪</span>
            Guclu Yonler
          </h2>
          {strengths.length > 0 ? (
            <div className="space-y-3">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-emerald-800">{s.title}</p>
                    <p className="text-xs text-emerald-600">Bu konuda çok başarılı!</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-emerald-700">%{Math.round(s.score)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">
              Quiz sonuclari yeterli oldugunda guclu yonler burada gosterilecektir.
            </p>
          )}
        </Card>

        {/* 7. Improvement Areas */}
        <Card>
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-lg">🎯</span>
            Gelisim Alanlari
          </h2>
          {improvements.length > 0 ? (
            <div className="space-y-3">
              {improvements.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-orange-800">{s.title}</p>
                    <p className="text-xs text-orange-600">Bu konuda biraz daha calisma faydali olabilir.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-orange-700">%{Math.round(s.score)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">
              {completedCount > 0
                ? 'Tum konularda başarılı ilerleme gösteriliyor!'
                : 'Quiz sonuclari yeterli oldugunda gelisim alanlari burada gosterilecektir.'}
            </p>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center py-4 text-xs text-text-muted">
          <p>Bu rapor {new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.</p>
          <p className="mt-1">İyilik Akademi — Güzel Ahlak Eğitim Platformu</p>
        </div>
      </div>
    </>
  )
}
