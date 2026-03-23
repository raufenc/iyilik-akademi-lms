import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'
import { LEVEL_NAMES } from '../../utils/xp'

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
    <nav className="glass border-b border-border-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-xl hover:bg-primary/5 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="text-2xl">🌟</span>
            <span className="font-heading font-bold text-xl text-gradient hidden sm:block">İyilik Akademi</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {[
            { to: '/dersler', label: 'Dersler' },
            { to: '/siralama', label: 'Sıralama' },
            ...(user ? [{ to: '/forum', label: 'Forum' }] : []),
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-text-light hover:text-primary hover:bg-primary/5 no-underline text-sm font-medium px-4 py-2 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* XP Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-accent/20 to-accent-dark/10 px-4 py-2 rounded-full border border-accent/30">
                <span className="text-sm">⚡</span>
                <span className="text-sm font-bold text-accent-dark">{totalXP} XP</span>
                <span className="text-xs font-medium text-text-light bg-white/60 px-1.5 py-0.5 rounded">Lv.{level}</span>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {(userData?.name || 'Ö')[0].toUpperCase()}
                  </div>
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-14 w-60 bg-white border border-border-light rounded-2xl shadow-medium py-2 animate-fade-in z-50">
                      <div className="px-4 py-3 border-b border-border-light">
                        <p className="font-heading font-semibold text-sm">{userData?.name}</p>
                        <p className="text-xs text-text-muted mt-0.5">{LEVEL_NAMES[level]} — {totalXP} XP</p>
                      </div>
                      {[
                        { to: '/panel', label: '📊 Dashboard' },
                        { to: '/profil', label: '👤 Profil' },
                        ...(isAdmin ? [{ to: '/admin', label: '⚙️ Admin Paneli', cls: 'text-primary font-medium' }] : []),
                      ].map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`block px-4 py-2.5 text-sm hover:bg-surface-alt no-underline text-text rounded-lg mx-1 transition-colors ${item.cls || ''}`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border-light mt-1 pt-1 mx-1">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger/5 rounded-lg transition-colors">
                          🚪 Çıkış Yap
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/giris" className="text-sm font-medium text-text-light hover:text-primary no-underline px-3 py-2 rounded-xl hover:bg-primary/5 transition-all">
                Giriş
              </Link>
              <Link
                to="/kayit"
                className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-xl hover:shadow-glow no-underline transition-all duration-200 hover:scale-[1.03]"
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
