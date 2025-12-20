<script setup lang="ts">
import SaleForm from '@/components/SaleForm.vue'
</script>

<template>
  <main class="flex-1 overflow-y-auto p-8">
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Invoice Update
        </h2>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Update invoice details and add items.</p>
      </header>

      <SaleForm />
    </div>
  </main>
</template>
