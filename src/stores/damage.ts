import type { DamageItem } from '@/types/damage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDamageStore = defineStore('damage', () => {
  const items = ref<DamageItem[]>([])
  const searchQuery = ref('')
  const isLoading = ref(false)

  // Mock data loader
  async function fetchItems() {
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 500))
    items.value = [
      {
        id: '1',
        date: '2023-10-27',
        type: 'Damage',
        dealer: 'TechSupplies Co.',
        returnNoteNo: 'RN-2023-089',
        code: 'HDD-2TB-WD',
        description: 'WD Blue 2TB HDD - Physical Damage',
        qty: 2,
      },
      {
        id: '2',
        date: '2023-10-26',
        type: 'Damage',
        dealer: 'Alpha Electro',
        returnNoteNo: 'RN-2023-085',
        code: 'MON-24-DELL',
        description: 'Dell 24" Monitor - Screen Cracked',
        qty: 1,
      },
      {
        id: '3',
        date: '2023-10-25',
        type: 'Damage',
        dealer: 'Global Gadgets',
        returnNoteNo: 'RN-2023-082',
        code: 'KB-LOGI-MX',
        description: 'Logitech MX Keys - Key Stuck',
        qty: 5,
      },
      {
        id: '4',
        date: '2023-10-24',
        type: 'Damage',
        dealer: 'TechSupplies Co.',
        returnNoteNo: 'RN-2023-078',
        code: 'SSD-SAM-1TB',
        description: 'Samsung SSD 1TB - Dead on Arrival',
        qty: 3,
      },
      {
        id: '5',
        date: '2023-10-22',
        type: 'Damage',
        dealer: 'Future Systems',
        returnNoteNo: 'RN-2023-071',
        code: 'RAM-DDR4-16',
        description: 'Corsair DDR4 16GB - Water Damage',
        qty: 12,
      },
    ]
    isLoading.value = false
  }

  const filteredItems = computed(() => {
    if (!searchQuery.value) return items.value
    const lowerQuery = searchQuery.value.toLowerCase()
    return items.value.filter(
      (item) =>
        item.returnNoteNo.toLocaleLowerCase().includes(lowerQuery) ||
        item.dealer.toLocaleLowerCase().includes(lowerQuery) ||
        item.code.toLocaleLowerCase().includes(lowerQuery),
    )
  })
  return { items, searchQuery, isLoading, fetchItems, filteredItems }
})
