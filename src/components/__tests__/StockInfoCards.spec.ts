import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import StockInfoCards from '../StockInfoCards.vue'
import { useDashboardStore } from '@/stores/dashboard'

describe('StockInfoCards', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(StockInfoCards)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays metrics from the store', async () => {
    const store = useDashboardStore()

    // Update store state
    store.metrics.totalProducts = 1234
    store.metrics.lowStockCount = 56
    store.metrics.outOfStockCount = 7
    store.metrics.totalStockValue = 850000

    const wrapper = mount(StockInfoCards)

    // Check Total Products
    expect(wrapper.text()).toContain('Total Products')
    expect(wrapper.text()).toContain('1,234') // formatNumber adds commas

    // Check Low Stock
    expect(wrapper.text()).toContain('Items Low in Stock')
    expect(wrapper.text()).toContain('56')

    // Check Out of Stock
    expect(wrapper.text()).toContain('Out of Stock')
    expect(wrapper.text()).toContain('7')

    // Check Total Stock Value
    // 850000 -> 850K with LKR currency
    // The exact output depends on the locale environment in the test runner (jsdom)
    // We can check for the number part at least
    expect(wrapper.text()).toContain('Total Stock Value')
    // We expect something like "LKR 850K" or "Rs. 850K"
    const valueText = wrapper.text()
    expect(valueText).toContain('850')
  })

  it('calls lifecycle methods correctly', () => {
    const store = useDashboardStore()
    const fetchSpy = vi.spyOn(store, 'fetchMetrics')
    const startSpy = vi.spyOn(store, 'startRealtimeUpdates')
    const stopSpy = vi.spyOn(store, 'stopRealtimeUpdates')

    const wrapper = mount(StockInfoCards)

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(startSpy).toHaveBeenCalledTimes(1)

    wrapper.unmount()

    expect(stopSpy).toHaveBeenCalledTimes(1)
  })
})
