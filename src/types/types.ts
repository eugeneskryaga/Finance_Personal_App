export interface Expenses {
  total: number;
  road: number;
  meal: number;
  habits: number;
  living: number;
  entertainment: number;
}

export interface Transaction {
  id: string;
  income: number;
  expenses: Expenses;
  note: string;
  date: string;
}
