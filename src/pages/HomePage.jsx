import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { lessons } from '../data/lessons'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

/* ───────── Animated Counter Hook ───────── */
function useCountUp(target, duration = 2000, startDelay = 300) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const timeout = setTimeout(() => {
      const steps = 40
      const increment = target / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [started, target, duration, startDelay])

  return { count, ref }
}

/* ───────── Floating Decorative Element ───────── */
function FloatingOrb({ className, style }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ ...style, willChange: 'transform' }}
    />
  )
}

/* ───────── Main Component ───────── */
export default function HomePage() {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const stats = [
    { label: 'Ders', target: 40, suffix: '+', icon: '📚' },
    { label: 'Quiz Sorusu', target: 240, suffix: '+', icon: '🧠' },
    { label: 'Rozet', target: 8, suffix: '', icon: '🏅' },
    { label: 'Fiyat', target: 0, suffix: '', icon: '💎', display: 'Ücretsiz' },
  ]

  const features = [
    {
      icon: '🎬',
      title: 'İnteraktif Video Dersler',
      desc: 'Profesyonel animasyonlarla zenginleştirilmiş, çocukların ilgisini çeken kısa ve etkili video içerikler.',
      gradient: 'from-primary/10 to-primary-light/10',
    },
    {
      icon: '🧩',
      title: 'Akıllı Quiz Sistemi',
      desc: 'Her dersin oncesinde ve sonrasinda bilgiyi olcen, aninda geri bildirim veren quiz\'ler ile ogrenmeyi pekistirin.',
      gradient: 'from-secondary/10 to-secondary-light/10',
    },
    {
      icon: '🏆',
      title: 'Oyunlaştırma ve Rozetler',
      desc: 'XP puanları, özel rozetler ve sertifikalar ile çocuklarınızı motive edin. Her ders bir başarı hikayesi.',
      gradient: 'from-accent-dark/10 to-accent/10',
    },
  ]

  const steps = [
    { num: '01', icon: '✨', title: 'Kayıt Ol', desc: 'Ücretsiz hesabınızı saniyeler içinde oluşturun.' },
    { num: '02', icon: '📖', title: 'Ders Seç', desc: '40 farklı değerler eğitimi dersinden birini seçin.' },
    { num: '03', icon: '🎯', title: 'İzle & Öğren', desc: 'Video dersleri izleyin, quizlerle pekiştirin.' },
    { num: '04', icon: '🌟', title: 'XP Kazan', desc: 'Rozetler ve sertifikalar ile başarınızı taçlandırın.' },
  ]

  const sampleLessons = lessons.slice(0, 6)

  return (
    <div className="animate-fade-in -mx-4 sm:-mx-6 lg:-mx-8">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative bg-gradient-hero overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Decorative floating orbs */}
        <FloatingOrb
          className="animate-float w-72 h-72 opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            top: '-5%', left: '-8%',
            animationDuration: '6s',
          }}
        />
        <FloatingOrb
          className="animate-float w-48 h-48 opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(253,203,110,0.6) 0%, transparent 70%)',
            top: '15%', right: '5%',
            animationDuration: '5s',
            animationDelay: '1s',
          }}
        />
        <FloatingOrb
          className="animate-float w-32 h-32 opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(0,184,148,0.5) 0%, transparent 70%)',
            bottom: '10%', left: '15%',
            animationDuration: '4s',
            animationDelay: '2s',
          }}
        />
        <FloatingOrb
          className="animate-float w-20 h-20 opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
            top: '60%', right: '20%',
            animationDuration: '7s',
            animationDelay: '0.5s',
          }}
        />
        {/* Small star accents */}
        <div className="absolute top-[12%] left-[10%] text-white/20 text-2xl animate-float" style={{ animationDuration: '4s' }}>&#10022;</div>
        <div className="absolute top-[25%] right-[12%] text-white/15 text-xl animate-float" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>&#10022;</div>
        <div className="absolute bottom-[20%] right-[30%] text-white/10 text-3xl animate-float" style={{ animationDuration: '6s', animationDelay: '0.8s' }}>&#10022;</div>

        <div className="relative z-10 max-w-4xl mx-auto text-center py-20 md:py-32 lg:py-40">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Türkiye'nin Çocuklara Özel Değerler Eğitimi Platformu
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
            İyilik ile Dolu Bir{' '}
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="text-gradient-warm" style={{ WebkitTextFillColor: 'transparent', background: 'linear-gradient(135deg, #FDCB6E 0%, #F9A825 50%, #FDCB6E 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                Yolculuğa
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q50 2 100 6 Q150 10 198 4" stroke="rgba(253,203,110,0.6)" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            {' '}Hazır mısın?
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
            Doğruluk, saygı, sabır, kardeşlik ve daha birçok güzel değeri
            interaktif derslerle öğrenin, quizlerle pekiştirin, rozetlerle ödüllendirin.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {user ? (
              <Button
                variant="glass"
                size="xl"
                className="!bg-white !text-primary-dark font-bold shadow-xl hover:shadow-2xl min-w-[200px]"
                onClick={() => navigate('/panel')}
              >
                Panele Git &rarr;
              </Button>
            ) : (
              <>
                <Button
                  size="xl"
                  className="!bg-white !text-primary-dark font-bold shadow-xl hover:shadow-2xl min-w-[200px]"
                  onClick={() => navigate('/kayit')}
                >
                  Hemen Başla &rarr;
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="!border-white/40 !text-white hover:!bg-white/10 min-w-[200px]"
                  onClick={() => navigate('/dersler')}
                >
                  Derslere Göz At
                </Button>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mt-12 text-white/50 text-sm animate-slide-up" style={{ animationDelay: '400ms' }}>
            <span className="flex items-center gap-1.5">
              <span className="text-base">&#10003;</span> Tamamen Ücretsiz
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-base">&#10003;</span> Kredi Kartı Gerekmez
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-base">&#10003;</span> 40+ Ders
            </span>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 20 1440 40 L1440 80 L0 80Z" fill={isDark ? '#0F0F1A' : '#F0F2F5'} />
          </svg>
        </div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl shadow-medium p-2 sm:p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 stagger-children">
              {stats.map((stat, i) => {
                const { count, ref } = useCountUp(stat.target, 1500, i * 200)
                return (
                  <div
                    key={stat.label}
                    ref={ref}
                    className="text-center py-4 sm:py-6 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl sm:text-3xl block mb-1">{stat.icon}</span>
                    <p className="text-2xl sm:text-3xl font-extrabold font-heading text-text">
                      {stat.display ? (
                        <span className="text-secondary">{stat.display}</span>
                      ) : (
                        <>{count}{stat.suffix}</>
                      )}
                    </p>
                    <p className="text-xs sm:text-sm text-text-muted font-medium mt-0.5">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Özellikler</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text mb-4">
              Öğrenmeyi <span className="text-gradient">Eğlenceye</span> Dönüştürüyoruz
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Çocuklarınız için özel olarak tasarlanmış, modern ve interaktif eğitim deneyimi.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 stagger-children">
            {features.map((f, i) => (
              <Card
                key={i}
                hover
                glass
                className="group relative overflow-hidden text-center p-8 sm:p-10"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-light/10 flex items-center justify-center mx-auto mb-6 text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text mb-3">
                    {f.title}
                  </h3>
                  <p className="text-text-light leading-relaxed text-sm sm:text-base">
                    {f.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-mesh">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Nasıl Çalışır?</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text mb-4">
              4 Adımda <span className="text-gradient">Başla</span>
            </h2>
            <p className="text-text-light text-lg max-w-xl mx-auto">
              Başlamak çok kolay. Hemen kayıt olun ve öğrenme yolculuğuna başlayın.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-secondary/30 to-accent-dark/30 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-1 md:gap-0 stagger-children">
              {steps.map((step, i) => (
                <div key={i} className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:py-8`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card hover className="inline-block !p-6 sm:!p-8 max-w-sm">
                      <span className="text-3xl mb-3 block">{step.icon}</span>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-text mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-light text-sm sm:text-base">{step.desc}</p>
                    </Card>
                  </div>

                  {/* Step number (center) */}
                  <div className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full bg-gradient-hero text-white font-heading font-extrabold text-sm items-center justify-center shadow-glow relative z-10">
                    {step.num}
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />

                  {/* Mobile step number */}
                  <div className="md:hidden flex-shrink-0 w-10 h-10 rounded-full bg-gradient-hero text-white font-heading font-bold text-xs flex items-center justify-center shadow-glow">
                    {step.num}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SAMPLE LESSONS ═══════════════════ */}
      <section className="py-20 md:py-28">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block text-sm font-semibold text-accent-dark uppercase tracking-wider mb-3">Ders Kütüphanesi</span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
                Popüler <span className="text-gradient-warm">Dersler</span>
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => navigate('/dersler')}
            >
              Tümünü Gör &rarr;
            </Button>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div className="overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scrollbar-hide">
          <div className="flex gap-5 max-w-6xl mx-auto stagger-children" style={{ minWidth: 'max-content' }}>
            {sampleLessons.map((lesson, i) => (
              <div
                key={lesson.id}
                className="w-[280px] sm:w-[300px] flex-shrink-0 group cursor-pointer"
                onClick={() => navigate(user ? `/ders/${lesson.id}` : '/giris')}
              >
                <Card hover className="h-full !p-0 overflow-hidden">
                  {/* Color header */}
                  <div
                    className="h-32 sm:h-36 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${lesson.color}22 0%, ${lesson.color}44 100%)` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-5xl sm:text-6xl group-hover:scale-125 transition-transform duration-500"
                        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                      >
                        {lesson.icon}
                      </span>
                    </div>
                    {/* Lesson number badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-text">
                      {lesson.order}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs font-medium text-text-muted mb-1">{lesson.subtitle}</p>
                    <h4 className="font-heading text-base font-bold text-text mb-2 leading-snug">
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span>&#9889;</span> {lesson.xp} XP
                      </span>
                      <span className="flex items-center gap-1">
                        <span>&#10067;</span> {lesson.preQuiz.length + lesson.postQuiz.length} Soru
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile "see all" button */}
        <div className="sm:hidden text-center mt-6 px-4">
          <Button variant="outline" size="md" onClick={() => navigate('/dersler')}>
            Tum Dersleri Gor &rarr;
          </Button>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIAL / CTA ═══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-hero rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 text-center">
            {/* Decorative */}
            <FloatingOrb
              className="animate-float w-40 h-40 opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
                top: '-10%', right: '-5%',
                animationDuration: '5s',
              }}
            />
            <FloatingOrb
              className="animate-float w-28 h-28 opacity-10"
              style={{
                background: 'radial-gradient(circle, rgba(253,203,110,0.6) 0%, transparent 70%)',
                bottom: '-5%', left: '5%',
                animationDuration: '6s',
                animationDelay: '1s',
              }}
            />

            <div className="relative z-10">
              <span className="text-5xl sm:text-6xl block mb-6">&#127775;</span>
              <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug mb-4 max-w-2xl mx-auto">
                &ldquo;Cocuklarimizi güzel ahlak ile yetiştirmek, onlara birakabilecegimiz en buyuk mirastir.&rdquo;
              </blockquote>
              <p className="text-white/60 text-sm sm:text-base mb-10">
                &mdash; Hz. Muhammed (s.a.v.)
              </p>

              <Button
                size="xl"
                className="!bg-white !text-primary-dark font-bold shadow-xl hover:shadow-2xl"
                onClick={() => navigate(user ? '/panel' : '/kayit')}
              >
                {user ? 'Panele Git' : 'Ücretsiz Başla'} &rarr;
              </Button>

              <p className="text-white/40 text-xs mt-4">
                Kredi karti gerekmez &middot; Hemen baslayabilirsiniz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-surface-dark text-white/70 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* About */}
            <div>
              <h4 className="font-heading text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center text-sm">&#10024;</span>
                İyilik Akademi
              </h4>
              <p className="text-sm leading-relaxed text-white/50">
                Çocuklara güzel ahlak ve değerler eğitimi sunan, interaktif ve oyunlaştırılmış online öğrenme platformu.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Baglantilar</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'Dersler', path: '/dersler' },
                  { label: 'Kayıt Ol', path: '/kayit' },
                  { label: 'Giriş Yap', path: '/giris' },
                ].map(link => (
                  <li key={link.path}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-white/50 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Iletisim</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <span>&#9993;</span> info@iyilikakademi.com
                </li>
                <li className="flex items-center gap-2">
                  <span>&#127760;</span> iyilikakademi.com
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} İyilik Akademi. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-white/30">
              Sevgiyle yapildi &#10084;&#65039;
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
