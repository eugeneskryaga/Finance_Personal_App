import axios from "axios";
import type {
  CreateTransaction,
  PatchTransaction,
  QueryParams,
  Transaction,
  TransactionResponse,
} from "../types/types";

const BASE_URL = "https://finance-app-server-gt1n.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getTransactions = async (params: QueryParams) => {
  const { data } = await api.get<TransactionResponse>("/transactions", {
    params,
  });

  return data;
};

export const postTransaction = async (transaction: CreateTransaction) => {
  const { data } = await api.post("/transactions", transaction);
  return data;
};

export const patchTransaction = async (
  id: Transaction["_id"],
  newTransaction: PatchTransaction,
) => {
  const { data } = await api.patch(`/transactions/${id}`, newTransaction);
  return data;
};

export const deleteTransaction = async (id: Transaction["_id"]) => {
  const { data } = await api.delete(`/transactions/${id}`);
  return data;
};
