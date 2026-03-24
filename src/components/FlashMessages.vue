<script setup lang="ts">
import { computed } from 'vue'
import { useTimedFlashMessages } from '@/composables/useTimedFlashMessages'

const { successMessage, errorMessage } = useTimedFlashMessages()

const hasMessage = computed(() => !!successMessage.value || !!errorMessage.value)
</script>

<template>
  <div v-if="hasMessage" class="fixed inset-x-0 top-4 flex justify-center z-50 pointer-events-none">
    <div class="w-full max-w-3xl px-4">
      <transition name="flash" mode="out-in">
        <div v-if="successMessage" key="success" class="pointer-events-auto mb-2 p-4 rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700">
          <div class="flex items-start gap-3">
            <svg class="h-5 w-5 text-green-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm font-medium text-green-800 dark:text-green-300">{{ successMessage }}</p>
          </div>
        </div>

        <div v-else-if="errorMessage" key="error" class="pointer-events-auto mb-2 p-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700">
          <div class="flex items-start gap-3">
            <svg class="h-5 w-5 text-red-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <div>
              <h3 class="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
              <p class="mt-1 text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.flash-enter-from {
  transform: translateY(-8px);
  opacity: 0;
}
.flash-enter-active {
  transition: all 180ms ease-out;
}
.flash-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}
.flash-leave-active {
  transition: all 120ms ease-in;
}
</style>
