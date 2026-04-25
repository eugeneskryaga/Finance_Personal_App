import { create } from "zustand";
import type { Expense, Income } from "../types/types";

interface TransactionStore {
  income: Income[];
  expense: Expense[];
  addIncome: () => {};
  addExpense: () => {};
}

export const useTransactionStore = create<TransactionStore>();
