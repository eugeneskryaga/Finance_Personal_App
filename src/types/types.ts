export type SortOrder = "asc" | "desc";

export type Type = "income" | "expense";

export interface Transaction {
  _id: string;
  type: Type;
  category: string;
  amount: number;
  note?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFormValues {
  type: Type;
  category: string;
  amount: string;
  note: string;
  date?: string;
}

export interface CreateTransaction {
  type: Type;
  category: string;
  amount: number;
  note?: string;
  date: string | undefined;
}

export interface PatchTransaction {
  type?: Type;
  category?: string;
  amount?: number;
  note?: string;
  date?: string;
}

export interface QueryParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface TransactionResponse {
  transactions: Transaction[];
  isNextPageExists: boolean;
  totalPages: number;
  totalTransactions: number;
}
