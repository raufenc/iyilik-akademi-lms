import { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem('pwa-dismissed')) {
      setDismissed(true)
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Also show for iOS Safari (which doesn't fire beforeinstallprompt)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isIOS && !isStandalone) {
      setShowBanner(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowBanner(false)
      }
      setDeferredPrompt(null)
    }
  }

  function handleDismiss() {
    setShowBanner(false)
    setDismissed(true)
    sessionStorage.setItem('pwa-dismissed', 'true')
  }

  if (!showBanner || dismissed) return null

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-medium dark:shadow-dark-medium border border-border dark:border-dark-border p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
            🌟
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-sm">Ana Ekrana Ekle</h3>
            <p className="text-xs text-text-muted mt-0.5">
              {isIOS
                ? 'Paylas simgesine, sonra "Ana Ekrana Ekle"ye dokun.'
                : 'Iyilik Akademi\'yi ana ekranina ekle, hizli erisim sagla!'}
            </p>
            <div className="flex gap-2 mt-3">
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Ekle
                </button>
              )}
              <button
                onClick={handleDismiss}
                className="px-4 py-1.5 bg-surface-alt text-text-muted text-xs font-medium rounded-lg hover:bg-border-light transition-colors"
              >
                Daha Sonra
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-text-muted hover:text-text shrink-0 mt-0.5"
            aria-label="Kapat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
