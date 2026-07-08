import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth } from '@/firebase'

const isEmailAuthorized = (email: string | null): boolean => {
  const authorizedEnv = import.meta.env.VITE_AUTHORIZED_EMAILS
  if (!authorizedEnv) {
    // If env variable is not set, allow all by default
    return true
  }
  if (!email) return false
  const allowedEmails = authorizedEnv.split(',').map((e: string) => e.trim().toLowerCase())
  return allowedEmails.includes(email.toLowerCase())
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  // Resolves once the first auth state check completes
  const authReady = new Promise<void>((resolve) => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !isEmailAuthorized(firebaseUser.email)) {
        await firebaseSignOut(auth)
        user.value = null
      } else {
        user.value = firebaseUser
      }
      loading.value = false
      resolve()
    })
  })

  async function signInWithGoogle() {
    loading.value = true
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      if (result.user && !isEmailAuthorized(result.user.email)) {
        await firebaseSignOut(auth)
        throw new Error('Unauthorized email address.')
      }
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    loading.value = true
    try {
      await firebaseSignOut(auth)
    } finally {
      loading.value = false
    }
  }

  return { user, loading, authReady, signInWithGoogle, signOut }
})
