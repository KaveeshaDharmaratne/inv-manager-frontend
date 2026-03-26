import apiClient from './axios'

export interface DealerSearchResult {
  id: string
  name: string
}

export async function searchDealers(search: string, limit = 10) {
  const res = await apiClient.get('/api/v1/dealers', {
    params: { search, limit },
  })
  // response shape: { data: [{...}], meta: { ... } }
  return res.data?.data ?? []
}

export default { searchDealers }
