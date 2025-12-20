import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/invoice'

export const useProductStore = defineStore('product', () => {
  // In a real app, this would be fetched from an API
  const products = ref<Product[]>([
    { code: 'A001', description: 'Wireless Mouse' },
    { code: 'A002', description: 'Mechanical Keyboard' },
    { code: 'B105', description: 'HDMI Cable 2m' },
    { code: 'C999', description: 'USB-C Hub' },
  ])

  const getProductByCode = (code: string): Product | undefined => {
    return products.value.find((p) => p.code === code)
  }

  return {
    products,
    getProductByCode,
  }
})
