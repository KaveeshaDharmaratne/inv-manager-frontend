import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { ReturnFormState, ReturnItem } from '@/types/returns'
import { useStockStore } from './stockStore'

export const useReturnStore = defineStore('returns', () => {
  const stockStore = useStockStore()
  const form = reactive<ReturnFormState>({
    date: new Date().toISOString().split('T')[0] ?? '',
    type: 'Good',
    dealer: '',
    returnNoteNo: '',
    items: [],
  })

  const isSubmitting = ref(false)

  function addItem() {
    const newItem: ReturnItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      code: '',
      description: '',
      qty: null,
    }
    form.items.push(newItem)
  }

  function removeItem(id: string) {
    const index = form.items.findIndex((item) => item.id === id)
    if (index !== -1) {
      form.items.splice(index, 1)
    }
  }

  async function submitReturn() {
    isSubmitting.value = true
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Submitting:', form)

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

    isSubmitting.value = false
  }

  // Initialize with one empty row
  if (form.items.length === 0) {
    addItem()
  }

  return { form, isSubmitting, addItem, removeItem, submitReturn }
})
