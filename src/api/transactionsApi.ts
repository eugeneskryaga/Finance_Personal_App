import axios from "axios";
import type {
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

export const postTransaction = async (transaction: Transaction) => {
  const { data } = await api.post("/transactions", transaction);
  return data;
};
