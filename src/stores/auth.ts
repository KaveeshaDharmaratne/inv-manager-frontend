import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth } from '@/firebase'
import { isDemoMode } from '@/config/app'

const isUserAuthorized = (firebaseUser: User): boolean => {
  // Anonymous accounts are allowed only in the demo deployment.
  if (firebaseUser.isAnonymous) {
    return isDemoMode
  }
  const authorizedEnv = import.meta.env.VITE_AUTHORIZED_EMAILS
  // Without an allow-list, permit authenticated non-anonymous users.
  if (!authorizedEnv) {
    return true
  }
  if (!firebaseUser.email) {
    return false
  }
  const allowedEmails = authorizedEnv
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean)
  return allowedEmails.includes(firebaseUser.email.toLowerCase())
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const isGuest = computed(() => user.value?.isAnonymous === true)
  const authReady = new Promise<void>((resolve) => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !isUserAuthorized(firebaseUser)) {
        await firebaseSignOut(auth)
        user.value = null
      } else {
        user.value = firebaseUser
      }

      loading.value = false
      resolve()
    })
  })
  async function signInWithGoogle(): Promise<void> {
    if (isDemoMode) {
      throw new Error('Google sign-in is unavailable in demo mode.')
    }
    loading.value = true
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      if (result.user && !isUserAuthorized(result.user)) {
        await firebaseSignOut(auth)
        throw new Error('Unauthorized email address.')
      }
    } finally {
      loading.value = false
    }
  }
  async function signInAsGuest(): Promise<void> {
    if (!isDemoMode) {
      throw new Error('Guest login is unavailable.')
    }
    loading.value = true
    try {
      await signInAnonymously(auth)
    } finally {
      loading.value = false
    }
  }
  async function signOut(): Promise<void> {
    loading.value = true
    try {
      await firebaseSignOut(auth)
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    authReady,
    isGuest,
    signInWithGoogle,
    signInAsGuest,
    signOut,
  }
})
