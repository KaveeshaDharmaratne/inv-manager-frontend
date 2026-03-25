import type { DamageItem } from '@/types/damage'
import { fetchReturns } from '@/api/returns'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDamageStore = defineStore('damage', () => {
  const items = ref<DamageItem[]>([])
  const searchQuery = ref('')
  const isLoading = ref(false)

  async function fetchItems(startDate?: string | null, endDate?: string | null) {
    isLoading.value = true
    try {
      const { data } = await fetchReturns()
      let returnsData = data as any[]

      // apply optional date filtering (server returns date as ISO or yyyy-mm-dd)
      if (startDate) {
        const s = new Date(startDate)
        returnsData = returnsData.filter((r) => new Date(r.date) >= s)
      }

      if (endDate) {
        const e = new Date(endDate)
        // include endDate full day
        e.setHours(23, 59, 59, 999)
        returnsData = returnsData.filter((r) => new Date(r.date) <= e)
      }

      const damageReturns = returnsData.filter((r: any) => r.type === 'Damage')
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
