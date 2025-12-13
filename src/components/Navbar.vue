<script setup lang="ts">
import { useNavigationStore } from '../stores/navigationStore'
import { RouterLink } from 'vue-router'
import { useMenu } from '../composables/useMenu'

// Access the store
const navStore = useNavigationStore()
// Access menu composable
const { isParentActive } = useMenu()
</script>

<template>
  <nav class="flex-1 p-4 space-y-1">
    <div v-for="(item, index) in navStore.navItems" :key="index">
      <!-- Parent Menu Item -->
      <button
        @click="navStore.toggleExpand(item)"
        class="w-full flex items-center justify-between p-2 rounded font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        :class="
          isParentActive(item.children)
            ? 'text-zinc-900 dark:text-white font-semibold'
            : 'text-zinc-600 dark:text-zinc-400'
        "
      >
        <span class="flex items-center gap-3">
          <span class="material-icons-outlined text-xl">{{ item.icon }}</span>
          {{ item.label }}
        </span>
        <span class="material-icons-outlined text-lg">
          {{ item.expanded ? 'expand_less' : 'expand_more' }}
        </span>
      </button>

      <!-- Children Items -->
      <div v-show="item.expanded" class="pl-8 pt-1 space-y-1">
        <RouterLink
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
          :to="child.to || '#'"
          active-class="bg-zinc-200 dark:bg-zinc-700 text-primary dark:text-white font-semibold"
          class="block p-2 rounded text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
        >
          {{ child.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
