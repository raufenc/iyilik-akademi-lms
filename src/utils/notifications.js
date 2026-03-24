import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Add a notification for a user
 * @param {string} userId
 * @param {{ type: string, title: string, message: string, icon: string, link?: string }} data
 */
export async function addNotification(userId, { type, title, message, icon, link = '' }) {
  if (!userId) return
  const ref = collection(db, 'notifications', userId, 'items')
  await addDoc(ref, {
    type,
    title,
    message,
    icon,
    link,
    read: false,
    createdAt: serverTimestamp(),
  })
}

/**
 * Mark a single notification as read
 */
export async function markAsRead(userId, notifId) {
  if (!userId || !notifId) return
  const ref = doc(db, 'notifications', userId, 'items', notifId)
  await updateDoc(ref, { read: true })
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllAsRead(userId) {
  if (!userId) return
  const ref = collection(db, 'notifications', userId, 'items')
  const q = query(ref, where('read', '==', false))
  const snap = await getDocs(q)
  if (snap.empty) return

  const batch = writeBatch(db)
  snap.forEach((d) => {
    batch.update(d.ref, { read: true })
  })
  await batch.commit()
}

/**
 * Get unread count for a user
 */
export async function getUnreadCount(userId) {
  if (!userId) return 0
  const ref = collection(db, 'notifications', userId, 'items')
  const q = query(ref, where('read', '==', false))
  const snap = await getDocs(q)
  return snap.size
}

/**
 * Fetch recent notifications (max 30)
 */
export async function fetchNotifications(userId) {
  if (!userId) return []
  const ref = collection(db, 'notifications', userId, 'items')
  const q = query(ref, orderBy('createdAt', 'desc'), limit(30))
  const snap = await getDocs(q)
  const list = []
  snap.forEach((d) => list.push({ id: d.id, ...d.data() }))
  return list
}

// ---- Notification generators ----

export function notifyBadge(userId, badgeName) {
  return addNotification(userId, {
    type: 'badge',
    title: 'Yeni Rozet!',
    message: `Yeni rozet kazandin: ${badgeName}!`,
    icon: '\uD83C\uDF89',
    link: '/profil',
  })
}

export function notifyStreak(userId, streakCount) {
  return addNotification(userId, {
    type: 'streak',
    title: 'Seri Devam Ediyor!',
    message: `${streakCount} gunluk serin devam ediyor!`,
    icon: '\uD83D\uDD25',
    link: '/panel',
  })
}

export function notifyStreakWarning(userId) {
  return addNotification(userId, {
    type: 'streak_warning',
    title: 'Seri Uyarisi',
    message: 'Serini kaybetmemek icin bugun bir ders yap!',
    icon: '\u26A0\uFE0F',
    link: '/gunluk-quiz',
  })
}

export function notifyNewLesson(userId, lessonName) {
  return addNotification(userId, {
    type: 'new_lesson',
    title: 'Yeni Ders',
    message: `Yeni ders eklendi: ${lessonName}`,
    icon: '\uD83D\uDCDA',
    link: '/dersler',
  })
}

export function notifyForumReply(userId, threadTitle) {
  return addNotification(userId, {
    type: 'forum_reply',
    title: 'Yeni Yanit',
    message: `Mesajina yanit geldi: "${threadTitle}"`,
    icon: '\uD83D\uDCAC',
    link: '/forum',
  })
}

export function notifyRankUp(userId, rank) {
  return addNotification(userId, {
    type: 'rank_up',
    title: 'Siralama Yukseldi!',
    message: `Sıralamada ${rank}. sıraya yükseldin!`,
    icon: '\uD83C\uDFC6',
    link: '/siralama',
  })
}
