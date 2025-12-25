import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useReturnStore } from '@/stores/returns'

describe('Return Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with one empty item', () => {
    const store = useReturnStore()
    expect(store.form.items.length).toBe(1)
    expect(store.form.type).toBe('Good')
  })

  it('adds a new item', () => {
    const store = useReturnStore()
    store.addItem()
    expect(store.form.items.length).toBe(2)
    expect(store.form.items[1]?.qty).toBeNull()
  })

  it('removes an item by id', () => {
    const store = useReturnStore()
    const firstItemId = store.form.items[0]?.id
    store.addItem()
    if (firstItemId) store.removeItem(firstItemId)
    expect(store.form.items.length).toBe(1)
    expect(store.form.items[0]?.id).not.toBe(firstItemId)
  })
})
