import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/invoice'
import apiClient from '@/api/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  async function fetchProductByCode(code: string): Promise<Product | undefined> {
    // Always fetch from API to get the latest availableQty
    try {
      const { data } = await apiClient.get(`/api/v1/items/${encodeURIComponent(code)}`)
      if (data?.code) {
        const product: Product = {
          code: data.code,
          description: data.description ?? '',
          availableQty: data.quantity ?? 0,
        }
        // Update cache in-place or add new entry
        const existingIndex = products.value.findIndex((p) => p.code === code)
        if (existingIndex >= 0) {
          products.value[existingIndex] = product
        } else {
          products.value.push(product)
        }
        return product
      }
    } catch {
      // Item not found or network error
    }
    return undefined
  }

  function invalidateCache() {
    products.value = []
  }

  const getProductByCode = (code: string): Product | undefined => {
    return products.value.find((p) => p.code === code)
  }

  return {
    products,
    getProductByCode,
    fetchProductByCode,
    invalidateCache,
  }
})
