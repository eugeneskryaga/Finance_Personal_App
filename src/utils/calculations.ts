import type { Transaction } from "../types/types";

export const calculateTotal = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      acc.income += transaction.income;
      acc.totalExpenses += transaction.totalExpenses;
      acc.road += transaction.expenses.road;
      acc.meal += transaction.expenses.meal;
      acc.habits += transaction.expenses.habits;
      acc.living += transaction.expenses.living;
      acc.entertainment += transaction.expenses.entertainment;

      return acc;
    },
    {
      income: 0,
      totalExpenses: 0,
      living: 0,
      meal: 0,
      habits: 0,
      road: 0,
      entertainment: 0,
    },
  );
};
