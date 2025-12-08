import type { LedgerEntry, LedgerFilter } from "@/types/ledger";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLedgerStore = defineStore('ledger', () => {
  const entries = ref<LedgerEntry[]>([]);
  const isLoading = ref(false);

  // Mock data
  const mockData: LedgerEntry[] = [
    {id: '1', date: '2024-01-01', transactionType: 'INV', transactionNo: 'INV001', dealer: 'Dealer A', outQty: 10, balance: 90},
    {id: '2', date: '2024-01-02', transactionType: 'GRN', transactionNo: 'GRN001', dealer: 'Dealer B', inQty: 0, balance: 100},
    {id: '3', date: '2024-01-03', transactionType: 'ADJ', transactionNo: 'ADJ001', dealer: 'Dealer C', outQty: 5, balance: 50},
  ];

  // --- Actions ---
  async function fetchEntries(filter: LedgerFilter) {

    isLoading.value = true;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, you would pass 'filter' to an API call here
    entries.value = mockData;
    isLoading.value = false;
  }

  // --- Getters ---
  // Example getter: calculate total balance dynamically
  const currentBalance = computed(() => {
    if (entries.value.length === 0) return 0;
    return entries.value[0]?.balance; // Assuming first entry is latest
  });

  return { entries, isLoading, fetchEntries, currentBalance };
});
