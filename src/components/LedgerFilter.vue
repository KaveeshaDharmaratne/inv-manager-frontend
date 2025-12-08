<script setup lang="ts">
import { reactive } from 'vue'
import type { LedgerFilter } from '@/types/ledger'

// Define what events this component can emit to its parent
const emit = defineEmits<{
  (e: 'submit', filters: LedgerFilter): void
}>()

const filters = reactive<LedgerFilter>({
  fromDate: '',
  toDate: '',
  productCode: '',
  description: '',
})

function onSubmit() {
  emit('submit', filters)
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-gray-700">From Date</label>
        <input type="date" v-model="filters.fromDate"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-gray-700">To Date</label>
        <input type="date" v-model="filters.toDate"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-gray-700">Product Code</label>
        <input type="text" v-model="filters.productCode" placeholder="Code"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold text-gray-700">Product Description</label>
        <input type="text" v-model="filters.description" placeholder="Description"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
      </div>
    </div>
    <div class="flex justify-end mt-6">
      <button @click="onSubmit"
        class="bg-indigo-600 text-white px-8 py-2.5 rounded-md font-medium text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm">
        Submit
      </button>
    </div>
  </div>
</template>
