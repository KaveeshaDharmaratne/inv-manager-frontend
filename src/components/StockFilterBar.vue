<script setup lang="ts">
import { ref } from 'vue'
import { subDays, format } from 'date-fns'

const emit = defineEmits(['apply', 'clear'])

const props = defineProps<{
  presetType?: string | null
  disableType?: boolean
}>()

const from = ref<string | null>(null)
const to = ref<string | null>(null)
const type = ref<string | null>(props.presetType ?? null)

const disableType = props.disableType ?? false

function apply() {
  emit('apply', { startDate: from.value, endDate: to.value, type: type.value })
}

function clearFilters() {
  from.value = null
  to.value = null
  if (!disableType) type.value = null
  emit('clear')
}

function preset(days: number) {
  const now = new Date()
  from.value = format(subDays(now, days - 1), 'yyyy-MM-dd')
  to.value = format(now, 'yyyy-MM-dd')
}
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 rounded-lg shadow p-4 mb-6 border border-gray-100 dark:border-zinc-800">
    <div class="flex flex-col sm:flex-row sm:items-end sm:space-x-4 gap-3">
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">From</label>
          <input v-model="from" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">To</label>
          <input v-model="to" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
      </div>

      <div class="w-48">
        <label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">Type</label>
        <select v-model="type" :disabled="disableType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-60">
          <option value="">All</option>
          <option value="Invoice">Invoice</option>
          <option value="Return">Damage Return</option>
          <option value="Return">Good Return</option>
          <option value="GDN">GDN</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <button
          @click="apply"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm cursor-pointer hover:bg-indigo-700 active:scale-95 transition transform focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Apply
        </button>
        <button
          @click="clearFilters"
          class="inline-flex items-center px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 active:scale-95 transition transform focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          Clear
        </button>
      </div>
    </div>

    <div class="mt-3 flex items-center space-x-2 text-sm text-gray-500 dark:text-zinc-400">
      <span>Quick:</span>
      <button
        @click.prevent="preset(7)"
        class="px-2 py-1 rounded text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 active:opacity-80 cursor-pointer transition"
      >
        Last 7
      </button>
      <button
        @click.prevent="preset(30)"
        class="px-2 py-1 rounded text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 active:opacity-80 cursor-pointer transition"
      >
        Last 30
      </button>
      <button
        @click.prevent="preset(365)"
        class="px-2 py-1 rounded text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 active:opacity-80 cursor-pointer transition"
      >
        Last 12 mo
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
