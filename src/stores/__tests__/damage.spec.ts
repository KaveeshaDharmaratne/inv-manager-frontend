import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useDamageStore } from '../damage'

describe('Damage Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with correct default values', () => {
    const store = useDamageStore()
    expect(store.items).toEqual([])
    expect(store.searchQuery).toBe('')
    expect(store.isLoading).toBe(false)
  })

  it('fetches items and updates state', async () => {
    const store = useDamageStore()
    const promise = store.fetchItems()
    expect(store.isLoading).toBe(true)
    vi.advanceTimersByTime(500)
    await promise
    expect(store.isLoading).toBe(false)
    expect(store.items.length).toBeGreaterThan(0)
  })

  it('filters items by search query (Case Insensitive)', () => {
    const store = useDamageStore()
    store.items = [
      { id: '1', date: '2023-10-27', type: 'Damage', dealer: 'Alpha', returnNoteNo: 'RN-001', code: 'A1', description: 'Desc 1', qty: 1 },
      { id: '2', date: '2023-10-26', type: 'Damage', dealer: 'Beta', returnNoteNo: 'RN-002', code: 'B2', description: 'Desc 2', qty: 1 },
    ]
    store.searchQuery = 'alpha'
    expect(store.filteredItems).toHaveLength(1)
    expect(store.filteredItems[0]?.dealer).toBe('Alpha')
  })

  it('filters items by code', () => {
    const store = useDamageStore()
    store.items = [
      { id: '1', date: '', type: 'Damage', dealer: '', returnNoteNo: '', code: 'HDD-500', description: '', qty: 1 },
      { id: '2', date: '', type: 'Damage', dealer: '', returnNoteNo: '', code: 'SSD-250', description: '', qty: 1 },
    ]

    store.searchQuery = 'SSD'
    expect(store.filteredItems).toHaveLength(1)
    expect(store.filteredItems[0]?.code).toBe('SSD-250')
  })
})
