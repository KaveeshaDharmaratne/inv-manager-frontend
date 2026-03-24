<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { format, parseISO } from 'date-fns'
import { useRoute, useRouter } from 'vue-router'
import apiClient from '../api/axios'

const route = useRoute()
const router = useRouter()
const type = (route.params.type as string) || route.query.type || 'Invoice'
const id = (route.params.id as string) || (route.query.id as string) || ''

const loading = ref(true)
const error = ref<string | null>(null)
const transaction = ref<any>(null)

onMounted(async () => {
  if (!id) {
    error.value = 'Missing transaction id'
    loading.value = false
    return
  }

  try {
    const resp = await apiClient.get('/stock-overview/transaction', {
      params: { type, id },
    })
    transaction.value = resp.data
  } catch (e: any) {
    error.value = e?.response?.data?.message || String(e)
  } finally {
    loading.value = false
  }
})

const goBack = () => router.back()

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  try {
    return format(parseISO(dateString), 'dd/MM/yyyy')
  } catch {
    return dateString
  }
}
</script>

<template>
  <main class="p-6">
    <div class="max-w-4xl mx-auto bg-white p-6 border">
      <!-- Header -->
      <div class="flex items-start justify-between border p-4">
        <div class="w-1/3 text-sm">
          <div class="font-bold">DISTRIBUTOR</div>
          <div class="mt-2">WIJAYARATHNE DISTRIBUTORS</div>
          <div class="mt-1">No 224 1 Kudamaduwa Siddamulla</div>
          <div class="mt-1">TEL : 0775531345/011-3414585</div>
          <div class="mt-1">E Mail : wijayarathnedistributors@gmail.com</div>
        </div>

        <div class="w-1/3 flex items-center justify-center">
          <div class="w-32 h-20 border flex items-center justify-center">LOGO</div>
        </div>

        <div class="w-1/3 text-sm text-right">
          <div class="font-bold">AUTHORISED DISTRIBUTOR FOR:</div>
          <div class="mt-2">St. Anthonys Industries Group (Pvt) Ltd</div>
          <div class="mt-1">P.O Box 1455</div>
          <div class="mt-1">752/1,Dr.Danister De Silva Mawatha,Colombo</div>
          <div class="mt-1">TEL : 0112680600</div>
        </div>
      </div>

      <!-- Details -->
      <div class="border p-4 mt-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div><strong>Account No:</strong> {{ transaction?.accountNo || '-' }}</div>
            <div class="mt-2"><strong>Customer:</strong></div>
            <div class="ml-4">{{ transaction?.customer?.name || '-' }}</div>
            <div class="ml-4">{{ transaction?.customer?.address || '' }}</div>
            <div class="ml-4">{{ transaction?.customer?.contactNumber || '' }}</div>
          </div>

          <div class="text-right">
            <div><strong>Order Date:</strong> {{ formatDate(transaction?.date) }}</div>
            <div class="mt-2"><strong>Time:</strong> {{ transaction?.time || '-' }}</div>
            <div class="mt-2"><strong>Invoice/Return No:</strong> {{ transaction?.transactionId || '-' }}</div>
            <div class="mt-2"><strong>State Type:</strong> {{ transaction?.stateType || '-' }}</div>
          </div>
        </div>
      </div>

      <!-- Items table -->
      <div class="mt-4">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="3" class="px-6 py-4 text-center">Loading...</td>
              </tr>
              <tr v-else-if="error">
                <td colspan="3" class="px-6 py-4 text-center text-red-600">{{ error }}</td>
              </tr>
              <tr v-else v-for="item in transaction?.items || []" :key="item.itemCode">
                <td class="px-6 py-4 text-sm font-medium">{{ item.itemCode }}</td>
                <td class="px-6 py-4 text-sm">{{ item.description || '-' }}</td>
                <td class="px-6 py-4 text-sm">{{ item.quantity }}</td>
              </tr>
              <tr v-if="!loading && !error && (transaction?.items || []).length === 0">
                <td colspan="3" class="px-6 py-4 text-center">No items</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-4 flex justify-between">
        <button class="px-4 py-2 border rounded" @click="goBack">Back</button>
      </div>
    </div>
  </main>
</template>
