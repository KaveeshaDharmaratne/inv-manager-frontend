<script setup lang="ts">
import type { LedgerEntry } from '@/types/ledger';
import { format, parseISO } from 'date-fns';

// Props
defineProps<{
  entries: LedgerEntry[];
}>();

// Helper to format date
const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'dd/MM/yyyy');
};
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>DATE</th>
          <th>TRANSACTION TYPE</th>
          <th>TRANSACTION NO</th>
          <th>DEALER</th>
          <th class="text-center">+</th>
          <th class="text-center">-</th>
          <th class="text-right">BALANCE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>{{ formatDate(entry.date) }}</td>
          <td class="text-gray">{{ entry.transactionType }}</td>
          <td class="text-gray">{{ entry.transactionNo }}</td>
          <td>{{ entry.dealer }}</td>

          <!--Conditional Class: Green if value exists-->
          <td class="text-center success">{{ entry.inQty|| '-' }}</td>

          <!--Conditional Class: Red if value exists-->
          <td class="text-center danger">{{ entry.outQty|| '-' }}</td>
          <td class="text-right font-bold">{{ entry.balance }}</td>
        </tr>
        <!-- Footer Row -->
        <tr class="footer-row">
          <td colspan="6" class="text-right font-bold label-total">TOTAL</td>
          <td class="text-right font-bold">TOTAL_BALANCE_DYNAMIC</td>
        </tr>
      </tbody>
    </table>>
  </div>
</template>

<style scoped>
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* Ensures rounded corners clip content */
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem
}

th {
  text-align: left;
  padding: 1rem;
  background-color: #f9fafb;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05rem;
  border-bottom: 1px solid #eee;
}

td {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  color: #333;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-gray {
  color: #6b7280;
}

.font-bold {
  font-weight: 700;
}

.success {
  color: #10b981;
}

.danger {
  color: #ef4444;
}

.footer-row {
  background-color: #f9fafb;
  border-top: 2px solid #eee;
  font-size: 1rem;
}

.label-total {
  color: #6b7280;
  letter-spacing: 0.05rem;
}
</style>
