import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import type { ReturnFormState, ReturnItem } from '@/types/returns'
import { createReturn } from '@/api/returns'
import { useProductStore } from './productStore'
import { useStockStore } from './stockStore'
import { useTimedFlashMessages } from '@/composables/useTimedFlashMessages'

export const useReturnStore = defineStore('returns', () => {
  const productStore = useProductStore()
  const stockStore = useStockStore()
  const form = reactive<ReturnFormState>({
    date: new Date().toISOString().split('T')[0] ?? '',
    type: 'Good',
    dealer: '',
    returnNoteNo: '',
    items: [],
  })

  const isSubmitting = ref(false)
  const { successMessage, errorMessage, showSuccessMessage, showErrorMessage, clearMessages } =
    useTimedFlashMessages()

  const newItem = reactive({
    code: '',
    description: '',
    qty: 1,
  })

  // Watcher for auto-description (same as SaleForm)
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

  async function addItem() {
    if (!newItem.code || newItem.qty <= 0) return false

    clearMessages()

    const product = await productStore.fetchProductByCode(newItem.code)
    if (!product) {
      showErrorMessage(
        `Item code ${newItem.code} does not exist. Create it in the item master first.`,
      )
      return false
    }

    const item: ReturnItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      code: newItem.code,
      description: product.description,
      qty: newItem.qty,
    }
    form.items.push(item)

    newItem.code = ''
    newItem.description = ''
    newItem.qty = 1

    return true
  }

  function removeItem(index: number) {
    form.items.splice(index, 1)
  }

  function resetForm() {
    form.date = new Date().toISOString().split('T')[0] ?? ''
    form.type = 'Good'
    form.dealer = ''
    form.returnNoteNo = ''
    form.items = []
    clearMessages()
  }

  async function submitReturn() {
    isSubmitting.value = true
    clearMessages()

    try {
      await createReturn(form)

      // Invalidate product cache to refresh the stock quantities
      productStore.invalidateCache()

      let transactionType = 'Return Stock'
      if (form.type === 'Damage') transactionType = 'Damage Stock'
      else if (form.type === 'Expired') transactionType = 'Expired Stock'

      stockStore.addTransaction({
        id: crypto.randomUUID(),
        date: form.date,
        type: transactionType,
        transactionId: form.returnNoteNo,
        dealer: form.dealer,
      })

      showSuccessMessage('Return submitted successfully!')

      form.dealer = ''
      form.returnNoteNo = ''
      form.items = []
    } catch (error: any) {
      console.error('Failed to submit return:', error)
      showErrorMessage(error.response?.data?.message || error.message || 'Failed to submit return.')
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
    submitReturn,
    resetForm,
  }
})
