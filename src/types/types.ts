export interface Expenses {
  road: number;
  meal: number;
  habits: number;
  living: number;
  entertainment: number;
}

export interface Transaction {
  id: string;
  income: number;
  totalExpenses: number;
  expenses: Expenses;
  note: string;
  date: string;
}

export type Order = "asc" | "desc";
