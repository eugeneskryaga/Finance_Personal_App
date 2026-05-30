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
  _id?: string;
  type: string;
  category: TransactionCategories;
  amount: number;
  note?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface TransactionResponse {
  transactions: Transaction[];
  isNextPageExists: boolean;
  totalPage: number;
  totalTransactions: number;
}
