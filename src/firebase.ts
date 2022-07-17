import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "splash-d0669.firebaseapp.com",
  projectId: "splash-d0669",
  storageBucket: "splash-d0669.appspot.com",
  messagingSenderId: "783278076291",
  appId: "1:783278076291:web:474de18b0a8552359346b6"
})

export const auth = getAuth()
export const db = getFirestore(firebaseConfig)