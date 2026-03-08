import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'
import type { ReturnFormState, ReturnItem } from '@/types/returns'
import { useStockStore } from './stockStore'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

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
  const successMessage = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

  function addItem() {
    const newItem: ReturnItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
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
      // Validate items
      const validItems = form.items.filter((item) => item.code && item.qty !== null)

      if (validItems.length === 0) {
        throw new Error('Please add at least one valid item with a code and quantity.')
      }

      await apiClient.post('/api/v1/returns', {
        ...form,
        items: validItems.map((item) => ({
          code: item.code,
          description: item.description,
          qty: Number(item.qty),
        })),
      })

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

      // Delay reset slightly to let user see success message, or keep it until they leave
      // For now, we'll strip the items but keep the message
      form.dealer = ''
      form.returnNoteNo = ''
      form.items = []
      addItem()

    } catch (error: any) {
      console.error('Failed to submit return:', error)
      errorMessage.value = error.response?.data?.message || error.message || 'Failed to submit return.'
    } finally {
      isSubmitting.value = false
    }
  }

  // Initialize with one empty row
  if (form.items.length === 0) {
    addItem()
  }

  return { form, isSubmitting, successMessage, errorMessage, addItem, removeItem, submitReturn, resetForm }
})
