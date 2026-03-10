import type { DamageItem } from '@/types/damage'
import { fetchReturns } from '@/api/returns'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDamageStore = defineStore('damage', () => {
  const items = ref<DamageItem[]>([])
  const searchQuery = ref('')
  const isLoading = ref(false)

  async function fetchItems() {
    isLoading.value = true
    try {
      const { data } = await fetchReturns()
      const damageReturns = data.filter(
        (r: any) => r.type === 'Damage',
      )
      items.value = damageReturns.flatMap((r: any) =>
        (r.items ?? []).map((ri: any) => ({
          id: `${r.returnNoteNo}-${ri.itemCode}`,
          date: r.date,
          type: r.type,
          dealer: r.dealer?.name ?? r.dealerId ?? '',
          returnNoteNo: r.returnNoteNo,
          code: ri.itemCode ?? ri.item?.code ?? '',
          description: ri.item?.description ?? '',
          qty: ri.quantity,
        })),
      ) as DamageItem[]
    } finally {
      isLoading.value = false
    }
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
