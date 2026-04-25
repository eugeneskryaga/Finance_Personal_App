import axios from "axios";
import type { Expense, Income } from "../types/types";

const BASE_URL = "https://69ed1d12af4ff533142ba1f8.mockapi.io/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getIncome = async () => {
  const { data } = await api.get<Income[]>("/income");
  return data;
};

export const getExpense = async () => {
  const { data } = await api.get<Expense[]>("/expense");
  return data;
};
