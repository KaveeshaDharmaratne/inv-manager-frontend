export interface DamageItem {
  id: string
  date: string
  type: 'Damage' | 'Lost' | 'Expired'
  dealer: string
  returnNoteNo: string
  code: string
  description: string
  qty: number
}
