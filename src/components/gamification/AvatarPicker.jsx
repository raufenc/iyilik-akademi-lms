import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../ui/Button'

const AVATARS = [
  { emoji: '🌙', label: 'Hilal', bg: 'from-indigo-400 to-purple-600' },
  { emoji: '⭐', label: 'Yıldız', bg: 'from-yellow-400 to-orange-400' },
  { emoji: '🕌', label: 'Cami', bg: 'from-teal-400 to-emerald-500' },
  { emoji: '📿', label: 'Tesbih', bg: 'from-amber-400 to-orange-500' },
  { emoji: '📖', label: 'Kitap', bg: 'from-blue-500 to-indigo-600' },
  { emoji: '🤲', label: 'Dua', bg: 'from-sky-400 to-blue-500' },
  { emoji: '🧕', label: 'Öğrenci', bg: 'from-teal-400 to-emerald-500' },
  { emoji: '👨‍🎓', label: 'Mezun', bg: 'from-blue-500 to-indigo-600' },
  { emoji: '👩‍🏫', label: 'Öğretmen', bg: 'from-green-400 to-teal-500' },
  { emoji: '🦁', label: 'Aslan', bg: 'from-amber-400 to-orange-500' },
  { emoji: '🦊', label: 'Tilki', bg: 'from-orange-400 to-red-500' },
  { emoji: '🐱', label: 'Kedi', bg: 'from-orange-300 to-pink-400' },
  { emoji: '🐰', label: 'Tavşan', bg: 'from-pink-300 to-rose-400' },
  { emoji: '🦋', label: 'Kelebek', bg: 'from-blue-400 to-purple-500' },
  { emoji: '🌸', label: 'Çiçek', bg: 'from-pink-400 to-rose-500' },
  { emoji: '🌻', label: 'Ayçiçeği', bg: 'from-yellow-400 to-amber-500' },
  { emoji: '🌿', label: 'Doğa', bg: 'from-green-400 to-emerald-500' },
  { emoji: '🏔️', label: 'Dağ', bg: 'from-gray-400 to-blue-400' },
  { emoji: '🌊', label: 'Deniz', bg: 'from-blue-400 to-cyan-500' },
  { emoji: '🕊️', label: 'Güvercin', bg: 'from-gray-300 to-gray-500' },
]

export default function AvatarPicker({ onSelect }) {
  const { user, userData, setUserData } = useAuth()
  const [selected, setSelected] = useState(
    userData?.avatar
      ? AVATARS.findIndex(a => a.emoji === userData.avatar.emoji)
      : -1
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    if (selected < 0) return
    setSaving(true)
    const avatar = {
      emoji: AVATARS[selected].emoji,
      bg: AVATARS[selected].bg,
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), { avatar })
      setUserData(prev => ({ ...prev, avatar }))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      if (onSelect) onSelect(avatar)
    } catch (e) {
      console.error('Avatar kaydedilemedi', e)
    }
    setSaving(false)
  }

  return (
    <div>
      <p className="text-sm text-text-muted mb-4">Sana en uygun avatarı seç!</p>
      <div className="grid grid-cols-5 gap-3">
        {AVATARS.map((av, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setSaved(false) }}
            className={`group relative flex flex-col items-center gap-1 p-1 rounded-2xl transition-all duration-200 ${
              selected === i
                ? 'ring-3 ring-primary ring-offset-2 scale-110'
                : 'hover:scale-105'
            }`}
            title={av.label}
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${av.bg} flex items-center justify-center text-2xl sm:text-3xl shadow-md transition-shadow group-hover:shadow-lg`}
            >
              {av.emoji}
            </div>
            <span className="text-[10px] text-text-muted truncate max-w-full">{av.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button
          onClick={handleSave}
          disabled={selected < 0}
          loading={saving}
          size="sm"
        >
          {saved ? 'Kaydedildi!' : 'Kaydet'}
        </Button>
        {saved && (
          <span className="text-sm text-secondary font-medium animate-fade-in">
            Avatarın güncellendi!
          </span>
        )}
      </div>
    </div>
  )
}

export { AVATARS }
