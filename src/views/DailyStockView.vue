<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { fetchItems, type ItemDTO } from '../api/items'

const allItems = ref<ItemDTO[]>([])
const filtered = ref<ItemDTO[]>([])
const search = ref('')
const searchField = ref<'code' | 'description'>('code')
const sortOrder = ref<'asc' | 'desc' | 'recent'>('asc')
const isLoading = ref(false)

let searchDebounce: number | undefined

const load = async () => {
  isLoading.value = true
  try {
    const items = await fetchItems()
    allItems.value = items
    applyFilters()
    renderedAt.value = new Date()
  } finally {
    isLoading.value = false
  }
}

const applyFilters = () => {
  const q = search.value.trim().toLowerCase()
  let list = allItems.value.slice()

  if (q) {
    list = list.filter((it) => {
      const fieldVal = (searchField.value === 'code' ? it.code : (it.description || '')).toLowerCase()
      return fieldVal.startsWith(q)
    })
  }

  if (sortOrder.value === 'recent') {
    // "Recently added" — preserve server order
  } else if (searchField.value === 'description') {
    list.sort((a, b) => {
      const A = (a.description || '').toLowerCase()
      const B = (b.description || '').toLowerCase()
      return sortOrder.value === 'asc' ? A.localeCompare(B) : B.localeCompare(A)
    })
  } else {
    list.sort((a, b) => {
      const A = a.code.toLowerCase()
      const B = b.code.toLowerCase()
      return sortOrder.value === 'asc' ? A.localeCompare(B) : B.localeCompare(A)
    })
  }

  filtered.value = list
}

watch([searchField, sortOrder], () => applyFilters())

watch(search, () => {
  if (searchDebounce) window.clearTimeout(searchDebounce)
  searchDebounce = window.setTimeout(() => applyFilters(), 200)
})

onMounted(() => {
  load()
})

onUnmounted(() => {
  if (searchDebounce) window.clearTimeout(searchDebounce)
})

const displayCount = computed(() => filtered.value.length)
const renderedAt = ref<Date | null>(null)
const formattedRenderedAt = computed(() => {
  if (!renderedAt.value) return ''
  return renderedAt.value.toLocaleString()
})
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Daily Stock</h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">All products with realtime quantities — current inventory as of {{ formattedRenderedAt }}.</p>
        </div>
      </div>

      <div class="mt-6 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 p-4">
        <div class="flex gap-3 items-center">
          <input
            v-model="search"
            type="search"
            placeholder="Search..."
            class="px-3 py-2 border rounded w-1/3 bg-gray-50 dark:bg-zinc-800 text-sm"
          />

          <select v-model="searchField" class="px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-sm">
            <option value="code">Item code</option>
            <option value="description">Description</option>
          </select>

          <select v-model="sortOrder" class="px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-sm">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            <option value="recent">Recently added</option>
          </select>

          <div class="ml-auto flex items-center gap-3">
            <div class="text-sm text-gray-500 dark:text-gray-400">Showing {{ displayCount }} items</div>
            <button @click="load" class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">Refresh</button>
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
        <div v-if="isLoading" class="px-6 py-4 text-center text-sm text-gray-500">Loading products...</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
            <thead class="bg-gray-50 dark:bg-zinc-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Item code</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Quantity</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-700">
              <tr v-for="item in filtered" :key="item.code" class="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ item.code }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">{{ item.description || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm" :class="item.quantity === 0 ? 'text-red-600 font-semibold' : item.quantity < 10 ? 'text-yellow-600 font-semibold' : 'text-gray-900 dark:text-white'">{{ item.quantity }}</td>
              </tr>
              <tr v-if="filtered.length === 0">
                <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">No products found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
