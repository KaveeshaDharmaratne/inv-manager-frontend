<script setup lang="ts">
import GdnForm from '@/components/GdnForm.vue'
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">GDN</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Restock inventory.</p>
      </div>

      <GdnForm />
    </div>
  </main>
</template>
