import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'
import Icon from '../ui/Icon'

const NAV_ITEMS = [
  { path: '/panel', icon: 'dashboard', label: 'Dashboard', auth: true },
  { path: '/dersler', icon: 'book', label: 'Dersler', auth: false },
  { path: '/harita', icon: 'map', label: 'Harita', auth: true },
  { path: '/gunluk-quiz', icon: 'target', label: 'Günlük Quiz', auth: true },
  { path: '/siralama', icon: 'trophy', label: 'Sıralama', auth: false },
  { path: '/meydan-okuma', icon: 'swords', label: 'Meydan Okuma', auth: false },
  { path: '/tekrar', icon: 'refresh', label: 'Tekrar', auth: true },
  { path: '/notlarim', icon: 'clipboard', label: 'Notlarım', auth: true },
  { path: '/basarilar', icon: 'award', label: 'Başarılar', auth: true },
  { path: '/magaza', icon: 'shopping-bag', label: 'Mağaza', auth: true },
  { path: '/forum', icon: 'chat', label: 'Forum', auth: true },
  { path: '/profil', icon: 'user', label: 'Profil', auth: true },
  { path: '/ebeveyn-raporu', icon: 'report', label: 'Ebeveyn Raporu', auth: true },
]

function ProgressRing({ progress, size = 56, strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border dark:text-dark-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-700"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
        {Math.round(progress)}%
      </span>
    </div>
  )
}

export default function Sidebar({ open, onClose }) {
  const { user, isAdmin, isTeacher } = useAuth()
  const { completedCount } = useProgress()
  const location = useLocation()

  const items = NAV_ITEMS.filter(item => !item.auth || user)
  const progress = (completedCount / 40) * 100

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-dark-surface border-r border-border dark:border-dark-border z-40
        transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:top-0
      `}>
        <div className="p-4 flex flex-col h-full">
          {user && (
            <div className="mb-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl flex items-center gap-4">
              <ProgressRing progress={progress} />
              <div>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">İlerleme</p>
                <p className="font-bold text-lg text-primary leading-tight">{completedCount}/40</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">Ders</p>
              </div>
            </div>
          )}

          <nav className="flex-1 space-y-1">
            {items.map(item => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-all duration-200 relative ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-light dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated hover:text-text dark:hover:text-dark-text'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-primary rounded-r-full" />
                  )}
                  <Icon name={item.icon} size={20} className={isActive ? 'text-primary' : ''} />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {isTeacher && (
              <div className="pt-4 mt-4 border-t border-border dark:border-dark-border">
                <p className="text-[11px] text-text-muted dark:text-dark-text-muted px-3 mb-2 uppercase tracking-wider font-medium">Ogretmen</p>
                <Link
                  to="/odevler"
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-all duration-200 relative ${
                    location.pathname === '/odevler'
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-light dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated hover:text-text dark:hover:text-dark-text'
                  }`}
                >
                  {location.pathname === '/odevler' && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-primary rounded-r-full" />
                  )}
                  <Icon name="clipboard" size={20} />
                  <span>Ödevler</span>
                </Link>
              </div>
            )}

            {isAdmin && (
              <div className="pt-4 mt-4 border-t border-border dark:border-dark-border">
                <p className="text-[11px] text-text-muted dark:text-dark-text-muted px-3 mb-2 uppercase tracking-wider font-medium">Admin</p>
                <Link
                  to="/admin"
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-all duration-200 relative ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-light dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated hover:text-text dark:hover:text-dark-text'
                  }`}
                >
                  {location.pathname.startsWith('/admin') && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-primary rounded-r-full" />
                  )}
                  <Icon name="settings" size={20} />
                  <span>Yönetim</span>
                </Link>
              </div>
            )}
          </nav>

          <div className="mt-auto pt-4 border-t border-border dark:border-dark-border">
            <div className="flex items-center justify-center gap-1.5 text-text-muted dark:text-dark-text-muted">
              <Icon name="heart" size={14} className="text-danger" />
              <p className="text-xs">İyilik Akademi</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
