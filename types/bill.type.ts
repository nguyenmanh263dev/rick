export interface IBill {
  id: number;
  type: string;
  amount: number;
  date: Date;
  description: string;
  categoryId: number;
}

export interface IBillCalendar {
  totalAmount: number;
  date: string;
  items: IBill;
}
