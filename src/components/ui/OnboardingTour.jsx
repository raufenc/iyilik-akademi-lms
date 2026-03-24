import { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const STEPS = [
  {
    icon: '🌟',
    title: 'Hoş geldin!',
    text: 'İyilik Akademi\'ye hoş geldin! 40 ders, yüzlerce quiz seni bekliyor. Birlikte güzel ahlak ve değerleri öğreneceğiz.',
    illustration: (
      <div className="flex items-center justify-center gap-3 text-5xl py-4">
        <span className="animate-float" style={{ animationDelay: '0s' }}>🌟</span>
        <span className="animate-float" style={{ animationDelay: '0.3s' }}>🌍</span>
        <span className="animate-float" style={{ animationDelay: '0.6s' }}>💫</span>
      </div>
    ),
    bg: 'from-primary/10 to-secondary/10',
  },
  {
    icon: '📚',
    title: 'Dersler',
    text: 'Her ders bir videodan ve quizlerden oluşuyor. Sırayla ilerle! Her derste yeni bir değer öğreneceksin.',
    illustration: (
      <div className="flex items-center justify-center gap-3 text-5xl py-4">
        <span className="animate-float" style={{ animationDelay: '0s' }}>🎬</span>
        <span className="animate-float" style={{ animationDelay: '0.3s' }}>📚</span>
        <span className="animate-float" style={{ animationDelay: '0.6s' }}>🧩</span>
      </div>
    ),
    bg: 'from-blue-50 to-indigo-50',
  },
  {
    icon: '🏆',
    title: 'XP ve Rozetler',
    text: 'Her ders tamamladığında XP kazanırsın. Rozetler ve sertifikalar seni bekliyor! Seviye atlayarak ilerle.',
    illustration: (
      <div className="flex items-center justify-center gap-3 text-5xl py-4">
        <span className="animate-float" style={{ animationDelay: '0s' }}>\u26A1</span>
        <span className="animate-float" style={{ animationDelay: '0.3s' }}>🏆</span>
        <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎖\uFE0F</span>
      </div>
    ),
    bg: 'from-amber-50 to-orange-50',
  },
  {
    icon: '🚀',
    title: 'Hazır mısın?',
    text: 'Haydi ilk dersine başla! İyilik yolculuğunda seni harika şeyler bekliyor.',
    illustration: (
      <div className="flex items-center justify-center gap-3 text-5xl py-4">
        <span className="animate-float" style={{ animationDelay: '0s' }}>🚀</span>
        <span className="animate-float" style={{ animationDelay: '0.3s' }}>🌟</span>
        <span className="animate-float" style={{ animationDelay: '0.6s' }}>🎉</span>
      </div>
    ),
    bg: 'from-green-50 to-emerald-50',
    isFinal: true,
  },
]

export default function OnboardingTour() {
  const { user, userData, setUserData } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [sliding, setSliding] = useState(false)
  const [slideDirection, setSlideDirection] = useState('right')

  useEffect(() => {
    if (userData && !userData.onboardingDone) {
      setVisible(true)
    }
  }, [userData])

  if (!visible) return null

  async function markDone() {
    try {
      await updateDoc(doc(db, 'users', user.uid), { onboardingDone: true })
      setUserData(prev => ({ ...prev, onboardingDone: true }))
    } catch (e) {
      console.error('Onboarding durumu kaydedilemedi', e)
    }
  }

  function goNext() {
    if (step >= STEPS.length - 1) return
    setSlideDirection('right')
    setSliding(true)
    setTimeout(() => {
      setStep(s => s + 1)
      setSliding(false)
    }, 200)
  }

  function goBack() {
    if (step <= 0) return
    setSlideDirection('left')
    setSliding(true)
    setTimeout(() => {
      setStep(s => s - 1)
      setSliding(false)
    }, 200)
  }

  async function handleSkip() {
    await markDone()
    setVisible(false)
  }

  async function handleFinish() {
    await markDone()
    setVisible(false)
    navigate('/dersler')
  }

  const current = STEPS[step]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative bg-white dark:bg-dark-surface rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-text-light dark:text-dark-text transition-colors"
          aria-label="Kapat"
        >
          ✕
        </button>
        {/* Illustration area */}
        <div className={`bg-gradient-to-br ${current.bg} px-8 pt-8 pb-6`}>
          {current.illustration}
        </div>

        {/* Content */}
        <div className="px-8 pt-6 pb-8">
          <div
            className={`transition-all duration-200 ${
              sliding
                ? slideDirection === 'right'
                  ? 'opacity-0 -translate-x-4'
                  : 'opacity-0 translate-x-4'
                : 'opacity-100 translate-x-0'
            }`}
          >
            <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
              <span>{current.icon}</span> {current.title}
            </h2>
            <p className="text-text-light mt-3 leading-relaxed">{current.text}</p>
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? 'w-8 bg-primary'
                    : i < step
                      ? 'w-2 bg-primary/40'
                      : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <Button variant="ghost" size="sm" onClick={goBack}>
                Geri
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Atla
              </Button>
            )}

            {current.isFinal ? (
              <Button size="md" onClick={handleFinish}>
                İlk Dersime Git
              </Button>
            ) : (
              <Button size="md" onClick={goNext}>
                Devam
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
