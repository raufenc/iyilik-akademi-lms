import { useState, useEffect, useCallback, useRef } from 'react'
import {
  collection, query, orderBy, getDocs, addDoc, updateDoc, doc,
  serverTimestamp, arrayUnion, arrayRemove, getDoc, where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'
import { LEVEL_NAMES } from '../utils/xp'
import { notifyForumReply } from '../utils/notifications'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

// ── Constants ──────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', label: 'Tumunu Goster', icon: '\uD83D\uDCCB', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700/40 dark:text-gray-300' },
  { id: 'genel', label: 'Genel', icon: '\uD83D\uDCAC', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  { id: 'ders', label: 'Ders Tartismalari', icon: '\uD83D\uDCDA', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  { id: 'soru', label: 'Soru-Cevap', icon: '\u2753', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  { id: 'paylasim', label: 'Paylasim', icon: '\uD83C\uDF1F', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
]

const SORT_OPTIONS = [
  { id: 'newest', label: 'En Yeni' },
  { id: 'popular', label: 'En Populer' },
  { id: 'most_replies', label: 'En Cok Cevaplanan' },
]

// ── Helpers ────────────────────────────────────────────────
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

function getCategoryInfo(catId) {
  return CATEGORIES.find(c => c.id === catId) || CATEGORIES[1]
}

function UserAvatar({ name, avatar, level, size = 'md' }) {
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm'
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizeClasses} rounded-full bg-gradient-to-br ${avatar?.bg || 'from-primary to-primary-dark'} text-white flex items-center justify-center font-bold shadow-sm`}>
        {avatar?.emoji || (name || 'O')[0].toUpperCase()}
      </div>
      {level && (
        <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-white dark:bg-dark-card border border-border-light dark:border-dark-border rounded-full px-1 shadow-sm">
          {level}
        </span>
      )}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function ForumPage() {
  const { user, userData, isAdmin } = useAuth()
  const { level } = useProgress()

  // Thread list state
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Active thread state
  const [activeThread, setActiveThread] = useState(null)
  const [replies, setReplies] = useState([])
  const [repliesLoading, setRepliesLoading] = useState(false)

  // New thread form
  const [showNewThread, setShowNewThread] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newCategory, setNewCategory] = useState('genel')
  const [submitting, setSubmitting] = useState(false)

  // Reply form
  const [replyContent, setReplyContent] = useState('')
  const [replyingTo, setReplyingTo] = useState(null) // null = reply to thread, or replyId for nested
  const [replySubmitting, setReplySubmitting] = useState(false)

  // Mobile view
  const [mobileView, setMobileView] = useState('list') // 'list' | 'thread'

  const replyInputRef = useRef(null)

  // ── Fetch Threads ──
  const fetchThreads = useCallback(async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'forumThreads'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const list = []
      snap.forEach(d => list.push({ id: d.id, ...d.data() }))
      setThreads(list)
    } catch (err) {
      console.error('Forum fetch error:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchThreads()
  }, [fetchThreads])

  // ── Fetch Replies ──
  const fetchReplies = useCallback(async (threadId) => {
    setRepliesLoading(true)
    try {
      const q = query(
        collection(db, 'forumThreads', threadId, 'replies'),
        orderBy('createdAt', 'asc')
      )
      const snap = await getDocs(q)
      const list = []
      snap.forEach(d => list.push({ id: d.id, ...d.data() }))
      setReplies(list)
    } catch (err) {
      console.error('Replies fetch error:', err)
    }
    setRepliesLoading(false)
  }, [])

  // ── Open Thread ──
  function openThread(thread) {
    setActiveThread(thread)
    setReplyingTo(null)
    setReplyContent('')
    fetchReplies(thread.id)
    setMobileView('thread')
  }

  // ── Filter & Sort Threads ──
  const filteredThreads = threads
    .filter(t => {
      if (activeCategory !== 'all' && t.category !== activeCategory) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return t.title.toLowerCase().includes(q) || t.content?.toLowerCase().includes(q) || t.authorName?.toLowerCase().includes(q)
      }
      return true
    })
    .sort((a, b) => {
      // Pinned threads always first
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1

      if (sortBy === 'popular') {
        return (b.likes?.length || 0) - (a.likes?.length || 0)
      }
      if (sortBy === 'most_replies') {
        return (b.replyCount || 0) - (a.replyCount || 0)
      }
      // newest
      const aTime = a.createdAt?.toDate?.() || new Date(0)
      const bTime = b.createdAt?.toDate?.() || new Date(0)
      return bTime - aTime
    })

  // ── Create Thread ──
  async function handleCreateThread(e) {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim() || !user) return
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'forumThreads'), {
        title: newTitle.trim(),
        content: newContent.trim(),
        authorId: user.uid,
        authorName: userData?.name || 'Anonim',
        authorAvatar: userData?.avatar || null,
        authorLevel: level,
        category: newCategory,
        pinned: false,
        likes: [],
        replyCount: 0,
        createdAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
      })
      setNewTitle('')
      setNewContent('')
      setNewCategory('genel')
      setShowNewThread(false)
      fetchThreads()
    } catch (err) {
      console.error('Create thread error:', err)
    }
    setSubmitting(false)
  }

  // ── Toggle Pin (Admin) ──
  async function togglePin(threadId, currentPinned) {
    try {
      await updateDoc(doc(db, 'forumThreads', threadId), { pinned: !currentPinned })
      setThreads(prev => prev.map(t => t.id === threadId ? { ...t, pinned: !currentPinned } : t))
      if (activeThread?.id === threadId) {
        setActiveThread(prev => ({ ...prev, pinned: !currentPinned }))
      }
    } catch (err) {
      console.error('Pin toggle error:', err)
    }
  }

  // ── Like Thread ──
  async function toggleThreadLike(threadId) {
    if (!user) return
    const thread = threads.find(t => t.id === threadId)
    if (!thread) return
    const likes = thread.likes || []
    const hasLiked = likes.includes(user.uid)
    try {
      await updateDoc(doc(db, 'forumThreads', threadId), {
        likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      })
      setThreads(prev => prev.map(t => {
        if (t.id !== threadId) return t
        const newLikes = hasLiked ? t.likes.filter(l => l !== user.uid) : [...(t.likes || []), user.uid]
        return { ...t, likes: newLikes }
      }))
      if (activeThread?.id === threadId) {
        setActiveThread(prev => {
          const newLikes = hasLiked ? prev.likes.filter(l => l !== user.uid) : [...(prev.likes || []), user.uid]
          return { ...prev, likes: newLikes }
        })
      }
    } catch (err) {
      console.error('Like error:', err)
    }
  }

  // ── Like Reply ──
  async function toggleReplyLike(replyId) {
    if (!user || !activeThread) return
    const reply = replies.find(r => r.id === replyId)
    if (!reply) return
    const likes = reply.likes || []
    const hasLiked = likes.includes(user.uid)
    try {
      await updateDoc(doc(db, 'forumThreads', activeThread.id, 'replies', replyId), {
        likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      })
      setReplies(prev => prev.map(r => {
        if (r.id !== replyId) return r
        const newLikes = hasLiked ? r.likes.filter(l => l !== user.uid) : [...(r.likes || []), user.uid]
        return { ...r, likes: newLikes }
      }))
    } catch (err) {
      console.error('Reply like error:', err)
    }
  }

  // ── Submit Reply ──
  async function handleReply(e) {
    e.preventDefault()
    if (!replyContent.trim() || !user || !activeThread) return
    setReplySubmitting(true)
    try {
      await addDoc(collection(db, 'forumThreads', activeThread.id, 'replies'), {
        content: replyContent.trim(),
        authorId: user.uid,
        authorName: userData?.name || 'Anonim',
        authorAvatar: userData?.avatar || null,
        authorLevel: level,
        likes: [],
        parentReplyId: replyingTo || null,
        createdAt: serverTimestamp(),
      })
      // Update thread reply count & last activity
      await updateDoc(doc(db, 'forumThreads', activeThread.id), {
        replyCount: (activeThread.replyCount || 0) + 1,
        lastActivity: serverTimestamp(),
      })
      // Notify thread author (if not self)
      if (activeThread.authorId && activeThread.authorId !== user.uid) {
        notifyForumReply(activeThread.authorId, activeThread.title).catch(() => {})
      }
      // If replying to a specific reply, notify that reply's author too
      if (replyingTo) {
        const parentReply = replies.find(r => r.id === replyingTo)
        if (parentReply && parentReply.authorId !== user.uid && parentReply.authorId !== activeThread.authorId) {
          notifyForumReply(parentReply.authorId, activeThread.title).catch(() => {})
        }
      }
      setReplyContent('')
      setReplyingTo(null)
      setActiveThread(prev => ({ ...prev, replyCount: (prev.replyCount || 0) + 1 }))
      setThreads(prev => prev.map(t => t.id === activeThread.id ? { ...t, replyCount: (t.replyCount || 0) + 1 } : t))
      fetchReplies(activeThread.id)
    } catch (err) {
      console.error('Reply error:', err)
    }
    setReplySubmitting(false)
  }

  // ── Start reply to specific reply ──
  function startReplyTo(replyId, authorName) {
    setReplyingTo(replyId)
    setReplyContent(`@${authorName} `)
    setTimeout(() => replyInputRef.current?.focus(), 100)
  }

  // ── Back to list (mobile) ──
  function goBackToList() {
    setActiveThread(null)
    setMobileView('list')
  }

  // ────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-dark-text-heading">Tartisma Forumu</h1>
          <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">Toplulukla birlikte ogrenin, paylasin, tartisin</p>
        </div>
        <Button onClick={() => setShowNewThread(!showNewThread)} size="sm" className="hidden md:inline-flex">
          {showNewThread ? 'Iptal' : '+ Yeni Konu'}
        </Button>
      </div>

      {/* New Thread Form */}
      {showNewThread && (
        <Card className="mb-6 animate-fade-in">
          <h3 className="font-heading font-semibold text-lg mb-4 dark:text-dark-text-heading">Yeni Konu Olustur</h3>
          <form onSubmit={handleCreateThread} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Konu basligi..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-elevated text-text dark:text-dark-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                maxLength={120}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted dark:text-dark-text-muted mb-2">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setNewCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      newCategory === cat.id
                        ? 'ring-2 ring-primary/40 shadow-sm ' + cat.color
                        : 'bg-surface-alt dark:bg-dark-elevated text-text-muted dark:text-dark-text-muted hover:bg-primary/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <textarea
                placeholder="Mesajinizi yazin..."
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-elevated text-text dark:text-dark-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none transition-all"
              />
            </div>
            <div className="flex items-center gap-3 justify-end">
              <Button variant="ghost" size="sm" type="button" onClick={() => setShowNewThread(false)}>Iptal</Button>
              <Button type="submit" size="sm" loading={submitting} disabled={!newTitle.trim() || !newContent.trim()}>Konuyu Olustur</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Mobile New Thread Button */}
      <div className="md:hidden mb-4">
        <Button onClick={() => setShowNewThread(!showNewThread)} size="sm" className="w-full">
          {showNewThread ? 'Iptal' : '+ Yeni Konu Olustur'}
        </Button>
      </div>

      {/* Two-Panel Layout */}
      <div className="flex gap-6 min-h-[calc(100vh-16rem)]">

        {/* ══════ LEFT PANEL: Thread List ══════ */}
        <div className={`w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 flex flex-col ${mobileView === 'thread' ? 'hidden lg:flex' : 'flex'}`}>

          {/* Search */}
          <div className="relative mb-4">
            <Icon name="search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-dark-text-muted" />
            <input
              type="text"
              placeholder="Konu veya yazar ara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text dark:text-dark-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? cat.color + ' shadow-sm'
                    : 'bg-surface-alt dark:bg-dark-elevated text-text-muted dark:text-dark-text-muted hover:bg-primary/5 dark:hover:bg-white/5'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-text-muted dark:text-dark-text-muted">Sirala:</span>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                  sortBy === opt.id
                    ? 'bg-primary/10 text-primary font-semibold dark:bg-primary/20 dark:text-primary-light'
                    : 'text-text-muted dark:text-dark-text-muted hover:bg-surface-alt dark:hover:bg-dark-elevated'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">{'\uD83D\uDCAC'}</p>
                <p className="text-text-muted dark:text-dark-text-muted font-medium">Henuz konu yok</p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted mt-1">İlk konuyu sen oluştur!</p>
              </div>
            ) : (
              filteredThreads.map(thread => {
                const cat = getCategoryInfo(thread.category)
                const isActive = activeThread?.id === thread.id
                return (
                  <button
                    key={thread.id}
                    onClick={() => openThread(thread)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary/5 border-primary/30 shadow-sm dark:bg-primary/10 dark:border-primary/40'
                        : 'bg-white dark:bg-dark-card border-border-light dark:border-dark-border hover:border-primary/20 hover:shadow-sm dark:hover:border-primary/30'
                    }`}
                  >
                    {/* Pinned badge */}
                    {thread.pinned && (
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 2l-4 4-6 2-2 2 5 5-5 7 7-5 5 5 2-2 2-6 4-4-8-8z"/></svg>
                        Sabitlenmis
                      </div>
                    )}

                    {/* Title + Category */}
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className={`font-semibold text-sm flex-1 line-clamp-2 ${isActive ? 'text-primary dark:text-primary-light' : 'text-text dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary-light'}`}>
                        {thread.title}
                      </h3>
                      <span className={`flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-md ${cat.color}`}>
                        {cat.icon}
                      </span>
                    </div>

                    {/* Preview */}
                    <p className="text-xs text-text-light dark:text-dark-text-muted line-clamp-2 mb-3">{thread.content}</p>

                    {/* Author + Meta */}
                    <div className="flex items-center gap-2">
                      <UserAvatar name={thread.authorName} avatar={thread.authorAvatar} size="sm" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-text dark:text-dark-text truncate block">{thread.authorName}</span>
                        <span className="text-[10px] text-text-muted dark:text-dark-text-muted">{timeAgo(thread.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-text-muted dark:text-dark-text-muted">
                        <span className="flex items-center gap-1">
                          <Icon name="heart" size={12} className={thread.likes?.includes(user?.uid) ? 'text-danger fill-danger' : ''} />
                          {thread.likes?.length || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="chat" size={12} />
                          {thread.replyCount || 0}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* ══════ RIGHT PANEL: Thread Detail ══════ */}
        <div className={`flex-1 min-w-0 ${mobileView === 'list' ? 'hidden lg:block' : 'block'}`}>
          {!activeThread ? (
            <div className="hidden lg:flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="chat" size={36} className="text-primary/40 dark:text-primary-light/40" />
              </div>
              <p className="font-heading font-semibold text-text-muted dark:text-dark-text-muted">Bir konu secin</p>
              <p className="text-xs text-text-muted dark:text-dark-text-muted mt-1">Soldaki listeden bir tartisma secin</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Mobile Back Button */}
              <button
                onClick={goBackToList}
                className="lg:hidden flex items-center gap-2 text-sm text-text-muted dark:text-dark-text-muted hover:text-primary mb-4 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Tum Konular
              </button>

              {/* Thread Content Card */}
              <Card className="mb-4">
                {/* Thread Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${getCategoryInfo(activeThread.category).color}`}>
                        {getCategoryInfo(activeThread.category).icon} {getCategoryInfo(activeThread.category).label}
                      </span>
                      {activeThread.pinned && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                          Sabitlenmis
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-lg dark:text-dark-text-heading">{activeThread.title}</h2>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => togglePin(activeThread.id, activeThread.pinned)}
                      className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                        activeThread.pinned
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
                          : 'bg-surface-alt dark:bg-dark-elevated text-text-muted dark:text-dark-text-muted hover:text-amber-600'
                      }`}
                      title={activeThread.pinned ? 'Sabitlemeyi Kaldir' : 'Sabitle'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={activeThread.pinned ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M16 2l-4 4-6 2-2 2 5 5-5 7 7-5 5 5 2-2 2-6 4-4-8-8z"/></svg>
                    </button>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-light dark:border-dark-border">
                  <UserAvatar name={activeThread.authorName} avatar={activeThread.authorAvatar} level={activeThread.authorLevel} />
                  <div>
                    <p className="text-sm font-semibold dark:text-dark-text">{activeThread.authorName}</p>
                    <p className="text-xs text-text-muted dark:text-dark-text-muted">
                      {activeThread.authorLevel ? LEVEL_NAMES[activeThread.authorLevel] + ' \u00b7 ' : ''}
                      {timeAgo(activeThread.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Thread Body */}
                <div className="text-sm text-text dark:text-dark-text leading-relaxed whitespace-pre-wrap mb-4">
                  {activeThread.content}
                </div>

                {/* Thread Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-border-light dark:border-dark-border">
                  <button
                    onClick={() => toggleThreadLike(activeThread.id)}
                    className={`flex items-center gap-1.5 text-sm transition-all ${
                      activeThread.likes?.includes(user?.uid)
                        ? 'text-danger font-semibold'
                        : 'text-text-muted dark:text-dark-text-muted hover:text-danger'
                    }`}
                  >
                    <Icon name="heart" size={16} className={activeThread.likes?.includes(user?.uid) ? 'fill-danger' : ''} />
                    <span>{activeThread.likes?.length || 0}</span>
                    <span className="hidden sm:inline">{activeThread.likes?.includes(user?.uid) ? 'Begenildi' : 'Begen'}</span>
                  </button>
                  <button
                    onClick={() => { setReplyingTo(null); replyInputRef.current?.focus() }}
                    className="flex items-center gap-1.5 text-sm text-text-muted dark:text-dark-text-muted hover:text-primary transition-colors"
                  >
                    <Icon name="chat" size={16} />
                    <span>Yanit Yaz</span>
                  </button>
                  <span className="text-xs text-text-muted dark:text-dark-text-muted ml-auto">
                    {activeThread.replyCount || 0} yanit
                  </span>
                </div>
              </Card>

              {/* Replies Section */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                <h4 className="text-sm font-semibold text-text-muted dark:text-dark-text-muted mb-2">
                  Yanitlar ({activeThread.replyCount || 0})
                </h4>

                {repliesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : replies.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-text-muted dark:text-dark-text-muted text-sm">Henuz yanit yok. İlk yanıtı sen ver!</p>
                  </div>
                ) : (
                  (() => {
                    // Separate root replies and nested replies
                    const rootReplies = replies.filter(r => !r.parentReplyId)
                    const nestedReplies = replies.filter(r => r.parentReplyId)

                    return rootReplies.map(reply => {
                      const children = nestedReplies.filter(r => r.parentReplyId === reply.id)
                      return (
                        <div key={reply.id}>
                          {/* Root Reply */}
                          <ReplyCard
                            reply={reply}
                            userId={user?.uid}
                            onLike={() => toggleReplyLike(reply.id)}
                            onReply={() => startReplyTo(reply.id, reply.authorName)}
                          />
                          {/* Nested Replies */}
                          {children.map(child => (
                            <div key={child.id} className="ml-8 mt-2">
                              <ReplyCard
                                reply={child}
                                userId={user?.uid}
                                onLike={() => toggleReplyLike(child.id)}
                                onReply={() => startReplyTo(reply.id, child.authorName)}
                                isNested
                              />
                            </div>
                          ))}
                        </div>
                      )
                    })
                  })()
                )}
              </div>

              {/* Reply Input */}
              <div className="sticky bottom-0 bg-white dark:bg-dark-surface pt-3 border-t border-border-light dark:border-dark-border">
                {replyingTo && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-text-muted dark:text-dark-text-muted">
                    <span>Yanit veriliyor:</span>
                    <span className="font-medium text-primary dark:text-primary-light">
                      {replies.find(r => r.id === replyingTo)?.authorName || 'Mesaj'}
                    </span>
                    <button onClick={() => { setReplyingTo(null); setReplyContent('') }} className="ml-auto text-text-muted hover:text-danger">
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                )}
                <form onSubmit={handleReply} className="flex gap-2">
                  <input
                    ref={replyInputRef}
                    type="text"
                    placeholder="Yanitinizi yazin..."
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-elevated text-text dark:text-dark-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                  />
                  <Button type="submit" size="sm" loading={replySubmitting} disabled={!replyContent.trim()}>
                    Gonder
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Reply Card Component ──
function ReplyCard({ reply, userId, onLike, onReply, isNested = false }) {
  const hasLiked = reply.likes?.includes(userId)

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      isNested
        ? 'bg-surface-alt/50 dark:bg-dark-elevated/50 border-border-light/50 dark:border-dark-border/50'
        : 'bg-white dark:bg-dark-card border-border-light dark:border-dark-border'
    }`}>
      {/* Author */}
      <div className="flex items-center gap-2.5 mb-3">
        <UserAvatar name={reply.authorName} avatar={reply.authorAvatar} level={reply.authorLevel} size="sm" />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold dark:text-dark-text block truncate">{reply.authorName}</span>
          <span className="text-[10px] text-text-muted dark:text-dark-text-muted">
            {reply.authorLevel ? LEVEL_NAMES[reply.authorLevel] + ' \u00b7 ' : ''}
            {timeAgo(reply.createdAt)}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-text dark:text-dark-text leading-relaxed whitespace-pre-wrap mb-3">{reply.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={onLike}
          className={`flex items-center gap-1 text-xs transition-all ${
            hasLiked
              ? 'text-danger font-semibold'
              : 'text-text-muted dark:text-dark-text-muted hover:text-danger'
          }`}
        >
          <Icon name="heart" size={13} className={hasLiked ? 'fill-danger' : ''} />
          <span>{reply.likes?.length || 0}</span>
        </button>
        <button
          onClick={onReply}
          className="flex items-center gap-1 text-xs text-text-muted dark:text-dark-text-muted hover:text-primary transition-colors"
        >
          <Icon name="chat" size={13} />
          <span>Yanitla</span>
        </button>
      </div>
    </div>
  )
}
