import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import { XP_PER_LESSON, XP_FINAL_LESSON } from '../utils/xp'
import { checkBadgeEligibility } from '../utils/badges'
import LessonSteps from '../components/lesson/LessonSteps'
import QuizView from '../components/lesson/QuizView'
import LessonPlayer from '../components/lesson/LessonPlayer'
import Button from '../components/ui/Button'

export default function LessonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, userData } = useAuth()
  const { lessonProgress, updateLessonProgress, addXP, awardBadge, getLessonStatus, completedCount } = useProgress()

  const lesson = lessons.find(l => l.id === Number(id))
  const [step, setStep] = useState('preQuiz')
  const [newBadge, setNewBadge] = useState(null)

  useEffect(() => {
    if (!lesson) return
    const status = getLessonStatus(lesson.id)
    if (status === 'completed') setStep('done')
    else if (status === 'post_quiz') setStep('postQuiz')
    else if (status === 'video') setStep('video')
    else setStep('preQuiz')
  }, [lesson, getLessonStatus])

  if (!user) {
    navigate('/giris')
    return null
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Ders bulunamadı</h2>
        <Link to="/dersler" className="text-primary">Ders listesine dön</Link>
      </div>
    )
  }

  async function handlePreQuizComplete(score, total) {
    try { await updateLessonProgress(lesson.id, { preQuizDone: true, preQuizScore: score }) } catch (e) { console.error(e) }
    setStep('video')
  }

  async function handleVideoComplete() {
    try { await updateLessonProgress(lesson.id, { videoDone: true }) } catch (e) { console.error(e) }
    setStep('postQuiz')
  }

  async function handlePostQuizComplete(score, total) {
    const xp = lesson.id === 40 ? XP_FINAL_LESSON : XP_PER_LESSON
    try {
      await updateLessonProgress(lesson.id, {
        postQuizDone: true,
        postQuizScore: score,
        completedAt: new Date().toISOString(),
        xpEarned: xp,
      })
      await addXP(xp)
      const newCount = completedCount + 1
      const totalXP = (userData?.xp || 0) + xp
      const eligible = checkBadgeEligibility(newCount, totalXP, userData?.badges || [])
      if (eligible.length > 0) {
        const awarded = await awardBadge(eligible[0].id)
        setNewBadge(awarded)
      }
    } catch (e) { console.error(e) }
    setStep('done')
  }

  const nextLesson = lessons.find(l => l.id === lesson.id + 1)

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <Link to="/dersler" className="text-sm text-text-muted hover:text-primary no-underline mb-2 inline-block">← Derslere Dön</Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${lesson.color}15` }}>
            {lesson.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold">{lesson.title}</h1>
            <p className="text-sm text-text-muted">{lesson.subtitle}</p>
          </div>
        </div>
      </div>

      <LessonSteps currentStep={step} />

      {/* Content */}
      {step === 'preQuiz' && (
        <QuizView
          questions={lesson.preQuiz}
          onComplete={handlePreQuizComplete}
          title="Ders Öncesi Değerlendirme"
          subtitle="Konuyu daha iyi öğrenmek için önce ne bildiğini görelim"
        />
      )}

      {step === 'video' && (
        <LessonPlayer driveId={lesson.driveId} onComplete={handleVideoComplete} />
      )}

      {step === 'postQuiz' && (
        <QuizView
          questions={lesson.postQuiz}
          onComplete={handlePostQuizComplete}
          title="Ders Sonu Değerlendirme"
          subtitle="Öğrendiklerini test et ve XP kazan!"
        />
      )}

      {step === 'done' && (
        <div className="text-center py-12 animate-slide-up">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Tebrikler!</h2>
          <p className="text-text-muted mb-2">
            <span className="font-bold text-primary">{lesson.title}</span> dersini tamamladın!
          </p>
          <p className="text-accent-dark font-bold text-lg mb-6">
            +{lesson.id === 40 ? XP_FINAL_LESSON : XP_PER_LESSON} XP Kazandın!
          </p>

          {newBadge && (
            <div className="inline-block bg-accent/20 border border-accent px-6 py-4 rounded-2xl mb-6 animate-pulse-glow">
              <p className="text-sm text-text-muted mb-1">Yeni Rozet Kazandın!</p>
              <p className="text-2xl mb-1">{newBadge.icon}</p>
              <p className="font-bold">{newBadge.name}</p>
              <p className="text-sm text-text-muted">{newBadge.desc}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            {nextLesson && (
              <Button onClick={() => navigate(`/ders/${nextLesson.id}`)}>
                Sonraki Ders: {nextLesson.title}
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate('/dersler')}>
              Ders Listesi
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
