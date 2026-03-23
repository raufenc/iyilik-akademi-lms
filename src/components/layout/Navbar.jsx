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
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-alt"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">🌟</span>
            <span className="font-bold text-xl text-primary hidden sm:block">İyilik Akademi</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/dersler" className="text-text-light hover:text-primary no-underline text-sm font-medium">Dersler</Link>
          <Link to="/siralama" className="text-text-light hover:text-primary no-underline text-sm font-medium">Sıralama</Link>
          {user && <Link to="/forum" className="text-text-light hover:text-primary no-underline text-sm font-medium">Forum</Link>}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-accent/20 px-3 py-1.5 rounded-full">
                <span className="text-sm">⚡</span>
                <span className="text-sm font-semibold text-accent-dark">{totalXP} XP</span>
                <span className="text-xs text-text-light">Lv.{level}</span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-surface-alt"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {(userData?.name || 'Ö')[0].toUpperCase()}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white border border-border rounded-xl shadow-lg py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="font-medium text-sm">{userData?.name}</p>
                      <p className="text-xs text-text-muted">{LEVEL_NAMES[level]} - {totalXP} XP</p>
                    </div>
                    <Link to="/panel" className="block px-4 py-2 text-sm hover:bg-surface-alt no-underline text-text" onClick={() => setDropdownOpen(false)}>
                      Dashboard
                    </Link>
                    <Link to="/profil" className="block px-4 py-2 text-sm hover:bg-surface-alt no-underline text-text" onClick={() => setDropdownOpen(false)}>
                      Profil
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-surface-alt no-underline text-primary font-medium" onClick={() => setDropdownOpen(false)}>
                        Admin Paneli
                      </Link>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-surface-alt">
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/giris" className="text-sm font-medium text-text-light hover:text-primary no-underline">Giriş</Link>
              <Link to="/kayit" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark no-underline">
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
