import { useQuery } from "@tanstack/react-query";
import css from "./Today.module.css";
import { fetchTransactions } from "../../api/transactionsApi";
import { TodayTransactions } from "../TodayTransactions/TodayTransactions";
import { TransactionForm } from "../TransactionForm/TransactionForm";

export const Today = () => {
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => await fetchTransactions(),
  });

  const currentDate = new Date().toLocaleDateString();

  const currentTransaction = transactions?.filter(
    transaction =>
      new Date(transaction.date).toLocaleDateString() !== currentDate,
  )[0];

  let income = 0;
  let expenses = 0;
  let balance = 0;

  if (currentTransaction) {
    income = currentTransaction.income;
    expenses = currentTransaction.expenses.total;
    balance = income - expenses;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>BALANCE: {balance}</h1>
      <div className={css.innerContainer}>
        <div className={css.income}>
          <p>{income}</p>
          <strong>Income</strong>
        </div>
        <div className={css.expenses}>
          <p>{expenses}</p>
          <strong>Expenses</strong>
        </div>
      </div>
      {currentTransaction ? (
        <TodayTransactions transaction={currentTransaction} />
      ) : (
        <p>No transactions yet</p>
      )}
      {currentTransaction ? (
        <TransactionForm id={currentTransaction.id} />
      ) : (
        <TransactionForm />
      )}
    </div>
  );
};
