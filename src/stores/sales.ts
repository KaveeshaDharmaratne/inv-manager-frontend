import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import type { InvoiceDetails, InvoiceItem } from '@/types/invoice'
import { createInvoice } from '@/api/invoices'
import { useProductStore } from './productStore'
import { useStockStore } from './stockStore'
import { useTimedFlashMessages } from '@/composables/useTimedFlashMessages'

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
  const { successMessage, errorMessage, showSuccessMessage, showErrorMessage, clearMessages } =
    useTimedFlashMessages()

  const newItem = reactive({
    code: '',
    description: '',
    quantity: 1,
    availableQty: 0,
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
        newItem.availableQty = product?.availableQty ?? 0
      }
    },
  )

  async function addItem() {
    if (!newItem.code) return false

    // Normalize and validate quantity
    const qty = Number(newItem.quantity)
    if (!Number.isFinite(qty) || qty <= 0 || !Number.isInteger(qty)) {
      showErrorMessage('Please enter a valid quantity.')
      return false
    }

    clearMessages()

    const product = await productStore.fetchProductByCode(newItem.code)
    if (!product) {
      showErrorMessage(
        `Item code ${newItem.code} does not exist. Create it in the item master first.`,
      )
      return false
    }

    // Check availability
    if ((product.availableQty ?? 0) < qty) {
      showErrorMessage(
        `Insufficient stock for ${newItem.description}. Available: ${product.availableQty ?? 0}`,
      )
      return false
    }

    const item: InvoiceItem = {
      id: crypto.randomUUID(),
      code: newItem.code,
      description: product.description,
      quantity: qty,
    }

    form.items.push(item)

    // Reset new item inputs
    newItem.code = ''
    newItem.description = ''
    newItem.availableQty = 0
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
    clearMessages()

    try {
      await createInvoice(form)

      stockStore.addTransaction({
        id: crypto.randomUUID(),
        date: form.date,
        type: 'Invoice',
        transactionId: form.invoiceNumber,
        dealer: form.dealer,
      })

      showSuccessMessage('Invoice submitted successfully!')

      form.dealer = ''
      form.invoiceNumber = ''
      form.items = []
    } catch (error: any) {
      console.error('Failed to submit invoice:', error)
      showErrorMessage(
        error.response?.data?.message || error.message || 'Failed to submit invoice.',
      )
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
