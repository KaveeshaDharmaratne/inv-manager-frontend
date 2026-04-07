<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { LedgerFilter } from '@/types/ledger'
import { useProductStore } from '@/stores/productStore'

const emit = defineEmits<{
  submit: [filters: LedgerFilter]
}>()

const productStore = useProductStore()

const filters = reactive<LedgerFilter & { description: string }>({
  fromDate: '',
  toDate: '',
  productCode: undefined,
  description: '',
})

// Auto-fill description when product code is entered (same pattern as returns form)
watch(
  () => filters.productCode,
  async (newCode) => {
    if (!newCode || newCode.trim().length < 3) {
      filters.description = ''
      return
    }
    const normalizedCode = newCode.trim()
    const product = await productStore.fetchProductByCode(normalizedCode)
    if (filters.productCode?.trim() === normalizedCode) {
      filters.description = product?.description ?? ''
    }
  },
)

function onSubmit() {
  emit('submit', {
    fromDate: filters.fromDate,
    toDate: filters.toDate,
    productCode: filters.productCode?.trim() || undefined,
  })
}
</script>

<template>
  <div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div class="flex flex-col gap-2">
        <label for="ledger-from-date" class="text-sm font-semibold text-gray-700">From Date</label>
        <input
          id="ledger-from-date"
          type="date"
          v-model="filters.fromDate"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="ledger-to-date" class="text-sm font-semibold text-gray-700">To Date</label>
        <input
          id="ledger-to-date"
          type="date"
          v-model="filters.toDate"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="ledger-product-code" class="text-sm font-semibold text-gray-700">Product Code (Optional)</label>
        <input
          id="ledger-product-code"
          type="text"
          v-model="filters.productCode"
          placeholder="Leave empty to include all products"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="ledger-product-description" class="text-sm font-semibold text-gray-700">Product Description</label>
        <input
          id="ledger-product-description"
          type="text"
          :value="filters.description"
          readonly
          tabindex="-1"
          placeholder="Auto-filled when a product code is given"
          class="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-600 cursor-default"
        />
      </div>
    </div>
    <div class="flex flex-col sm:flex-row sm:justify-end mt-6">
      <button
        @click="onSubmit"
        class="w-full sm:w-auto bg-indigo-600 text-white px-8 py-2.5 rounded-md font-medium text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
      >
        Submit
      </button>
    </div>
  </div>
</template>
