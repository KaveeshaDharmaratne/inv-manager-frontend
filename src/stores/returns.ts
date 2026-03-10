import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import type { ReturnFormState, ReturnItem } from '@/types/returns'
import { createReturn } from '@/api/returns'
import { useProductStore } from './productStore'
import { useStockStore } from './stockStore'

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
  const successMessage = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

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

  function addItem() {
    if (!newItem.code || newItem.qty <= 0) return false

    const item: ReturnItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      code: newItem.code,
      description: newItem.description || 'Unknown Item',
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
    addItem()
    successMessage.value = null
    errorMessage.value = null
  }

  async function submitReturn() {
    isSubmitting.value = true
    successMessage.value = null
    errorMessage.value = null

    try {
      await createReturn(form)

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

      successMessage.value = 'Return submitted successfully!'

      form.dealer = ''
      form.returnNoteNo = ''
      form.items = []

    } catch (error: any) {
      console.error('Failed to submit return:', error)
      errorMessage.value = error.response?.data?.message || error.message || 'Failed to submit return.'
    } finally {
      isSubmitting.value = false
    }
  }

  return { form, newItem, isSubmitting, successMessage, errorMessage, addItem, removeItem, submitReturn, resetForm }
})
