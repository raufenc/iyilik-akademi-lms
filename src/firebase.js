import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC-lthOYC1GF-TT2IvtVY-eW1pEnkzSUOA',
  authDomain: 'iyilik-akademi.firebaseapp.com',
  projectId: 'iyilik-akademi',
  storageBucket: 'iyilik-akademi.firebasestorage.app',
  messagingSenderId: '716566407149',
  appId: '1:716566407149:web:154a871cbe61c76061a9e4',
  measurementId: 'G-GCXS5700TP',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
