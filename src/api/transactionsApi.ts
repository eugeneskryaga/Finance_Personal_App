import axios from "axios";
import type { Transaction } from "../types/types";

const BASE_URL = "https://69ed1d12af4ff533142ba1f8.mockapi.io/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchTransactions = async () => {
  return (await api.get<Transaction[]>("/income")).data;
};

export const fetchPaginatedTransactions = async (page: number) => {
  return (
    await api.get<Transaction[]>("/income", {
      params: {
        page,
        limit: 3,
        sortBy: "date",
        order: "desc",
      },
    })
  ).data;
};

export const addTransaction = async (newTransaction: Transaction) => {
  return (await api.post<Transaction>("/income", newTransaction)).data;
};

export const editTransaction = async (
  id: Transaction["id"],
  newTransaction: Transaction,
) => {
  return (await api.put<Transaction>(`/income/${id}`, newTransaction)).data;
};
