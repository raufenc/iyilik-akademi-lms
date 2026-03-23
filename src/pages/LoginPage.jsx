import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const location = useLocation()
  const [isRegister, setIsRegister] = useState(location.pathname === '/kayit')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        if (!name.trim()) { setError('Ad Soyad gerekli'); setLoading(false); return }
        if (password.length < 6) { setError('Şifre en az 6 karakter olmalı'); setLoading(false); return }
        await register(email, password, name.trim())
      } else {
        await login(email, password)
      }
      navigate('/panel')
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': 'Bu e-posta zaten kayıtlı',
        'auth/invalid-email': 'Geçersiz e-posta adresi',
        'auth/weak-password': 'Şifre çok zayıf',
        'auth/user-not-found': 'Kullanıcı bulunamadı',
        'auth/wrong-password': 'Yanlış şifre',
        'auth/invalid-credential': 'E-posta veya şifre yanlış',
      }
      setError(messages[err.code] || 'Bir hata oluştu')
    }
    setLoading(false)
  }

  async function handleGoogle() {
    try {
      await loginWithGoogle()
      navigate('/panel')
    } catch (err) {
      setError('Google ile giriş başarısız')
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-border-light bg-surface-alt/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all'

  return (
    <div className="min-h-screen flex">
      {/* Left — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden items-center justify-center p-12">
        {/* Floating decorations */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-40 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

        <div className="relative text-center text-white max-w-md">
          <div className="text-7xl mb-6 animate-float">🌟</div>
          <h2 className="font-heading text-4xl font-bold mb-4">İyilik Akademi</h2>
          <p className="text-xl text-white/80 leading-relaxed mb-8">
            40 ders, 240+ quiz ile çocuklara güzel ahlak ve değerler öğreten interaktif eğitim platformu.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['🎬 Video Dersler', '🧩 İnteraktif Quizler', '🏆 Rozetler & XP', '📜 Hadis & Ayetler'].map(f => (
              <span key={f} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-mesh">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="no-underline">
              <span className="text-5xl">🌟</span>
              <h1 className="font-heading text-2xl font-bold text-gradient mt-2">İyilik Akademi</h1>
            </Link>
          </div>

          {/* Desktop header */}
          <div className="hidden lg:block mb-8">
            <h1 className="font-heading text-3xl font-bold text-text">
              {isRegister ? 'Hesap Oluştur' : 'Hoş Geldin!'}
            </h1>
            <p className="text-text-muted mt-2">
              {isRegister ? 'İyilik yolculuğuna başla' : 'Hesabına giriş yap ve devam et'}
            </p>
          </div>

          {/* Mobile subtitle */}
          <p className="text-center text-text-muted mb-6 lg:hidden">
            {isRegister ? 'Yeni hesap oluştur' : 'Hesabına giriş yap'}
          </p>

          <div className="bg-white rounded-3xl border border-border-light p-8 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Ad Soyad</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Adınız Soyadınız" />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold mb-2">E-posta</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClass} placeholder="ornek@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Şifre</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className={inputClass} placeholder={isRegister ? 'En az 6 karakter' : 'Şifreniz'} />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-danger bg-danger/10 px-4 py-3 rounded-xl">
                  <span>⚠️</span> {error}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-light" /></div>
              <div className="relative flex justify-center text-xs text-text-muted">
                <span className="bg-white px-4">veya</span>
              </div>
            </div>

            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-border-light rounded-xl hover:bg-surface-alt hover:border-primary/20 text-sm font-semibold transition-all duration-200 hover:shadow-soft"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google ile giriş yap
            </button>

            <p className="text-center text-sm text-text-muted mt-6">
              {isRegister ? (
                <>Hesabın var mı? <button onClick={() => setIsRegister(false)} className="text-primary font-semibold hover:underline">Giriş yap</button></>
              ) : (
                <>Hesabın yok mu? <button onClick={() => setIsRegister(true)} className="text-primary font-semibold hover:underline">Kayıt ol</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
