import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
} from '../../utils/notifications'

function timeAgo(date) {
  if (!date) return ''
  const now = new Date()
  const d = date.toDate ? date.toDate() : new Date(date)
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60) return 'Az once'
  if (diff < 3600) return `${Math.floor(diff / 60)} dk once`
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat once`
  if (diff < 604800) return `${Math.floor(diff / 86400)} gun once`
  return d.toLocaleDateString('tr-TR')
}

export default function NotificationCenter() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const panelRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  // Fetch notifications on mount and periodically
  const loadNotifications = useCallback(async () => {
    if (!user) return
    try {
      const data = await fetchNotifications(user.uid)
      setNotifications(data)
    } catch (err) {
      console.error('Notification fetch error:', err)
    }
  }, [user])

  useEffect(() => {
    loadNotifications()
    // Poll every 60 seconds
    const interval = setInterval(loadNotifications, 60000)
    return () => clearInterval(interval)
  }, [loadNotifications])

  // Close panel on outside click
  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [open])

  // Open panel and mark visible as loaded
  function togglePanel() {
    setOpen(prev => !prev)
    if (!open) loadNotifications()
  }

  // Mark single as read
  async function handleMarkRead(notifId) {
    if (!user) return
    try {
      await markAsRead(user.uid, notifId)
      setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n))
    } catch (err) {
      console.error('Mark read error:', err)
    }
  }

  // Mark all as read
  async function handleMarkAllRead() {
    if (!user) return
    try {
      await markAllAsRead(user.uid)
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (err) {
      console.error('Mark all read error:', err)
    }
  }

  if (!user) return null

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={togglePanel}
        className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-primary/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Bildirimler"
        title="Bildirimler"
      >
        {/* Bell SVG */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-light dark:text-dark-text-muted"
        >
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-danger rounded-full shadow-sm animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <>
          {/* Mobile overlay */}
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-12 w-80 sm:w-96 max-h-[70vh] bg-white dark:bg-dark-surface border border-border-light dark:border-dark-border rounded-2xl shadow-medium dark:shadow-dark-medium z-50 animate-fade-in flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-dark-border">
              <h3 className="font-heading font-semibold text-sm dark:text-dark-text-heading">Bildirimler</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary dark:text-primary-light font-medium hover:underline transition-colors"
                >
                  Tümünü Okundu İşaretle
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center mb-3">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30 dark:text-primary-light/30">
                      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-muted dark:text-dark-text-muted font-medium">Bildirim yok</p>
                  <p className="text-xs text-text-muted dark:text-dark-text-muted mt-1">Yeni bildirimler burada gorunecek</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <button
                    key={notif.id}
                    onClick={() => {
                      if (!notif.read) handleMarkRead(notif.id)
                      if (notif.link) {
                        setOpen(false)
                        // Navigation would be handled by the parent or react-router
                        window.location.hash = ''
                        window.location.pathname = (import.meta.env.BASE_URL || '/') + notif.link.replace(/^\//, '')
                      }
                    }}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors border-b border-border-light/50 dark:border-dark-border/50 last:border-0 ${
                      notif.read
                        ? 'hover:bg-surface-alt/50 dark:hover:bg-dark-elevated/50'
                        : 'bg-primary/[0.03] hover:bg-primary/[0.06] dark:bg-primary/[0.05] dark:hover:bg-primary/[0.08]'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      notif.read
                        ? 'bg-surface-alt dark:bg-dark-elevated'
                        : 'bg-primary/10 dark:bg-primary/20'
                    }`}>
                      {notif.icon || '\uD83D\uDD14'}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug ${
                        notif.read
                          ? 'text-text-light dark:text-dark-text-muted'
                          : 'text-text dark:text-dark-text font-medium'
                      }`}>
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-text-muted dark:text-dark-text-muted mt-1">
                        {timeAgo(notif.createdAt)}
                      </p>
                    </div>

                    {/* Unread dot */}
                    {!notif.read && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
