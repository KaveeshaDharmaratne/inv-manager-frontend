<script setup lang="ts">
import { reactive } from 'vue';
import type { LedgerFilter } from '@/types/ledger';

// Define what events this component can emit to its parent
const emit = defineEmits<{
  (e: 'submit', filters: LedgerFilter): void;
}>();

const filters = reactive<LedgerFilter>({
  fromDate: '',
  toDate: '',
  productCode: '',
  description: ''
});

function onSubmit() {
  emit('submit', filters);
}
</script>

<template>
  <div class="filter-card">
    <div class="form-grid">
      <div class="form-group">
        <label>From Date</label>
        <input type="date" v-model="filters.fromDate"/>
      </div>
      <div class="form-group">
        <label>To Date</label>
        <input type="date" v-model="filters.toDate"/>
      </div>
      <div class="form-group">
        <label>Product Code</label>
        <input type="text" v-model="filters.productCode" placeholder="Code"/>
      </div>
      <div class="form-group">
        <label>Product Description</label>
        <input type="text" v-model="filters.description" placeholder="Description"/>
      </div>
    </div>
    <div class="actions">
      <button @click="onSubmit" class="btn-submit">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.filter-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}

.input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #6366f1;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn-submit {
  background-color: #5453e8;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #4341c9;
}
</style>
