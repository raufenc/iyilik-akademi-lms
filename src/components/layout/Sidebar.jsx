import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'

const NAV_ITEMS = [
  { path: '/panel', icon: '📊', label: 'Dashboard', auth: true },
  { path: '/dersler', icon: '📚', label: 'Dersler', auth: false },
  { path: '/siralama', icon: '🏆', label: 'Sıralama', auth: false },
  { path: '/forum', icon: '💬', label: 'Forum', auth: true },
  { path: '/profil', icon: '👤', label: 'Profil', auth: true },
]

export default function Sidebar({ open, onClose }) {
  const { user, isAdmin, isTeacher } = useAuth()
  const { completedCount } = useProgress()
  const location = useLocation()

  const items = NAV_ITEMS.filter(item => !item.auth || user)

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-border z-40
        transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:top-0
      `}>
        <div className="p-4 flex flex-col h-full">
          {user && (
            <div className="mb-4 p-3 bg-primary/5 rounded-xl">
              <p className="text-xs text-text-muted">İlerleme</p>
              <p className="font-bold text-lg text-primary">{completedCount}/40 Ders</p>
              <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / 40) * 100}%` }}
                />
              </div>
            </div>
          )}

          <nav className="flex-1 space-y-1">
            {items.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-light hover:bg-surface-alt'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {isTeacher && (
              <div className="pt-4 mt-4 border-t border-border">
                <p className="text-xs text-text-muted px-3 mb-2">Öğretmen</p>
                <Link
                  to="/odevler"
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors ${
                    location.pathname === '/odevler' ? 'bg-primary/10 text-primary font-medium' : 'text-text-light hover:bg-surface-alt'
                  }`}
                >
                  <span>📝</span><span>Ödevler</span>
                </Link>
              </div>
            )}

            {isAdmin && (
              <div className="pt-4 mt-4 border-t border-border">
                <p className="text-xs text-text-muted px-3 mb-2">Admin</p>
                <Link
                  to="/admin"
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors ${
                    location.pathname.startsWith('/admin') ? 'bg-primary/10 text-primary font-medium' : 'text-text-light hover:bg-surface-alt'
                  }`}
                >
                  <span>⚙️</span><span>Yönetim</span>
                </Link>
              </div>
            )}
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <p className="text-xs text-text-muted text-center">İyilik Akademi v2.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
