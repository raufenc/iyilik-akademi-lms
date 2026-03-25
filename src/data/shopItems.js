export const SHOP_CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: '🏪' },
  { id: 'tema', label: 'İsim Rengi', icon: '🎨' },
  { id: 'cerceve', label: 'Çerçeve', icon: '🖼️' },
  { id: 'rozet', label: 'Rozet', icon: '🏅' },
]

export const shopItems = [
  // ═══════ TEMA (İsim Renkleri) ═══════
  {
    id: 'tema_zumrut',
    name: 'Zümrüt Yeşili',
    description: 'İsmin zümrüt yeşili renkte görünsün',
    price: 50,
    category: 'tema',
    icon: '🌿',
    rarity: 'common',
    cssClass: 'text-emerald-600',
    type: 'nameColor',
  },
  {
    id: 'tema_gece',
    name: 'Gece Mavisi',
    description: 'İsmin gece mavisi renkte görünsün',
    price: 50,
    category: 'tema',
    icon: '🌙',
    rarity: 'common',
    cssClass: 'text-indigo-600',
    type: 'nameColor',
  },
  {
    id: 'tema_safran',
    name: 'Safran Rengi',
    description: 'İsmin sıcak safran renginde görünsün',
    price: 75,
    category: 'tema',
    icon: '🌾',
    rarity: 'rare',
    cssClass: 'text-amber-600',
    type: 'nameColor',
  },
  {
    id: 'tema_bordo',
    name: 'Osmanlı Bordo',
    description: 'İsmin asil bordo renginde görünsün',
    price: 75,
    category: 'tema',
    icon: '🕌',
    rarity: 'rare',
    cssClass: 'text-rose-700',
    type: 'nameColor',
  },
  {
    id: 'tema_altin',
    name: 'Altın Parıltı',
    description: 'İsmin altın renkte parlasın',
    price: 150,
    category: 'tema',
    icon: '✨',
    rarity: 'epic',
    cssClass: 'text-amber-500 font-bold',
    type: 'nameColor',
  },
  {
    id: 'tema_hilal',
    name: 'Hilal Işığı',
    description: 'İsmin hilal gibi gümüşî parlasın',
    price: 300,
    category: 'tema',
    icon: '☪️',
    rarity: 'legendary',
    cssClass: 'bg-gradient-to-r from-slate-500 via-amber-400 to-slate-500 bg-clip-text text-transparent font-bold',
    type: 'nameColor',
  },

  // ═══════ ÇERÇEVE (Profil Çerçeveleri) ═══════
  {
    id: 'cerceve_gumus',
    name: 'Gümüş Çerçeve',
    description: 'Avatarının etrafında gümüş halka',
    price: 60,
    category: 'cerceve',
    icon: '⚪',
    rarity: 'common',
    cssClass: 'ring-4 ring-gray-400',
    type: 'profileFrame',
  },
  {
    id: 'cerceve_zumrut',
    name: 'Zümrüt Çerçeve',
    description: 'Avatarının etrafında zümrüt yeşili halka',
    price: 100,
    category: 'cerceve',
    icon: '💚',
    rarity: 'rare',
    cssClass: 'ring-4 ring-emerald-500',
    type: 'profileFrame',
  },
  {
    id: 'cerceve_altin',
    name: 'Altın Çerçeve',
    description: 'Avatarının etrafında altın halka',
    price: 150,
    category: 'cerceve',
    icon: '🥇',
    rarity: 'epic',
    cssClass: 'ring-4 ring-amber-400 shadow-lg shadow-amber-400/30',
    type: 'profileFrame',
  },
  {
    id: 'cerceve_hilal',
    name: 'Hilal Çerçeve',
    description: 'Avatarının etrafında parlayan hilal çerçevesi',
    price: 350,
    category: 'cerceve',
    icon: '☪️',
    rarity: 'legendary',
    cssClass: 'ring-4 ring-amber-300 shadow-lg shadow-amber-300/40',
    type: 'profileFrame',
  },

  // ═══════ ROZET (Özel Rozetler) ═══════
  {
    id: 'rozet_ilim',
    name: 'İlim Talibi',
    description: 'Profilinde İlim Talibi rozeti görünsün',
    price: 80,
    category: 'rozet',
    icon: '📚',
    rarity: 'common',
    cssClass: '',
    type: 'specialBadge',
  },
  {
    id: 'rozet_seyyah',
    name: 'İlim Seyyahı',
    description: 'Profilinde İlim Seyyahı rozeti görünsün',
    price: 120,
    category: 'rozet',
    icon: '🕌',
    rarity: 'rare',
    cssClass: '',
    type: 'specialBadge',
  },
  {
    id: 'rozet_tesbih',
    name: 'Zikir Ehli',
    description: 'Profilinde Zikir Ehli rozeti görünsün',
    price: 150,
    category: 'rozet',
    icon: '📿',
    rarity: 'epic',
    cssClass: '',
    type: 'specialBadge',
  },
  {
    id: 'rozet_hafiz',
    name: 'Hafız',
    description: 'Profilinde efsanevi Hafız rozeti görünsün',
    price: 300,
    category: 'rozet',
    icon: '📖',
    rarity: 'legendary',
    cssClass: '',
    type: 'specialBadge',
  },
  {
    id: 'rozet_hilal',
    name: 'Hilal Yıldız',
    description: 'Profilinde Hilal Yıldız rozeti görünsün',
    price: 500,
    category: 'rozet',
    icon: '☪️',
    rarity: 'legendary',
    cssClass: '',
    type: 'specialBadge',
  },
]

// Helper: get item by id
export function getShopItem(id) {
  return shopItems.find(i => i.id === id)
}

// Helper: get items by category
export function getShopItemsByCategory(category) {
  if (category === 'all') return shopItems
  return shopItems.filter(i => i.category === category)
}

// Rarity price indicator colors
export const RARITY_COLORS = {
  common: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  rare: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700',
  epic: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700',
  legendary: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700',
}
