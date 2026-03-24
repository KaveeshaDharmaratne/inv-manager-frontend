import { ref } from 'vue'

const MESSAGE_TIMEOUT_MS = 5000
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

let successTimer: ReturnType<typeof setTimeout> | null = null
let errorTimer: ReturnType<typeof setTimeout> | null = null

const clearTimer = (timer: ReturnType<typeof setTimeout> | null) => {
  if (timer !== null) {
    clearTimeout(timer)
  }
}

const clearSuccessMessage = () => {
  clearTimer(successTimer)
  successTimer = null
  successMessage.value = null
}

const clearErrorMessage = () => {
  clearTimer(errorTimer)
  errorTimer = null
  errorMessage.value = null
}

export function useTimedFlashMessages(timeoutMs = MESSAGE_TIMEOUT_MS) {
  const showSuccessMessage = (message: string) => {
    clearSuccessMessage()
    clearErrorMessage()
    successMessage.value = message
    successTimer = setTimeout(() => {
      successMessage.value = null
      successTimer = null
    }, timeoutMs)
  }

  const showErrorMessage = (message: string) => {
    clearErrorMessage()
    clearSuccessMessage()
    errorMessage.value = message
    errorTimer = setTimeout(() => {
      errorMessage.value = null
      errorTimer = null
    }, timeoutMs)
  }

  const clearMessages = () => {
    clearSuccessMessage()
    clearErrorMessage()
  }

  return {
    successMessage,
    errorMessage,
    showSuccessMessage,
    showErrorMessage,
    clearMessages,
  }
}
