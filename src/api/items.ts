import apiClient from './axios'

export interface ItemDTO {
  code: string
  description?: string | null
  quantity: number
}

export const fetchItems = async (): Promise<ItemDTO[]> => {
  const res = await apiClient.get('/api/v1/items')
  return res.data
}

export default { fetchItems }
