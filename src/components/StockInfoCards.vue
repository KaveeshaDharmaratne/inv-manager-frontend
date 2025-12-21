<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <div
      class="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-zinc-500">Total Products</p>
          <p class="text-3xl font-bold text-zinc-900 dark:text-white mt-1">12,480</p>
        </div>
        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
          <span class="material-icons-outlined text-indigo-500 dark:text-indigo-400">widgets</span>
        </div>
      </div>
      <p class="text-xs text-green-500 mt-4 flex items-center">
        <span class="material-icons-outlined text-sm">arrow_upward</span>
        122 new products this week
      </p>
    </div>
    <div
      class="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-zinc-500">Items Low in Stock</p>
          <p class="text-3xl font-bold text-zinc-900 dark:text-white mt-1">86</p>
        </div>
        <div class="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
          <span class="material-icons-outlined text-yellow-500 dark:text-yellow-400"
            >warning_amber</span
          >
        </div>
      </div>
      <p class="text-xs text-zinc-500 mt-4">3 items need immediate reorder</p>
    </div>
    <div
      class="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-zinc-500">Out of Stock</p>
          <p class="text-3xl font-bold text-zinc-900 dark:text-white mt-1">12</p>
        </div>
        <div class="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
          <span class="material-icons-outlined text-red-500 dark:text-red-400">error_outline</span>
        </div>
      </div>
      <p class="text-xs text-red-500 mt-4 flex items-center">
        <span class="material-icons-outlined text-sm">arrow_downward</span>
        2 more than last week
      </p>
    </div>
    <div
      class="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-zinc-500">Total Stock Value</p>
          <p class="text-3xl font-bold text-zinc-900 dark:text-white mt-1">$450k</p>
        </div>
        <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
          <span class="material-icons-outlined text-green-500 dark:text-green-400"
            >attach_money</span
          >
        </div>
      </div>
      <p class="text-xs text-zinc-500 mt-4">Based on current sales price</p>
    </div>
  </div>
</template>
