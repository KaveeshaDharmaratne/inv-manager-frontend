<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import FlashMessages from './components/FlashMessages.vue'

const route = useRoute()
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    closeSidebar()
  },
)
</script>

<template>
  <div
    class="relative flex h-screen bg-background-light dark:bg-background-dark text-zinc-800 dark:text-zinc-200 font-display"
  >
    <FlashMessages />

    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-zinc-950/40 md:hidden"
      aria-hidden="true"
      @click="closeSidebar"
    />

    <aside
      id="app-sidebar"
      :class="[
        'fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transform transition-transform duration-300 ease-out md:static md:w-64 md:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <div
        class="flex items-center justify-between border-b border-zinc-200 px-4 py-4 dark:border-zinc-800 md:hidden"
      >
        <h1 class="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-100">
          Inventory Manager
        </h1>
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label="Close sidebar"
          @click="closeSidebar"
        >
          <span class="material-icons-outlined text-xl">close</span>
        </button>
      </div>

      <AppNavbar @navigate="closeSidebar" />
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header
        class="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 md:hidden"
      >
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Toggle sidebar"
          aria-controls="app-sidebar"
          :aria-expanded="isSidebarOpen ? 'true' : 'false'"
          @click="toggleSidebar"
        >
          <span class="material-icons-outlined text-xl">{{ isSidebarOpen ? 'close' : 'menu' }}</span>
        </button>

        <h1 class="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-100">
          Inventory Manager
        </h1>

        <span class="w-10" aria-hidden="true" />
      </header>

      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
.material-icons-outlined {
  font-size: inherit;
}
</style>
