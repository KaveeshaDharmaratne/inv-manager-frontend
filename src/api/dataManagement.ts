import apiClient from './axios'

export const wipeItemQuantities = () =>
  apiClient.patch('/api/v1/data-management/items/wipe-quantities')

export const deleteAllItems = () =>
  apiClient.delete('/api/v1/data-management/items')

export const deleteAllInvoices = () =>
  apiClient.delete('/api/v1/data-management/invoices')

export const deleteAllReturns = () =>
  apiClient.delete('/api/v1/data-management/returns')

export const deleteAllGdns = () =>
  apiClient.delete('/api/v1/data-management/gdns')

export default {
  wipeItemQuantities,
  deleteAllItems,
  deleteAllInvoices,
  deleteAllReturns,
  deleteAllGdns,
}
