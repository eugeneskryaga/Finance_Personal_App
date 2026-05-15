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

export interface TransactionsTotal {
  income: number;
  totalExpenses: number;
  living: number;
  meal: number;
  habits: number;
  road: number;
  entertainment: number;
}

export type Order = "asc" | "desc";
