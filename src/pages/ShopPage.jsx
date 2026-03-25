import { useState } from 'react'
import { useProgress } from '../contexts/ProgressContext'
import { shopItems, SHOP_CATEGORIES, getShopItemsByCategory, RARITY_COLORS, getShopItem } from '../data/shopItems'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

const RARITY_LABELS = {
  common: 'Yaygın',
  rare: 'Nadir',
  epic: 'Epik',
  legendary: 'Efsanevi',
}

export default function ShopPage() {
  const { coins, purchasedItems, purchaseItem, equippedItems, equipItem } = useProgress()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [purchasing, setPurchasing] = useState(false)
  const [justPurchased, setJustPurchased] = useState(null)

  const ownedIds = purchasedItems?.map(i => i.id) || []
  const filteredItems = getShopItemsByCategory(activeCategory)

  function isEquipped(item) {
    if (item.type === 'specialBadge') {
      return (equippedItems?.specialBadge || []).includes(item.id)
    }
    return equippedItems?.[item.type] === item.id
  }

  async function handlePurchase() {
    if (!selectedItem) return
    setPurchasing(true)
    const success = await purchaseItem(selectedItem.id)
    setPurchasing(false)
    if (success) {
      setJustPurchased(selectedItem.id)
      setTimeout(() => setJustPurchased(null), 2000)
      setSelectedItem(null)
    }
  }

  async function handleEquip(item) {
    await equipItem(item.id)
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-8 text-white relative">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-white/10 rounded-full blur-xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1 flex items-center gap-3">
                  <span className="text-3xl">🏪</span> Mağaza
                </h1>
                <p className="text-white/70 text-sm">Altınlarını harca, profilini güzelleştir!</p>
              </div>

              {/* Coin Balance */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/30 text-center">
                <p className="text-3xl font-heading font-bold">{coins || 0}</p>
                <p className="text-xs text-white/70 flex items-center justify-center gap-1">
                  <span>🪙</span> Altın
                </p>
              </div>
            </div>

            {/* How to earn coins */}
            <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-xs text-white/60 mb-2 font-medium">Altın Nasıl Kazanılır?</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { emoji: '📚', text: 'Ders Tamamla', coins: '+10' },
                  { emoji: '🎯', text: 'Günlük Quiz', coins: '+5' },
                  { emoji: '🏆', text: 'Başarı Kazan', coins: '+10-200' },
                  { emoji: '🔥', text: 'Seri Yap', coins: '+5/gün' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-2 text-center">
                    <span className="text-lg block">{item.emoji}</span>
                    <p className="text-[11px] text-white/80 mt-0.5">{item.text}</p>
                    <p className="text-xs font-bold text-white">{item.coins}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {SHOP_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                : 'bg-white dark:bg-dark-card border border-border-light dark:border-dark-border text-text-light dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {filteredItems.map(item => {
          const owned = ownedIds.includes(item.id)
          const canAfford = (coins || 0) >= item.price
          const wasJustPurchased = justPurchased === item.id
          const equipped = isEquipped(item)

          return (
            <Card
              key={item.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                equipped
                  ? 'border-2 border-amber-400 dark:border-amber-500 shadow-lg shadow-amber-400/20'
                  : owned
                  ? 'border-2 border-green-300 dark:border-green-700'
                  : wasJustPurchased
                  ? 'border-2 border-green-400 animate-bounce-in'
                  : 'border border-border-light dark:border-dark-border hover:border-amber-300 dark:hover:border-amber-600'
              }`}
            >
              {/* Rarity label */}
              <div className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${RARITY_COLORS[item.rarity]}`}>
                {RARITY_LABELS[item.rarity]}
              </div>

              {/* Equipped indicator */}
              {equipped && (
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-600">
                  Aktif
                </div>
              )}

              <div className="text-center pt-2">
                {/* Item Icon */}
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-3 ${
                  equipped ? 'bg-amber-50 dark:bg-amber-900/30 ring-2 ring-amber-300' :
                  owned ? 'bg-green-50 dark:bg-green-900/30' : 'bg-surface-alt dark:bg-dark-elevated'
                }`}>
                  {item.icon}
                </div>

                {/* Name — show with color if it's a nameColor item */}
                <h3 className={`font-heading font-bold text-sm ${item.type === 'nameColor' ? item.cssClass : ''}`}>
                  {item.name}
                </h3>
                <p className="text-xs text-text-muted dark:text-dark-text-muted mt-0.5">{item.description}</p>

                {/* Price & Action */}
                <div className="mt-4 space-y-2">
                  {owned ? (
                    <>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-xs font-semibold">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                          <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Sahipsin
                      </div>
                      <div>
                        <button
                          onClick={() => handleEquip(item)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            equipped
                              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                              : 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30'
                          }`}
                        >
                          {equipped ? '✓ Aktif — Çıkar' : 'Kullan'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      {/* Price tag */}
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400">
                        🪙 {item.price}
                      </span>

                      <Button
                        size="sm"
                        variant={canAfford ? 'accent' : 'ghost'}
                        disabled={!canAfford}
                        onClick={() => setSelectedItem(item)}
                      >
                        {canAfford ? 'Satın Al' : 'Yetersiz'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <span className="text-5xl block mb-3">🏪</span>
          <p className="text-text-muted dark:text-dark-text-muted">Bu kategoride ürün bulunamadı.</p>
        </Card>
      )}

      {/* Purchase Confirmation Modal */}
      <Modal
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="Satın Alma Onayı"
      >
        {selectedItem && (
          <div className="text-center">
            {/* Item preview */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-surface-alt dark:bg-dark-elevated flex items-center justify-center text-5xl mb-4">
              {selectedItem.icon}
            </div>
            <h3 className="font-heading text-lg font-bold">{selectedItem.name}</h3>
            <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">{selectedItem.description}</p>

            {/* Price breakdown */}
            <div className="mt-5 p-4 bg-surface-alt dark:bg-dark-elevated rounded-xl space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted dark:text-dark-text-muted">Fiyat</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  🪙 {selectedItem.price}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted dark:text-dark-text-muted">Mevcut Bakiye</span>
                <span className="font-bold">{coins || 0} 🪙</span>
              </div>
              <div className="border-t border-border dark:border-dark-border pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted dark:text-dark-text-muted">Kalan Bakiye</span>
                  <span className={`font-bold ${(coins || 0) - selectedItem.price >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {(coins || 0) - selectedItem.price} 🪙
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-5">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setSelectedItem(null)}
              >
                Vazgeç
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                loading={purchasing}
                disabled={(coins || 0) < selectedItem.price}
                onClick={handlePurchase}
              >
                <span className="flex items-center gap-1.5">
                  🪙 Satın Al
                </span>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
