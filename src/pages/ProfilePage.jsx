import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { badges as badgeDefs } from '../data/lessons'
import { LEVEL_NAMES, xpToNextLevel } from '../utils/xp'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'

export default function ProfilePage() {
  const { userData } = useAuth()
  const { completedCount, totalXP, level } = useProgress()
  const userBadges = userData?.badges || []
  const { current, needed } = xpToNextLevel(totalXP)

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl mx-auto">
      {/* Profile Header */}
      <Card className="text-center">
        <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mx-auto mb-3">
          {(userData?.name || 'Ö')[0].toUpperCase()}
        </div>
        <h1 className="text-xl font-bold">{userData?.name}</h1>
        <p className="text-sm text-text-muted">{userData?.email}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{level}</p>
            <p className="text-xs text-text-muted">{LEVEL_NAMES[level]}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-accent-dark">{totalXP}</p>
            <p className="text-xs text-text-muted">XP</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-secondary">{completedCount}</p>
            <p className="text-xs text-text-muted">Ders</p>
          </div>
        </div>
        <div className="mt-4 max-w-xs mx-auto">
          <ProgressBar value={current} max={needed} size="md" showLabel />
        </div>
      </Card>

      {/* Badges */}
      <div>
        <h2 className="text-lg font-bold mb-3">Rozetler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badgeDefs.map(badge => {
            const earned = userBadges.includes(badge.id)
            return (
              <Card key={badge.id} className={`text-center ${!earned && 'opacity-40 grayscale'}`}>
                <span className="text-3xl">{badge.icon}</span>
                <p className="font-semibold mt-2">{badge.name}</p>
                <p className="text-xs text-text-muted">{badge.desc}</p>
                {earned && <p className="text-xs text-secondary font-medium mt-1">Kazanıldı!</p>}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <h2 className="text-lg font-bold mb-3">Sertifikalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className={completedCount >= 20 ? '' : 'opacity-40'}>
            <div className="text-center">
              <span className="text-3xl">📜</span>
              <p className="font-semibold mt-2">Yarı Yol Sertifikası</p>
              <p className="text-xs text-text-muted">20 ders tamamla</p>
              {completedCount >= 20 && (
                <button className="mt-3 text-sm text-primary font-medium hover:underline">
                  İndir
                </button>
              )}
            </div>
          </Card>
          <Card className={completedCount >= 40 ? '' : 'opacity-40'}>
            <div className="text-center">
              <span className="text-3xl">🏆</span>
              <p className="font-semibold mt-2">Mezuniyet Sertifikası</p>
              <p className="text-xs text-text-muted">Tüm dersleri tamamla</p>
              {completedCount >= 40 && (
                <button className="mt-3 text-sm text-primary font-medium hover:underline">
                  İndir
                </button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
