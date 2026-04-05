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
  })

  it('calls fetchMetrics on mount', () => {
    const store = useDashboardStore()
    const fetchSpy = vi.spyOn(store, 'fetchMetrics')

    mount(StockInfoCards)

    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('calls fetchProducts when a metric card is clicked', async () => {
    const store = useDashboardStore()
    const fetchProductsSpy = vi.spyOn(store, 'fetchProducts')
    const wrapper = mount(StockInfoCards)

    const cards = wrapper.findAll('div.cursor-pointer')
    expect(cards).toHaveLength(3)

    await cards[0]?.trigger('click')
    await cards[1]?.trigger('click')
    await cards[2]?.trigger('click')

    expect(fetchProductsSpy).toHaveBeenNthCalledWith(1, 'all')
    expect(fetchProductsSpy).toHaveBeenNthCalledWith(2, 'low-stock')
    expect(fetchProductsSpy).toHaveBeenNthCalledWith(3, 'out-of-stock')
  })
})
