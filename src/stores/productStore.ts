import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/invoice'
import apiClient from '@/api/axios'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  async function fetchProductByCode(code: string): Promise<Product | undefined> {
    // Check local cache first
    const cached = products.value.find((p) => p.code === code)
    if (cached) return cached

    try {
      const { data } = await apiClient.get(`/api/v1/items/${encodeURIComponent(code)}`)
      if (data?.code) {
        const product: Product = { code: data.code, description: data.description ?? '' }
        // Cache locally
        products.value.push(product)
        return product
      }
    } catch {
      // Item not found or network error
    }
    return undefined
  }

  const getProductByCode = (code: string): Product | undefined => {
    return products.value.find((p) => p.code === code)
  }

  return {
    products,
    getProductByCode,
    fetchProductByCode,
  }
})
