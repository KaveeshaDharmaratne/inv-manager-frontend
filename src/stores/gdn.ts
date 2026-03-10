import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { createGdn } from '@/api/gdn'
import { useTimedFlashMessages } from '@/composables/useTimedFlashMessages'
import type { GdnFormState, GdnItem } from '@/types/gdn'
import { useProductStore } from './productStore'
import { useStockStore } from './stockStore'

export const useGdnStore = defineStore('gdn', () => {
  const productStore = useProductStore()
  const stockStore = useStockStore()

  const form = reactive<GdnFormState>({
    date: new Date().toISOString().split('T')[0] ?? '',
    gdnNumber: '',
    items: [],
  })

  const isSubmitting = ref(false)
  const { successMessage, errorMessage, showSuccessMessage, showErrorMessage, clearMessages } =
    useTimedFlashMessages()

  const newItem = reactive({
    code: '',
    description: '',
    quantity: 1,
  })

  watch(
    () => newItem.code,
    async (newCode) => {
      if (!newCode || newCode.length < 5) {
        newItem.description = ''
        return
      }

      const product = await productStore.fetchProductByCode(newCode)
      if (newItem.code === newCode) {
        newItem.description = product?.description ?? ''
      }
    },
  )

  function addItem() {
    if (!newItem.code || newItem.quantity <= 0) {
      return false
    }

    const item: GdnItem = {
      id: crypto.randomUUID(),
      code: newItem.code,
      description: newItem.description || 'Unknown Item',
      quantity: newItem.quantity,
    }

    form.items.push(item)
    newItem.code = ''
    newItem.description = ''
    newItem.quantity = 1

    return true
  }

  function removeItem(index: number) {
    form.items.splice(index, 1)
  }

  async function submitGdn() {
    if (form.items.length === 0 || isSubmitting.value) {
      return
    }

    isSubmitting.value = true
    clearMessages()

    try {
      await createGdn(form)

      stockStore.addTransaction({
        id: crypto.randomUUID(),
        date: form.date,
        type: 'GDN',
        transactionId: form.gdnNumber,
        dealer: '',
      })

      showSuccessMessage('GDN submitted successfully!')

      form.gdnNumber = ''
      form.items = []
    } catch (error: any) {
      console.error('Failed to submit GDN:', error)
      showErrorMessage(error.response?.data?.message || error.message || 'Failed to submit GDN.')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    newItem,
    isSubmitting,
    successMessage,
    errorMessage,
    addItem,
    removeItem,
    submitGdn,
  }
})
