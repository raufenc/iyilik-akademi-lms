import { createContext, useContext, useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (snap.exists()) {
          setUserData({ uid: firebaseUser.uid, ...snap.data() })
        } else {
          const newUser = {
            name: firebaseUser.displayName || 'Öğrenci',
            email: firebaseUser.email,
            role: 'student',
            xp: 0,
            level: 1,
            badges: [],
            createdAt: serverTimestamp(),
            lastActive: serverTimestamp(),
          }
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser)
          setUserData({ uid: firebaseUser.uid, ...newUser })
        }
      } else {
        setUserData(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function register(email, password, name) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    const newUser = {
      name,
      email,
      role: 'student',
      xp: 0,
      level: 1,
      badges: [],
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
    }
    await setDoc(doc(db, 'users', cred.user.uid), newUser)
    setUserData({ uid: cred.user.uid, ...newUser })
    return cred.user
  }

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  async function logout() {
    await signOut(auth)
    setUserData(null)
  }

  const value = {
    user,
    userData,
    setUserData,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    isAdmin: userData?.role === 'admin',
    isTeacher: userData?.role === 'teacher' || userData?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
