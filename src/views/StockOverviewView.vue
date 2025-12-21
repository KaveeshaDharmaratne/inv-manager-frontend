<script setup lang="ts">
import StockInfoCards from '@/components/StockInfoCards.vue'
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Stock Overview
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Welcome back, here's a look at your inventory.
          </p>
        </div>
      </div>
      <StockInfoCards />
    </div>
  </main>
</template>
