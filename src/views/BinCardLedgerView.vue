<script setup lang="ts">
import { useLedgerStore } from '@/stores/ledger'
import type { LedgerFilter } from '@/types/ledger'
import { storeToRefs } from 'pinia'
import LedgerFilterForm from '@/components/LedgerFilter.vue'
import LedgerTable from '@/components/LedgerTable.vue'

const store = useLedgerStore()
const { products, isLoading } = storeToRefs(store)
const { fetchEntries } = store

const handleFilterSubmit = (filters: LedgerFilter) => {
  fetchEntries(filters)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!--Header Section-->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Bin Card Ledger</h1>
        <p class="mt-2 text-sm text-gray-500">
          Select a date range to view grouped product cards. Use product code only when you need
          a single-item bin card.
        </p>
      </div>

      <main>
        <LedgerFilterForm @submit="handleFilterSubmit" />

        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>

        <LedgerTable v-else :product-ledgers="products" />
      </main>
    </div>
  </div>
</template>
