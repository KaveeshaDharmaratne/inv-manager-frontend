import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DamagedReturnsView from '@/views/DamagedReturnsView.vue'
import { useDamageStore } from '@/stores/damage'

describe('DamagedReturnsView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the page title correctly', () => {
    const wrapper = mount(DamagedReturnsView)
    expect(wrapper.text()).toContain('Damaged Returns')
  })

  it('displays loading state initially', async () => {
    const wrapper = mount(DamagedReturnsView)
    const store = useDamageStore()

    store.isLoading = true
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Loading data...')
  })

  it('renders table rows based on store data', async () => {
    const wrapper = mount(DamagedReturnsView)
    const store = useDamageStore()

    store.items = [
      {
        id: '1',
        date: '2023-10-27',
        type: 'Damage',
        dealer: 'Test Dealer',
        returnNoteNo: 'RN-999',
        code: 'CODE-1',
        description: 'Broken',
        qty: 5,
      },
    ]

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Test Dealer')
    expect(wrapper.text()).toContain('RN-999')
  })

  it('updates search query in store when input changes', async () => {
    const wrapper = mount(DamagedReturnsView)
    const store = useDamageStore()
    const input = wrapper.find('input[placeholder*="Find by Note No"]')
    await input.setValue('RN-2023')
    expect(store.searchQuery).toBe('RN-2023')
  })
})
