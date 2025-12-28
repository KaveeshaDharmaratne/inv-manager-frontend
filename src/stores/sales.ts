import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import type { InvoiceDetails, InvoiceItem } from '@/types/invoice'
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

  const newItem = reactive({
    code: '',
    description: '',
    quantity: 1,
  })

  // Watcher for auto-description
  watch(
    () => newItem.code,
    (newCode) => {
      const product = productStore.getProductByCode(newCode)
      newItem.description = product?.description ?? ''
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
    console.log('Submitting Invoice:', form)

    stockStore.addTransaction({
      id: crypto.randomUUID(),
      date: form.date,
      type: 'Invoice',
      transactionId: form.invoiceNumber,
      dealer: form.dealer,
    })

    // API call logic here
  }

  return {
    form,
    newItem,
    addItem,
    removeItem,
    submitSale,
  }
})
