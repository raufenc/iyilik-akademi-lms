import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { badges as badgeDefs } from '../data/lessons'
import { LEVEL_NAMES, xpToNextLevel } from '../utils/xp'
import { generateCertificate, downloadCertificate, shareCertificate, shareViaWhatsApp } from '../utils/certificate'
import { getShopItem } from '../data/shopItems'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import AvatarPicker from '../components/gamification/AvatarPicker'
import { useSound } from '../contexts/SoundContext'

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
  const { completedCount, totalXP, level, equippedItems } = useProgress()
  const userBadges = userData?.badges || []
  const { current, needed, progress } = xpToNextLevel(totalXP)
  const [certLoading, setCertLoading] = useState(null)
  const [certPreview, setCertPreview] = useState(null)
  const [shareLoading, setShareLoading] = useState(null)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const { soundEnabled, toggleSound, play } = useSound()

  async function handleGenerateCert(type) {
    setCertLoading(type)
    try {
      const dataUrl = await generateCertificate({
        name: userData?.name || 'Öğrenci',
        completedLessons: completedCount,
        type,
        date: new Date().toLocaleDateString('tr-TR'),
      })
      setCertPreview({ type, dataUrl })
    } catch (e) {
      console.error('Sertifika oluşturulamadı', e)
    }
    setCertLoading(null)
  }

  function handleDownloadCert() {
    if (!certPreview) return
    downloadCertificate(
      certPreview.dataUrl,
      `iyilik-akademi-${certPreview.type}-sertifika.png`
    )
  }

  async function handleShareCert() {
    if (!certPreview) return
    setShareLoading('share')
    try {
      await shareCertificate(
        certPreview.dataUrl,
        userData?.name || 'Öğrenci',
        certPreview.type
      )
    } catch (e) {
      console.error('Paylasim hatasi', e)
    }
    setShareLoading(null)
  }

  function handleWhatsAppShare() {
    shareViaWhatsApp(userData?.name || 'Öğrenci', certPreview?.type || 'completion')
  }

  const levelColor = LEVEL_COLORS[level] || LEVEL_COLORS[1]
  const avatar = userData?.avatar

  // Get equipped cosmetics
  const equippedNameColor = equippedItems?.nameColor ? getShopItem(equippedItems.nameColor) : null
  const equippedFrame = equippedItems?.profileFrame ? getShopItem(equippedItems.profileFrame) : null
  const equippedBadges = (equippedItems?.specialBadge || []).map(id => getShopItem(id)).filter(Boolean)

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl mx-auto">
      {/* Profile Header — Gradient Banner */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="bg-gradient-hero h-32" />
        <div className="bg-white dark:bg-dark-surface rounded-b-3xl px-6 pb-6 pt-14 text-center relative shadow-soft dark:shadow-dark-soft">
          {/* Avatar */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <button
              onClick={() => setAvatarModalOpen(true)}
              className="group relative"
              title="Avatarini degistir"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatar?.bg || levelColor} text-white flex items-center justify-center text-4xl font-bold shadow-medium ${equippedFrame ? equippedFrame.cssClass : 'ring-4 ring-white dark:ring-dark-surface'} transition-transform group-hover:scale-105`}>
                {avatar?.emoji || (userData?.name || 'O')[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-sm border border-border-light group-hover:bg-primary/5 transition-colors">
                ✏️
              </div>
            </button>
          </div>

          <h1 className={`font-heading text-2xl font-bold ${equippedNameColor ? equippedNameColor.cssClass : ''}`}>{userData?.name}</h1>
          <p className="text-sm text-text-muted">{userData?.email}</p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-6 mt-5">
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-primary">Lv.{level}</p>
              <p className="text-xs text-text-muted">{LEVEL_NAMES[level]}</p>
            </div>
            <div className="w-px h-10 bg-border-light dark:bg-dark-border" />
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-accent-dark">{totalXP}</p>
              <p className="text-xs text-text-muted">Toplam XP</p>
            </div>
            <div className="w-px h-10 bg-border-light dark:bg-dark-border" />
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
            <div className="h-2.5 bg-surface-alt dark:bg-dark-elevated rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>

          {/* Parent Report Link */}
          <Link
            to="/ebeveyn-raporu"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-surface-alt text-text-light text-sm font-medium rounded-xl hover:bg-border-light transition-colors no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8M16 17H8M10 9H8" />
            </svg>
            Ebeveyn Raporu
          </Link>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      <Modal open={avatarModalOpen} onClose={() => setAvatarModalOpen(false)} title="Avatarini Sec">
        <AvatarPicker onSelect={() => setAvatarModalOpen(false)} />
      </Modal>

      {/* Equipped Special Badges */}
      {equippedBadges.length > 0 && (
        <div>
          <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
            <span>✨</span> Özel Rozetlerim
          </h2>
          <div className="flex flex-wrap gap-3">
            {equippedBadges.map(badge => (
              <div
                key={badge.id}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl shadow-sm"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="font-heading font-semibold text-sm text-amber-800 dark:text-amber-300">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
                    ✓ Kazanildi
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
              <p className="font-heading font-bold text-lg">Yari Yol Sertifikasi</p>
              <p className="text-sm text-text-muted mt-1">20 ders tamamla</p>
              {completedCount >= 20 ? (
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-4"
                  loading={certLoading === 'halfway'}
                  onClick={() => handleGenerateCert('halfway')}
                >
                  🎨 Sertifika Olustur
                </Button>
              ) : (
                <p className="text-xs text-text-muted mt-3">{20 - completedCount} ders kaldi</p>
              )}
            </div>
          </Card>

          {/* Completion Certificate */}
          <Card className={`relative overflow-hidden ${completedCount >= 40 ? 'border-accent/30 shadow-glow-gold/20' : 'opacity-50'}`}>
            {completedCount >= 40 && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-warm" />}
            <div className="text-center py-2">
              <span className="text-5xl block mb-3">🏆</span>
              <p className="font-heading font-bold text-lg">Mezuniyet Sertifikasi</p>
              <p className="text-sm text-text-muted mt-1">Tum 40 dersi tamamla</p>
              {completedCount >= 40 ? (
                <Button
                  size="sm"
                  variant="accent"
                  className="mt-4"
                  loading={certLoading === 'completion'}
                  onClick={() => handleGenerateCert('completion')}
                >
                  🎨 Sertifika Olustur
                </Button>
              ) : (
                <p className="text-xs text-text-muted mt-3">{40 - completedCount} ders kaldi</p>
              )}
            </div>
          </Card>
        </div>

        {/* Certificate Preview Modal */}
        {certPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={() => setCertPreview(null)}>
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {/* Preview header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-heading font-bold text-lg">
                  {certPreview.type === 'halfway' ? 'Yari Yol Sertifikasi' : 'Mezuniyet Sertifikasi'}
                </h3>
                <button
                  onClick={() => setCertPreview(null)}
                  className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-border-light transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Certificate image */}
              <div className="p-4">
                <img
                  src={certPreview.dataUrl}
                  alt="Sertifika"
                  className="w-full rounded-lg shadow-soft border border-border"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 p-4 border-t border-border">
                <Button size="sm" onClick={handleDownloadCert}>
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <path d="M7 10l5 5 5-5" />
                      <path d="M12 15V3" />
                    </svg>
                    Indir
                  </span>
                </Button>

                <Button size="sm" variant="secondary" loading={shareLoading === 'share'} onClick={handleShareCert}>
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                    </svg>
                    Paylas
                  </span>
                </Button>

                <button
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp'ta Paylas
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings */}
      <div>
        <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
          <span>⚙️</span> Ayarlar
        </h2>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                {soundEnabled ? '🔊' : '🔇'}
              </div>
              <div>
                <p className="font-semibold text-sm">Ses Efektleri</p>
                <p className="text-xs text-text-muted">Quiz, XP ve seviye atlama sesleri</p>
              </div>
            </div>
            <button
              onClick={() => {
                toggleSound()
                play.click()
              }}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                soundEnabled ? 'bg-primary' : 'bg-border'
              }`}
              aria-label="Ses efektlerini ac/kapat"
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
