export interface ReturnItem {
  id: string;
  code: string;
  description: string;
  qty: number | null;
}

export interface ReturnFormState {
  date: string;
  type: 'Good' | 'Damage' | 'Expired';
  dealer: string;
  returnNoteNo: string;
  items: ReturnItem[];
}
