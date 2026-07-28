<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useTimedFlashMessages } from '@/composables/useTimedFlashMessages'
import {
  appName,
  appSubtitle,
  isDemoMode,
} from '@/config/app'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { showErrorMessage } = useTimedFlashMessages()
const router = useRouter()

const handleGuestSignIn = async () => {
  try {
    await authStore.signInAsGuest()
    await router.push('/stock/overview')
  } catch (error) {
    console.error('Guest sign-in failed:', error)
    showErrorMessage('Failed to start the demo application. Please try again.')
  }
}

const handleGoogleSignIn = async () => {
  try {
    await authStore.signInWithGoogle()
    await router.push('/stock/overview')
  } catch (error: unknown) {
    console.error('Sign-in failed:', error)

    const message =
      error instanceof Error ? error.message : ''

    if (message === 'Unauthorized email address.') {
      showErrorMessage(
        'Your email address is not authorized to access this system.',
      )
    } else {
      showErrorMessage(
        'Failed to sign in with Google. Please try again.',
      )
    }
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-indigo-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-4">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        class="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-3xl" />
      <div
        class="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-violet-200/30 dark:bg-violet-900/20 blur-3xl" />
    </div>
    <div
      class="relative z-10 w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white/80 px-8 py-12 shadow-xl shadow-zinc-200/40 backdrop-blur-lg dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:shadow-zinc-950/40 sm:px-12 sm:py-16">
      <!-- Brand heading -->
      <div class="mb-10 text-center">
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {{ appName }}
        </h1>
        <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {{ appSubtitle }}
        </p>
      </div>
      <!-- Guest Sign-In button -->
      <button v-if="isDemoMode" type="button" :disabled="authStore.loading"
        class="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-60"
        @click="handleGuestSignIn">
        {{
          authStore.loading
            ? 'Opening demo…'
            : 'Continue as Guest'
        }}
      </button>
      <!-- Google Sign-In button -->
      <button v-else id="google-sign-in-btn" type="button" :disabled="authStore.loading"
        class="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-750"
        @click="handleGoogleSignIn">
        <!-- Spinner (while loading) -->
        <svg v-if="authStore.loading" class="h-5 w-5 animate-spin text-zinc-400" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <!-- Google "G" icon -->
        <svg v-else class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4" />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853" />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05" />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335" />
        </svg>
        <span>{{ authStore.loading ? 'Signing in…' : 'Sign in with Google' }}</span>
      </button>
      <!-- Footer note -->
      <p class="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
        {{
          isDemoMode
            ? 'Public demo • Sample data only'
            : 'Authorized personnel only'
        }}
      </p>
    </div>
  </div>
</template>
