import { LOAN_TYPE } from "./enum";

export interface ILoan {
  id: string;
  type: LOAN_TYPE;
  amount: number;
  title: string;
  duaTo: Date;
}
