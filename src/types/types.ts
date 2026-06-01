type Order = "asc" | "desc";

export interface Transaction {
  _id?: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  note?: string;
  date?: string;
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
