type ExpenseCategory = "road" | "meal" | "habits" | "living" | "entertainment";

export interface Income {
  id: string;
  amount: number;
  note: string;
  date: string;
}

export interface Expense extends Income {
  category: ExpenseCategory;
}
