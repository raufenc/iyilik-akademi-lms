import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { badges as badgeDefs } from '../data/lessons'
import { LEVEL_NAMES, xpToNextLevel } from '../utils/xp'
import { generateCertificate, downloadCertificate } from '../utils/certificate'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const LEVEL_COLORS = {
  1: 'from-gray-400 to-gray-500',
  2: 'from-green-400 to-emerald-500',
  3: 'from-blue-400 to-indigo-500',
  4: 'from-purple-400 to-violet-500',
  5: 'from-pink-400 to-rose-500',
  6: 'from-orange-400 to-red-500',
  7: 'from-amber-400 to-yellow-500',
}

export default function ProfilePage() {
  const { userData } = useAuth()
  const { completedCount, totalXP, level } = useProgress()
  const userBadges = userData?.badges || []
  const { current, needed, progress } = xpToNextLevel(totalXP)
  const [certLoading, setCertLoading] = useState(null)

  async function handleDownloadCert(type) {
    setCertLoading(type)
    try {
      const dataUrl = await generateCertificate({
        name: userData?.name || 'Öğrenci',
        type,
        date: new Date().toLocaleDateString('tr-TR'),
      })
      downloadCertificate(dataUrl, `iyilik-akademi-${type}-sertifika.png`)
    } catch (e) {
      console.error('Sertifika oluşturulamadı', e)
    }
    setCertLoading(null)
  }

  const levelColor = LEVEL_COLORS[level] || LEVEL_COLORS[1]

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl mx-auto">
      {/* Profile Header — Gradient Banner */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="bg-gradient-hero h-32" />
        <div className="bg-white rounded-b-3xl px-6 pb-6 pt-14 text-center relative shadow-soft">
          {/* Avatar */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${levelColor} text-white flex items-center justify-center text-4xl font-bold shadow-medium ring-4 ring-white`}>
              {(userData?.name || 'Ö')[0].toUpperCase()}
            </div>
          </div>

          <h1 className="font-heading text-2xl font-bold">{userData?.name}</h1>
          <p className="text-sm text-text-muted">{userData?.email}</p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-6 mt-5">
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-primary">Lv.{level}</p>
              <p className="text-xs text-text-muted">{LEVEL_NAMES[level]}</p>
            </div>
            <div className="w-px h-10 bg-border-light" />
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-accent-dark">{totalXP}</p>
              <p className="text-xs text-text-muted">Toplam XP</p>
            </div>
            <div className="w-px h-10 bg-border-light" />
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-secondary">{completedCount}</p>
              <p className="text-xs text-text-muted">/ 40 Ders</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-5 max-w-sm mx-auto">
            <div className="flex justify-between text-xs text-text-muted mb-1.5">
              <span>Seviye {level}</span>
              <span>{current} / {needed} XP</span>
            </div>
            <div className="h-2.5 bg-surface-alt rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
          <span>🏅</span> Rozet Vitrini
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 stagger-children">
          {badgeDefs.map(badge => {
            const earned = userBadges.includes(badge.id)
            return (
              <Card
                key={badge.id}
                className={`text-center transition-all duration-300 ${
                  earned
                    ? 'border-accent/30 shadow-glow-gold/20'
                    : 'opacity-40 grayscale hover:opacity-60'
                }`}
              >
                <span className={`text-4xl block ${earned ? 'animate-bounce-in' : ''}`}>
                  {badge.icon}
                </span>
                <p className="font-heading font-semibold mt-2 text-sm">{badge.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{badge.desc}</p>
                {earned && (
                  <span className="inline-block mt-2 text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                    ✓ Kazanıldı
                  </span>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
          <span>📜</span> Sertifikalar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Halfway Certificate */}
          <Card className={`relative overflow-hidden ${completedCount >= 20 ? 'border-secondary/30' : 'opacity-50'}`}>
            {completedCount >= 20 && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-success" />}
            <div className="text-center py-2">
              <span className="text-5xl block mb-3">🎖️</span>
              <p className="font-heading font-bold text-lg">Yarı Yol Sertifikası</p>
              <p className="text-sm text-text-muted mt-1">20 ders tamamla</p>
              {completedCount >= 20 ? (
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-4"
                  loading={certLoading === 'halfway'}
                  onClick={() => handleDownloadCert('halfway')}
                >
                  📥 İndir
                </Button>
              ) : (
                <p className="text-xs text-text-muted mt-3">{20 - completedCount} ders kaldı</p>
              )}
            </div>
          </Card>

          {/* Completion Certificate */}
          <Card className={`relative overflow-hidden ${completedCount >= 40 ? 'border-accent/30 shadow-glow-gold/20' : 'opacity-50'}`}>
            {completedCount >= 40 && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-warm" />}
            <div className="text-center py-2">
              <span className="text-5xl block mb-3">🏆</span>
              <p className="font-heading font-bold text-lg">Mezuniyet Sertifikası</p>
              <p className="text-sm text-text-muted mt-1">Tüm 40 dersi tamamla</p>
              {completedCount >= 40 ? (
                <Button
                  size="sm"
                  variant="accent"
                  className="mt-4"
                  loading={certLoading === 'completion'}
                  onClick={() => handleDownloadCert('completion')}
                >
                  📥 İndir
                </Button>
              ) : (
                <p className="text-xs text-text-muted mt-3">{40 - completedCount} ders kaldı</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
