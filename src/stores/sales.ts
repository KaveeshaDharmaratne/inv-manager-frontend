import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import type { InvoiceDetails, InvoiceItem } from '@/types/invoice'
import { createInvoice } from '@/api/invoices'
import { useProductStore } from './productStore'
import { useStockStore } from './stockStore'

export const useSaleStore = defineStore('sales', () => {
  const productStore = useProductStore()
  const stockStore = useStockStore()

  const form = reactive<InvoiceDetails>({
    date: new Date().toISOString().split('T')[0] ?? '',
    dealer: '',
    invoiceNumber: '',
    items: [],
  })

  const isSubmitting = ref(false)
  const successMessage = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

  const newItem = reactive({
    code: '',
    description: '',
    quantity: 1,
  })

  // Watcher for auto-description
  watch(
    () => newItem.code,
    async (newCode) => {
      if (!newCode || newCode.length < 5) {
        newItem.description = ''
        return
      }
      const product = await productStore.fetchProductByCode(newCode)
      // Only update if code hasn't changed during the fetch
      if (newItem.code === newCode) {
        newItem.description = product?.description ?? ''
      }
    },
  )

  function addItem() {
    if (!newItem.code || newItem.quantity <= 0) return false

    const item: InvoiceItem = {
      id: crypto.randomUUID(),
      code: newItem.code,
      description: newItem.description || 'Unknown Item',
      quantity: newItem.quantity,
    }

    form.items.push(item)

    // Reset new item inputs
    newItem.code = ''
    newItem.description = ''
    newItem.quantity = 1

    return true
  }

  function removeItem(index: number) {
    form.items.splice(index, 1)
  }

  async function submitSale() {
    if (form.items.length === 0) return
    if (isSubmitting.value) return

    isSubmitting.value = true
    successMessage.value = null
    errorMessage.value = null

    try {
      await createInvoice(form)

      stockStore.addTransaction({
        id: crypto.randomUUID(),
        date: form.date,
        type: 'Invoice',
        transactionId: form.invoiceNumber,
        dealer: form.dealer,
      })

      successMessage.value = 'Invoice submitted successfully!'

      form.dealer = ''
      form.invoiceNumber = ''
      form.items = []
    } catch (error: any) {
      console.error('Failed to submit invoice:', error)
      errorMessage.value =
        error.response?.data?.message || error.message || 'Failed to submit invoice.'
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
    submitSale,
  }
})
