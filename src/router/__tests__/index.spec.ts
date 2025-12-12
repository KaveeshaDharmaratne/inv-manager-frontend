import { describe, it, expect } from 'vitest'
import router from '../index'

describe('Router Configuration', () => {
  it('is initialized correctly', () => {
    expect(router).toBeDefined()
  })

  it('has no routes defined initially', () => {
    const routes = router.getRoutes()
    expect(routes).toHaveLength(0)
  })
})
