import { useState } from 'react'
import { useProgress } from '../contexts/ProgressContext'
import { achievements, RARITY, CATEGORIES, getAchievementsByCategory } from '../data/achievements'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'

export default function AchievementsPage() {
  const { userAchievements, coins } = useProgress()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const earnedIds = userAchievements?.map(a => a.id) || []
  const earnedCount = earnedIds.length
  const totalCount = achievements.length
  const progressPercent = Math.round((earnedCount / totalCount) * 100)

  const filteredAchievements = getAchievementsByCategory(activeCategory)

  function getEarnedData(id) {
    return userAchievements?.find(a => a.id === id)
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-8 text-white relative">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-white/10 rounded-full blur-xl" />
          <div className="relative">
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1 flex items-center gap-3">
              <span className="text-3xl">🏆</span> Başarılar
            </h1>
            <p className="text-white/70 text-sm mb-4">İyilik yolculuğunda kazandığın başarılar</p>

            {/* Progress Bar */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{earnedCount} / {totalCount} Basari</span>
                <span className="text-sm font-bold">{progressPercent}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white dark:bg-dark-card border border-border-light dark:border-dark-border text-text-light dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            {cat.id !== 'all' && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.id
                  ? 'bg-white/20'
                  : 'bg-surface-alt dark:bg-dark-elevated'
              }`}>
                {getAchievementsByCategory(cat.id).filter(a => earnedIds.includes(a.id)).length}/{getAchievementsByCategory(cat.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filteredAchievements.map(achievement => {
          const earned = earnedIds.includes(achievement.id)
          const earnedData = getEarnedData(achievement.id)
          const rarity = RARITY[achievement.rarity]

          return (
            <button
              key={achievement.id}
              onClick={() => setSelectedAchievement(achievement)}
              className="text-left w-full"
            >
              <Card
                className={`relative overflow-hidden transition-all duration-300 border-2 ${
                  earned
                    ? `${rarity.color} shadow-md`
                    : 'border-transparent grayscale opacity-60 hover:opacity-80 hover:grayscale-0'
                }`}
              >
                {/* Rarity indicator bar */}
                {earned && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rarity.gradient}`} />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                    earned ? rarity.bg : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {earned ? (
                      achievement.icon
                    ) : (
                      <>
                        <span className="opacity-40">{achievement.icon}</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500">
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-sm truncate">{achievement.name}</h3>
                      {earned && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-green-500">
                          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                          <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-text-muted dark:text-dark-text-muted mt-0.5 line-clamp-2">{achievement.description}</p>

                    {/* Reward preview */}
                    <div className="flex items-center gap-2 mt-2">
                      {achievement.reward.coins > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                          🪙 {achievement.reward.coins}
                        </span>
                      )}
                      {achievement.reward.xp > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                          ⚡ {achievement.reward.xp} XP
                        </span>
                      )}
                    </div>

                    {/* Earned date */}
                    {earned && earnedData?.earnedAt && (
                      <p className="text-[11px] text-text-muted dark:text-dark-text-muted mt-1.5">
                        Kazanildi: {new Date(earnedData.earnedAt).toLocaleDateString('tr-TR')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rarity label */}
                <div className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${rarity.bg} ${rarity.text}`}>
                  {rarity.label}
                </div>
              </Card>
            </button>
          )
        })}
      </div>

      {/* Achievement Detail Modal */}
      <Modal
        open={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        title="Başarı Detayı"
      >
        {selectedAchievement && (
          <AchievementDetail
            achievement={selectedAchievement}
            earned={earnedIds.includes(selectedAchievement.id)}
            earnedData={getEarnedData(selectedAchievement.id)}
          />
        )}
      </Modal>
    </div>
  )
}

function AchievementDetail({ achievement, earned, earnedData }) {
  const rarity = RARITY[achievement.rarity]
  const category = CATEGORIES.find(c => c.id === achievement.category)

  return (
    <div className="text-center">
      {/* Large Icon */}
      <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-6xl mb-4 ${
        earned ? rarity.bg : 'bg-gray-100 dark:bg-gray-800'
      } ${earned ? '' : 'grayscale opacity-50'}`}>
        {achievement.icon}
      </div>

      {/* Name & Category */}
      <h2 className="font-heading text-xl font-bold">{achievement.name}</h2>
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${rarity.bg} ${rarity.text}`}>
          {rarity.label}
        </span>
        {category && (
          <span className="text-xs text-text-muted dark:text-dark-text-muted bg-surface-alt dark:bg-dark-elevated px-2.5 py-1 rounded-full">
            {category.icon} {category.label}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-light dark:text-dark-text-muted mt-3">{achievement.description}</p>

      {/* Rewards */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {achievement.reward.coins > 0 && (
          <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-xl font-semibold">
            <span className="text-lg">🪙</span>
            <span>{achievement.reward.coins} Altin</span>
          </div>
        )}
        {achievement.reward.xp > 0 && (
          <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl font-semibold">
            <span className="text-lg">⚡</span>
            <span>{achievement.reward.xp} XP</span>
          </div>
        )}
      </div>

      {/* Status */}
      {earned ? (
        <div className="mt-5 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-semibold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
              <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kazanildi!
          </div>
          {earnedData?.earnedAt && (
            <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-1">
              {new Date(earnedData.earnedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-5 p-4 bg-surface-alt dark:bg-dark-elevated rounded-xl">
          <div className="flex items-center justify-center gap-2 text-text-muted dark:text-dark-text-muted font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Henuz kazanilmadi
          </div>
          <p className="text-xs text-text-muted dark:text-dark-text-muted mt-1">Bu basariyi kazanmak icin gorevini tamamla!</p>
        </div>
      )}
    </div>
  )
}
