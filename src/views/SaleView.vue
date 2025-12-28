<script setup lang="ts">
import SaleForm from '@/components/SaleForm.vue'
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Invoice Update
        </h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Update invoice details and add items.
        </p>
      </div>

      <SaleForm />
    </div>
  </main>
</template>
