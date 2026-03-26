export interface GdnItem {
  id: string
  code: string
  description: string
  quantity: number
}

export interface GdnFormState {
  date: string
  gdnNumber: string
  items: GdnItem[]
  dealer?: string
}
