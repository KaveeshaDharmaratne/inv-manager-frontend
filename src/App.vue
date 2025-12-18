<script setup lang="ts">
import { RouterView } from 'vue-router'
// TypeScript may not detect a default export from some SFCs compiled with <script setup>.
// Ignore the type error here because the component is valid at runtime.
// ts-expect-error
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div
    class="flex h-screen bg-background-light dark:bg-background-dark text-zinc-800 dark:text-zinc-200 font-display"
  >
    <aside
      class="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col"
    >
      <AppNavbar />
    </aside>

    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<style>
.material-icons-outlined {
  font-size: inherit;
}
</style>
