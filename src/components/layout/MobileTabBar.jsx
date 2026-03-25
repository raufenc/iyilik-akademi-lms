import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'

const TABS = [
  { path: '/panel', icon: 'dashboard', label: 'Panel' },
  { path: '/dersler', icon: 'book', label: 'Dersler' },
  { path: '/gunluk-quiz', icon: 'target', label: 'Quiz' },
  { path: '/siralama', icon: 'trophy', label: 'Sıralama' },
  { path: '/profil', icon: 'user', label: 'Profil' },
]

export default function MobileTabBar() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-border-light dark:border-dark-border z-50 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around px-1 py-1">
        {TABS.map(tab => {
          const isActive = location.pathname === tab.path
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[56px] no-underline transition-all ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-text-muted dark:text-dark-text-muted'
              }`}
            >
              <Icon name={tab.icon} size={20} />
              <span className="text-[10px] font-medium leading-tight">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
