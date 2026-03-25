import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { lessons as rawLessons } from '../data/lessons'
import { richContent } from '../data/richContent'
import { XP_PER_LESSON, XP_FINAL_LESSON, calculateLevel } from '../utils/xp'
import { checkBadgeEligibility } from '../utils/badges'
import MilestoneCelebration from '../components/gamification/MilestoneCelebration'
import LessonSteps from '../components/lesson/LessonSteps'
import LessonIntro from '../components/lesson/LessonIntro'
import QuizView from '../components/lesson/QuizView'
import LessonPlayer from '../components/lesson/LessonPlayer'
import InteractiveReview from '../components/lesson/InteractiveReview'
import ScenarioQuiz from '../components/lesson/ScenarioQuiz'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Icon from '../components/ui/Icon'

// Merge lessons with rich content
const lessons = rawLessons.map(l => ({ ...l, ...(richContent[l.id] || {}) }))

export default function LessonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, userData } = useAuth()
  const { lessonProgress, updateLessonProgress, addXP, recordActivity, awardBadge, getLessonStatus, completedCount, recordWrongAnswer, incrementDailyTask } = useProgress()

  const lesson = useMemo(() => lessons.find(l => l.id === Number(id)), [id])
  const hasIntro = !!(lesson?.tema || lesson?.kavramlar || lesson?.guzelSoz)
  const hasInteractive = !!(lesson?.interaktifDuraklamalar && lesson.interaktifDuraklamalar.length > 0)
  const hasScenario = !!(lesson?.senaryoSorulari && lesson.senaryoSorulari.length > 0)
  const [step, setStep] = useState(hasIntro ? 'intro' : 'preQuiz')
  const [newBadge, setNewBadge] = useState(null)
  const [milestoneData, setMilestoneData] = useState(null)
  const [showMilestone, setShowMilestone] = useState(false)

  useEffect(() => {
    if (!lesson) return
    const status = getLessonStatus(lesson.id)
    if (status === 'completed') setStep('done')
    else if (status === 'post_quiz') setStep('postQuiz')
    else if (status === 'interactive') setStep(hasInteractive ? 'interactive' : 'postQuiz')
    else if (status === 'video') setStep('video')
    else if (status === 'pre_quiz') setStep('preQuiz')
    else setStep(hasIntro ? 'intro' : 'preQuiz')
  }, [lesson, getLessonStatus, hasIntro, hasInteractive])

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

  function handleIntroComplete() {
    setStep('preQuiz')
  }

  async function handlePreQuizComplete(score, total) {
    try { await updateLessonProgress(lesson.id, { preQuizDone: true, preQuizScore: score }) } catch (e) { console.error(e) }
    setStep('video')
  }

  async function handleVideoComplete() {
    try { await updateLessonProgress(lesson.id, { videoDone: true }) } catch (e) { console.error(e) }
    if (hasInteractive) {
      setStep('interactive')
    } else {
      setStep('postQuiz')
    }
  }

  async function handleInteractiveComplete(score, total) {
    try { await updateLessonProgress(lesson.id, { interactiveDone: true, interactiveScore: score }) } catch (e) { console.error(e) }
    setStep('postQuiz')
  }

  async function handlePostQuizComplete(score, total) {
    const xp = lesson.id === 40 ? XP_FINAL_LESSON : XP_PER_LESSON
    const oldLevel = calculateLevel(userData?.xp || 0)
    try {
      await updateLessonProgress(lesson.id, {
        postQuizDone: true,
        postQuizScore: score,
        completedAt: new Date().toISOString(),
        xpEarned: xp,
      })
      await addXP(xp)
      await incrementDailyTask('lessonsToday')
      await incrementDailyTask('quizzesToday')
      const newStreak = await recordActivity()
      const newCount = completedCount + 1
      const newTotalXP = (userData?.xp || 0) + xp
      const newLevel = calculateLevel(newTotalXP)
      const eligible = checkBadgeEligibility(newCount, newTotalXP, userData?.badges || [])
      if (eligible.length > 0) {
        const awarded = await awardBadge(eligible[0].id)
        setNewBadge(awarded)
      }

      // Set milestone data for celebration check
      setMilestoneData({
        newLessonCount: newCount,
        newStreak: newStreak || 0,
        newLevel,
        oldLevel,
        quizScore: score,
        quizTotal: total,
      })
      setShowMilestone(true)
    } catch (e) { console.error(e) }
    if (hasScenario) {
      setStep('scenario')
    } else {
      setStep('done')
    }
  }

  function handleScenarioComplete() {
    setStep('done')
  }

  // Get quiz scores for summary
  const preQuizScore = lessonProgress[String(lesson.id)]?.preQuizScore
  const postQuizScore = lessonProgress[String(lesson.id)]?.postQuizScore
  const preQuizTotal = lesson.preQuiz?.length || 3
  const postQuizTotal = lesson.postQuiz?.length || 3

  const nextLesson = lessons.find(l => l.id === lesson.id + 1)

  return (
    <div className="animate-fade-in">
      {/* Milestone Celebration Overlay */}
      {showMilestone && milestoneData && (
        <MilestoneCelebration
          newLessonCount={milestoneData.newLessonCount}
          newStreak={milestoneData.newStreak}
          newLevel={milestoneData.newLevel}
          oldLevel={milestoneData.oldLevel}
          quizScore={milestoneData.quizScore}
          quizTotal={milestoneData.quizTotal}
          onDismiss={() => setShowMilestone(false)}
        />
      )}

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

      <LessonSteps currentStep={step} hasIntro={hasIntro} hasInteractive={hasInteractive} />

      {/* Intro */}
      {step === 'intro' && (
        <LessonIntro lesson={lesson} onStart={handleIntroComplete} />
      )}

      {/* Pre Quiz */}
      {step === 'preQuiz' && (
        <QuizView
          questions={lesson.preQuiz}
          onComplete={handlePreQuizComplete}
          title="Ders Öncesi Değerlendirme"
          subtitle="Konuyu daha iyi öğrenmek için önce ne bildiğini görelim"
          onWrongAnswer={(qIdx) => recordWrongAnswer(lesson.id, qIdx, 'pre')}
        />
      )}

      {/* Video */}
      {step === 'video' && (
        <LessonPlayer driveId={lesson.driveId} onComplete={handleVideoComplete} />
      )}

      {/* Interactive Review */}
      {step === 'interactive' && (
        <InteractiveReview
          items={lesson.interaktifDuraklamalar}
          onComplete={handleInteractiveComplete}
        />
      )}

      {/* Post Quiz */}
      {step === 'postQuiz' && (
        <QuizView
          questions={lesson.postQuiz}
          onComplete={handlePostQuizComplete}
          title="Ders Sonu Değerlendirme"
          subtitle="Öğrendiklerini test et ve XP kazan!"
          onWrongAnswer={(qIdx) => recordWrongAnswer(lesson.id, qIdx, 'post')}
        />
      )}

      {/* Scenario Quiz */}
      {step === 'scenario' && hasScenario && (
        <ScenarioQuiz
          scenarios={lesson.senaryoSorulari}
          onComplete={handleScenarioComplete}
        />
      )}

      {/* Done */}
      {step === 'done' && (
        <div className="max-w-2xl mx-auto animate-slide-up space-y-6">
          {/* Congrats */}
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Tebrikler!</h2>
            <p className="text-text-muted dark:text-dark-text-muted mb-2">
              <span className="font-bold text-primary">{lesson.title}</span> dersini tamamladın!
            </p>
            <p className="text-accent-dark font-bold text-lg flex items-center justify-center gap-1.5">
              <Icon name="lightning" size={20} className="text-accent" />
              +{lesson.id === 40 ? XP_FINAL_LESSON : XP_PER_LESSON} XP Kazandın!
            </p>
          </div>

          {/* Quiz Score Summary */}
          {(preQuizScore !== undefined || postQuizScore !== undefined) && (
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span>📊</span> Ders Özeti
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {preQuizScore !== undefined && (
                  <div className="text-center p-3 bg-white/60 dark:bg-dark-card/60 rounded-xl">
                    <p className="text-xs text-text-muted dark:text-dark-text-muted">Ders Öncesi</p>
                    <p className="text-2xl font-bold text-primary">{preQuizScore}/{preQuizTotal}</p>
                    <div className="h-1.5 bg-surface-alt dark:bg-dark-elevated rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary/50 rounded-full" style={{ width: `${(preQuizScore / preQuizTotal) * 100}%` }} />
                    </div>
                  </div>
                )}
                {postQuizScore !== undefined && (
                  <div className="text-center p-3 bg-white/60 dark:bg-dark-card/60 rounded-xl">
                    <p className="text-xs text-text-muted dark:text-dark-text-muted">Ders Sonrası</p>
                    <p className="text-2xl font-bold text-secondary">{postQuizScore}/{postQuizTotal}</p>
                    <div className="h-1.5 bg-surface-alt dark:bg-dark-elevated rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${(postQuizScore / postQuizTotal) * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
              {preQuizScore !== undefined && postQuizScore !== undefined && postQuizScore > preQuizScore && (
                <p className="text-center text-xs text-secondary font-medium mt-3">
                  📈 Harika! Ders sonrası skorun %{Math.round(((postQuizScore - preQuizScore) / preQuizTotal) * 100)} arttı!
                </p>
              )}
              {/* Adaptive suggestion */}
              {postQuizScore !== undefined && postQuizScore === postQuizTotal && (
                <div className="mt-3 p-2 bg-secondary/10 rounded-xl text-center">
                  <p className="text-xs text-secondary font-medium">
                    🌟 Mükemmel skor! <Link to="/meydan-okuma" className="underline font-bold">Meydan okuma quizi</Link> dene!
                  </p>
                </div>
              )}
              {postQuizScore !== undefined && postQuizScore < postQuizTotal * 0.67 && (
                <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center">
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                    💡 Bu konuyu pekiştirmek ister misin? <Link to="/tekrar" className="underline font-bold">Tekrar modunu</Link> dene!
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Learned Concepts */}
          {lesson.kavramlar && lesson.kavramlar.length > 0 && (
            <Card>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span>📝</span> Öğrendiğin Kavramlar
              </h3>
              <div className="flex flex-wrap gap-2">
                {lesson.kavramlar.map((k, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-xs font-medium">
                    ✓ {k.kavram}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Badge */}
          {(newBadge || lesson.kazanilanRozet) && (
            <Card className="text-center bg-accent/10 border-accent/30 animate-pulse-glow">
              <p className="text-sm text-text-muted mb-1">Rozet Kazandın!</p>
              <p className="text-2xl mb-1">{newBadge?.icon || '🏅'}</p>
              <p className="font-bold">{newBadge?.name || lesson.kazanilanRozet}</p>
            </Card>
          )}

          {/* Tefekkür Soruları */}
          {lesson.tefekkurSorulari && lesson.tefekkurSorulari.length > 0 && (
            <Card>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="heart" size={20} className="text-primary" /> Tefekkür Soruları
              </h3>
              <div className="space-y-3">
                {lesson.tefekkurSorulari.map((soru, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-text-light">{soru}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Haftanın Görevi */}
          {lesson.haftaninGorevi && (
            <Card className="border-secondary/30 bg-secondary/5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="target" size={20} className="text-secondary" /> Haftanın Görevi: {lesson.haftaninGorevi.baslik}
              </h3>
              <p className="text-sm text-text-light">{lesson.haftaninGorevi.aciklama}</p>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 pt-2">
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
