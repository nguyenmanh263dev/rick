import { ACTIVITY } from "./enum";

export interface ILoan {
  id: string;
  type: ACTIVITY;
  amount: number;
  title: string;
  duaTo: Date;
  status: string;
}
