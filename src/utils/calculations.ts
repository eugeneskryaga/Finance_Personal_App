import type { Transaction } from "../types/types";

export const calculateTotal = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      acc.income += transaction.income;
      acc.totalExpenses += transaction.totalExpenses;
      acc.road += transaction.expenses.road;
      acc.food += transaction.expenses.food;
      acc.habits += transaction.expenses.habits;
      acc.living += transaction.expenses.living;
      acc.entertainment += transaction.expenses.entertainment;

      return acc;
    },
    {
      income: 0,
      totalExpenses: 0,
      living: 0,
      food: 0,
      habits: 0,
      road: 0,
      entertainment: 0,
    },
  );
};

export const getCurrentMonthTransactions = (
  transactions: Transaction[],
  currentDate: Date,
) =>
  transactions?.filter(transaction => {
    const date = new Date(transaction.date);
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  }) || [];

export const getPreviousMonthTransactions = (
  transactions: Transaction[],
  previousMonth: number,
  previousYear: number,
) =>
  transactions?.filter(transaction => {
    const date = new Date(transaction.date);
    return (
      date.getMonth() === previousMonth && date.getFullYear() === previousYear
    );
  }) || [];

export const getCurrentTransaction = (transactions: Transaction[]) => {
  return transactions?.find(
    transaction =>
      new Date(transaction.date).toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0],
  );
};

export const getCurrentMonth = (currentDate: Date) =>
  currentDate.toLocaleString("en-US", {
    month: "long",
  });

export const getPreviousMonth = (currentDate: Date) =>
  currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;

export const getPreviousYear = (currentDate: Date) =>
  currentDate.getMonth() === 0
    ? currentDate.getFullYear() - 1
    : currentDate.getFullYear();

export const getPreviousMonthName = (
  previousYear: number,
  previousMonth: number,
) =>
  new Date(previousYear, previousMonth).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
