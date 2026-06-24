<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  wipeItemQuantities,
  deleteAllItems,
  deleteAllInvoices,
  deleteAllReturns,
  deleteAllGdns,
} from '@/api/dataManagement'

// ─── Confirmation dialog state ────────────────────────────────────────────────
interface PendingAction {
  id: string
  label: string
  description: string
  confirmText: string
  danger: 'high' | 'critical'
  execute: () => Promise<unknown>
}

const dialogVisible = ref(false)
const pendingAction = ref<PendingAction | null>(null)
const confirmInput = ref('')
const isExecuting = ref(false)
const lastResult = ref<{ label: string; message: string; success: boolean } | null>(null)

// ─── Transaction checkboxes ────────────────────────────────────────────────────
const deleteInvoices = ref(false)
const deleteReturns = ref(false)
const deleteGdns = ref(false)
const noTransactionSelected = computed(() => !deleteInvoices.value && !deleteReturns.value && !deleteGdns.value)

// ─── Action definitions ────────────────────────────────────────────────────────
const openDialog = (action: PendingAction) => {
  pendingAction.value = action
  confirmInput.value = ''
  dialogVisible.value = true
  lastResult.value = null
}

const closeDialog = () => {
  dialogVisible.value = false
  pendingAction.value = null
  confirmInput.value = ''
}

const confirmMatches = computed(() => {
  if (!pendingAction.value) return false
  return confirmInput.value.trim() === pendingAction.value.confirmText
})

const executeAction = async () => {
  if (!pendingAction.value || !confirmMatches.value) return
  isExecuting.value = true
  const label = pendingAction.value.label
  try {
    await pendingAction.value.execute()
    lastResult.value = { label, message: 'Operation completed successfully.', success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error occurred.'
    lastResult.value = { label, message: `Failed: ${msg}`, success: false }
  } finally {
    isExecuting.value = false
    closeDialog()
  }
}

const handleWipeQuantities = () => {
  openDialog({
    id: 'wipe-qty',
    label: 'Wipe All Item Quantities',
    description:
      'This will set the quantity of every item in the database to 0. This action cannot be undone.',
    confirmText: 'wipe qty',
    danger: 'high',
    execute: wipeItemQuantities,
  })
}

const handleDeleteItems = () => {
  openDialog({
    id: 'delete-items',
    label: 'Delete All Items',
    description:
      'This will permanently delete every item along with all invoices, returns, and GDNs that reference them. This action cannot be undone.',
    confirmText: 'delete items',
    danger: 'critical',
    execute: deleteAllItems,
  })
}

const handleDeleteTransactions = async () => {
  if (noTransactionSelected.value) return

  const parts: string[] = []
  if (deleteInvoices.value) parts.push('invoices')
  if (deleteReturns.value) parts.push('returns')
  if (deleteGdns.value) parts.push('GDNs')
  const label = `Delete All ${parts.join(', ')}`

  const execute = async () => {
    const calls: Promise<unknown>[] = []
    if (deleteInvoices.value) calls.push(deleteAllInvoices())
    if (deleteReturns.value) calls.push(deleteAllReturns())
    if (deleteGdns.value) calls.push(deleteAllGdns())
    await Promise.all(calls)
  }

  openDialog({
    id: 'delete-transactions',
    label,
    description: `This will permanently delete all ${parts.join(', ')}. This action cannot be undone.`,
    confirmText: `delete ${parts.join(' ')}`,
    danger: 'critical',
    execute,
  })
}
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 lg:py-10">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <span class="material-icons-outlined text-3xl text-red-500">warning</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Data Management
          </h2>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Bulk database operations. All actions are permanent and cannot be reversed. Proceed with caution.
        </p>
      </div>

      <!-- Result toast -->
      <transition name="fade">
        <div
          v-if="lastResult"
          :class="[
            'mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm',
            lastResult.success
              ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
              : 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
          ]"
        >
          <span class="material-icons-outlined text-lg mt-0.5">
            {{ lastResult.success ? 'check_circle' : 'error' }}
          </span>
          <div>
            <p class="font-semibold">{{ lastResult.label }}</p>
            <p>{{ lastResult.message }}</p>
          </div>
        </div>
      </transition>

      <!-- Section: Item Actions -->
      <section class="mb-6">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          Item Actions
        </h3>
        <div class="space-y-3">

          <!-- Wipe Quantities -->
          <div class="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/50 dark:bg-amber-950/30 px-5 py-4">
            <div class="flex items-start gap-3">
              <span class="material-icons-outlined text-amber-500 mt-0.5">exposure_zero</span>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white text-sm">Wipe All Item Quantities</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Set every item's quantity to 0</p>
              </div>
            </div>
            <button
              id="btn-wipe-qty"
              @click="handleWipeQuantities"
              class="ml-4 shrink-0 rounded-lg border border-amber-400 bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-200 dark:border-amber-700 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-900"
            >
              Wipe Quantities
            </button>
          </div>

          <!-- Delete All Items -->
          <div class="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 dark:border-red-800/50 dark:bg-red-950/30 px-5 py-4">
            <div class="flex items-start gap-3">
              <span class="material-icons-outlined text-red-500 mt-0.5">delete_sweep</span>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white text-sm">Delete All Items</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Removes all items and their linked transactions</p>
              </div>
            </div>
            <button
              id="btn-delete-items"
              @click="handleDeleteItems"
              class="ml-4 shrink-0 rounded-lg border border-red-400 bg-red-100 px-4 py-2 text-xs font-semibold text-red-800 transition hover:bg-red-200 dark:border-red-700 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"
            >
              Delete Items
            </button>
          </div>

        </div>
      </section>

      <!-- Section: Transaction Actions -->
      <section>
        <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          Transaction Actions
        </h3>
        <div class="rounded-xl border border-red-200 bg-red-50 dark:border-red-800/50 dark:bg-red-950/30 px-5 py-4">
          <div class="flex items-start gap-3 mb-4">
            <span class="material-icons-outlined text-red-500 mt-0.5">playlist_remove</span>
            <div>
              <p class="font-semibold text-gray-900 dark:text-white text-sm">Delete Transaction Records</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Select which transaction types to permanently remove</p>
            </div>
          </div>

          <!-- Checkboxes -->
          <div class="flex flex-wrap gap-4 mb-4 pl-1">
            <label id="chk-invoices" class="flex items-center gap-2 cursor-pointer group">
              <input
                v-model="deleteInvoices"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-red-600 accent-red-600 cursor-pointer"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-red-600 transition-colors">Invoices</span>
            </label>
            <label id="chk-returns" class="flex items-center gap-2 cursor-pointer group">
              <input
                v-model="deleteReturns"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-red-600 accent-red-600 cursor-pointer"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-red-600 transition-colors">Returns</span>
            </label>
            <label id="chk-gdns" class="flex items-center gap-2 cursor-pointer group">
              <input
                v-model="deleteGdns"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-red-600 accent-red-600 cursor-pointer"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-red-600 transition-colors">GDNs</span>
            </label>
          </div>

          <button
            id="btn-delete-transactions"
            @click="handleDeleteTransactions"
            :disabled="noTransactionSelected"
            class="rounded-lg border border-red-400 bg-red-100 px-4 py-2 text-xs font-semibold text-red-800 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-700 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"
          >
            Delete Selected
          </button>
        </div>
      </section>

    </div>
  </main>

  <!-- ─── Confirmation Dialog ─────────────────────────────────────────────────── -->
  <teleport to="body">
    <transition name="backdrop">
      <div
        v-if="dialogVisible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeDialog"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeDialog" />

        <!-- Modal -->
        <div class="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">

          <!-- Top danger stripe -->
          <div :class="[
            'h-1.5 w-full',
            pendingAction?.danger === 'critical' ? 'bg-red-500' : 'bg-amber-400'
          ]" />

          <div class="p-6">
            <!-- Icon + Title -->
            <div class="flex items-center gap-3 mb-4">
              <span :class="[
                'material-icons-outlined text-2xl',
                pendingAction?.danger === 'critical' ? 'text-red-500' : 'text-amber-500'
              ]">
                {{ pendingAction?.danger === 'critical' ? 'dangerous' : 'warning_amber' }}
              </span>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                {{ pendingAction?.label }}
              </h3>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
              {{ pendingAction?.description }}
            </p>

            <!-- Confirm input -->
            <div class="mb-5">
              <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Type <span class="font-mono font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{{ pendingAction?.confirmText }}</span> to confirm
              </label>
              <input
                id="dialog-confirm-input"
                v-model="confirmInput"
                type="text"
                :placeholder="pendingAction?.confirmText"
                class="w-full rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                @keydown.enter="confirmMatches && !isExecuting && executeAction()"
              />
            </div>

            <!-- Actions -->
            <div class="flex gap-3 justify-end">
              <button
                id="dialog-cancel-btn"
                @click="closeDialog"
                :disabled="isExecuting"
                class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                id="dialog-confirm-btn"
                @click="executeAction"
                :disabled="!confirmMatches || isExecuting"
                :class="[
                  'rounded-lg px-4 py-2 text-sm font-semibold text-white transition flex items-center gap-2',
                  pendingAction?.danger === 'critical'
                    ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-red-900'
                    : 'bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 dark:disabled:bg-amber-900',
                  'disabled:cursor-not-allowed'
                ]"
              >
                <span v-if="isExecuting" class="material-icons-outlined text-base animate-spin">sync</span>
                {{ isExecuting ? 'Processing...' : 'Confirm' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
