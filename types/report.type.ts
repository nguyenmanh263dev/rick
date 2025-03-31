export interface IReportGeneral {
  currentMonthTotalAmount: number;
  previousMonthTotalAmount: number;
}

export interface IReportByCategory {
  categoryId: number;
  totalAmount: number;
}

export interface IReportByPeriod {
  date: string;
  totalAmount: number;
}
