import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPaginatedTransactions } from "../../api/transactionsApi";

import css from "./TransactionsList.module.css";

export const TransactionsList = () => {
  const [page, setPage] = useState(1);

  const { data: transactions } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => fetchPaginatedTransactions(page),
    placeholderData: previousTransactions => previousTransactions,
  });

  return (
    transactions && (
      <>
        <ul className={css.list}>
          {transactions?.map(transaction => (
            <li key={transaction.id}>
              <strong>{transaction.date}</strong>
              <div className={css.main}>
                <div>
                  <p>Living: {transaction.expenses.living}</p>
                  <p>Meal: {transaction.expenses.meal}</p>
                  <p>Habits: {transaction.expenses.habits}</p>
                  <p>Road: {transaction.expenses.road}</p>
                  <p>Entertainment: {transaction.expenses.entertainment}</p>
                </div>
                <div>
                  <p>{transaction.note}</p>
                  <p>
                    Balance: {transaction.income - transaction.expenses.total}
                  </p>
                  <p>Income: {transaction.income}</p>
                  <p>Expenses: {transaction.expenses.total}</p>
                </div>
              </div>
              <button>Edit transaction</button>
            </li>
          ))}
        </ul>
        <div className={css.controls}>
          {page !== 1 && (
            <button onClick={() => setPage(prev => prev - 1)}>Prev</button>
          )}
          <p>{page}</p>
          {transactions.length === 3 && (
            <button onClick={() => setPage(prev => prev + 1)}>Next</button>
          )}
        </div>
      </>
    )
  );
};
