type TransactionType = "income" | "expense";

type TransactionCategories =
  | "living"
  | "food"
  | "habits"
  | "road"
  | "entertainment"
  | "hobbies"
  | "subscriptions"
  | "donations"
  | "shopping"
  | "salary"
  | "freelance"
  | "gift";

type Order = "asc" | "desc";

export interface Transaction {
  id?: string;
  type: TransactionType;
  category: TransactionCategories;
  amount: number;
  note?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueryParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: Order;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}
