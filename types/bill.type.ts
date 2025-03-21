export interface IBill {
  id: number;
  type: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
}
