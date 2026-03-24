import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'
import { useTheme } from '../../contexts/ThemeContext'
import { LEVEL_NAMES } from '../../utils/xp'
import Icon from '../ui/Icon'
import { StreakBadge } from '../gamification/StreakDisplay'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn w-9 h-9 rounded-xl flex items-center justify-center hover:bg-primary/10 dark:hover:bg-white/10 transition-colors"
      aria-label={isDark ? 'Acik temaya gec' : 'Karanlik temaya gec'}
      title={isDark ? 'Acik Tema' : 'Karanlik Tema'}
    >
      {isDark ? (
        /* Sun icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-dark">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default function Navbar({ onMenuToggle }) {
  const { user, userData, logout, isAdmin } = useAuth()
  const { totalXP, level } = useProgress()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className="glass border-b border-border-light dark:border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-xl hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
            <Icon name="menu" size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <Icon name="star" size={26} className="text-accent" />
            <span className="font-heading font-bold text-xl text-gradient hidden sm:block">Iyilik Akademi</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {[
            { to: '/dersler', label: 'Dersler' },
            { to: '/siralama', label: 'Siralama' },
            ...(user ? [{ to: '/forum', label: 'Forum' }] : []),
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-text-light dark:text-dark-text-muted hover:text-primary hover:bg-primary/5 dark:hover:bg-white/10 no-underline text-sm font-medium px-4 py-2 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {user ? (
            <>
              {/* Streak Badge */}
              <div className="hidden sm:block">
                <StreakBadge />
              </div>

              {/* XP Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-accent/20 to-accent-dark/10 dark:from-accent/30 dark:to-accent-dark/20 px-4 py-2 rounded-full border border-accent/30">
                <Icon name="lightning" size={16} className="text-accent-dark" />
                <span className="text-sm font-bold text-accent-dark">{totalXP} XP</span>
                <span className="text-xs font-medium text-text-light dark:text-dark-text bg-white/60 dark:bg-white/10 px-1.5 py-0.5 rounded">Lv.{level}</span>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
                >
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${userData?.avatar?.bg || 'from-primary to-primary-dark'} text-white flex items-center justify-center text-sm font-bold shadow-sm`}>
                    {userData?.avatar?.emoji || (userData?.name || 'O')[0].toUpperCase()}
                  </div>
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-14 w-60 bg-white dark:bg-dark-surface border border-border-light dark:border-dark-border rounded-2xl shadow-medium dark:shadow-dark-medium py-2 animate-fade-in z-50">
                      <div className="px-4 py-3 border-b border-border-light dark:border-dark-border">
                        <p className="font-heading font-semibold text-sm dark:text-dark-text-heading">{userData?.name}</p>
                        <p className="text-xs text-text-muted dark:text-dark-text-muted mt-0.5">{LEVEL_NAMES[level]} — {totalXP} XP</p>
                      </div>
                      {[
                        { to: '/panel', icon: 'dashboard', label: 'Dashboard' },
                        { to: '/profil', icon: 'user', label: 'Profil' },
                        ...(isAdmin ? [{ to: '/admin', icon: 'settings', label: 'Admin Paneli', cls: 'text-primary font-medium' }] : []),
                      ].map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-alt dark:hover:bg-dark-elevated no-underline text-text dark:text-dark-text rounded-lg mx-1 transition-colors ${item.cls || ''}`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Icon name={item.icon} size={16} />
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border-light dark:border-dark-border mt-1 pt-1 mx-1">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm text-danger hover:bg-danger/5 rounded-lg transition-colors">
                          <Icon name="logout" size={16} />
                          Cikis Yap
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/giris" className="text-sm font-medium text-text-light dark:text-dark-text-muted hover:text-primary no-underline px-3 py-2 rounded-xl hover:bg-primary/5 dark:hover:bg-white/10 transition-all">
                Giris
              </Link>
              <Link
                to="/kayit"
                className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-xl hover:shadow-glow no-underline transition-all duration-200 hover:scale-[1.03]"
              >
                Kayit Ol
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
