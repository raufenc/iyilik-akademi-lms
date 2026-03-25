import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { glossary, kategoriLabels, kategoriColors } from '../data/glossary'
import Card from '../components/ui/Card'
import Icon from '../components/ui/Icon'

const CATEGORIES = [
  { id: 'all', label: 'Tümü', icon: '📖' },
  { id: 'ahlak', label: 'Ahlak', icon: '💎' },
  { id: 'iman', label: 'İman', icon: '🕌' },
  { id: 'sosyal', label: 'Sosyal', icon: '🤝' },
  { id: 'ibadet', label: 'İbadet', icon: '📿' },
]

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(() => {
    let items = [...glossary]
    if (activeCategory !== 'all') {
      items = items.filter(g => g.kategori === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      items = items.filter(g =>
        g.kavram.toLowerCase().includes(q) ||
        g.tanim.toLowerCase().includes(q) ||
        g.arapca?.includes(q)
      )
    }
    return items.sort((a, b) => a.kavram.localeCompare(b.kavram, 'tr'))
  }, [search, activeCategory])

  return (
    <div className="page-enter max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold flex items-center justify-center gap-3">
          <span>📖</span> Kavram Sözlüğü
        </h1>
        <p className="text-text-muted dark:text-dark-text-muted mt-2">
          İslami kavramları öğren, anlamlarını keşfet
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-dark-text-muted" />
        <input
          type="text"
          placeholder="Kavram ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-border-light dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white dark:bg-dark-card border border-border-light dark:border-dark-border text-text-light dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-text-muted dark:text-dark-text-muted">
        {filtered.length} kavram
      </p>

      {/* Glossary Grid */}
      <div className="space-y-3 stagger-children">
        {filtered.map(item => {
          const isExpanded = expandedId === item.id
          const catColor = kategoriColors?.[item.kategori] || 'bg-gray-100 text-gray-600'
          return (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all duration-200 ${isExpanded ? 'border-primary/30 shadow-md' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <div className="flex items-start gap-4">
                {/* Arabic */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary" dir="rtl">{item.arapca}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-base">{item.kavram}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${catColor}`}>
                      {kategoriLabels?.[item.kategori] || item.kategori}
                    </span>
                  </div>
                  <p className="text-sm text-text-light dark:text-dark-text-muted">{item.tanim}</p>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-4 space-y-3 animate-fade-in">
                      {item.kuranReferans && (
                        <div className="flex items-start gap-2 p-2.5 bg-primary/5 dark:bg-primary/10 rounded-lg">
                          <span className="text-sm shrink-0">📖</span>
                          <div>
                            <p className="text-xs font-medium text-primary">Kur'an Referansı</p>
                            <p className="text-xs text-text-light dark:text-dark-text-muted">{item.kuranReferans}</p>
                          </div>
                        </div>
                      )}
                      {item.hadisReferans && (
                        <div className="flex items-start gap-2 p-2.5 bg-secondary/5 dark:bg-secondary/10 rounded-lg">
                          <span className="text-sm shrink-0">📿</span>
                          <div>
                            <p className="text-xs font-medium text-secondary">Hadis Referansı</p>
                            <p className="text-xs text-text-light dark:text-dark-text-muted">{item.hadisReferans}</p>
                          </div>
                        </div>
                      )}
                      <Link
                        to={`/ders/${item.ilgiliDers}`}
                        className="inline-flex items-center gap-1.5 text-xs text-primary font-medium no-underline hover:underline"
                        onClick={e => e.stopPropagation()}
                      >
                        📚 Ders {item.ilgiliDers}'e Git →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Expand indicator */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`shrink-0 text-text-muted dark:text-dark-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">📖</span>
          <p className="text-text-muted dark:text-dark-text-muted">Kavram bulunamadı</p>
        </div>
      )}
    </div>
  )
}
