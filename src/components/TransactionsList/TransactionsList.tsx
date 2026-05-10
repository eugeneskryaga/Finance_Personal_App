import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPaginatedTransactions } from "../../api/transactionsApi";
import { TransactionsListControls } from "../TransactionsListControls/TransactionsListControls";

import css from "./TransactionsList.module.css";
import { Modal } from "../Modal/Modal";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import type { Order, Transaction } from "../../types/types";
import { useDebounce } from "use-debounce";

export const TransactionsList = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [order, setOrder] = useState<Order>("desc");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: transactions } = useQuery({
    queryKey: ["transactions", page, debouncedSearch, sort, order],
    queryFn: () =>
      fetchPaginatedTransactions(page, debouncedSearch, sort, order),
    placeholderData: previousTransactions => previousTransactions,
    retry: 1,
  });

  const handleEditTransaction = (id: Transaction["id"]) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  return (
    <>
      <TransactionsListControls
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
      />
      {transactions && transactions.length > 0 ? (
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
                      Balance: {transaction.income - transaction.totalExpenses}
                    </p>
                    <p>Income: {transaction.income}</p>
                    <p>Expenses: {transaction.totalExpenses}</p>
                  </div>
                </div>
                <button onClick={() => handleEditTransaction(transaction.id)}>
                  Edit transaction
                </button>
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
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(prev => !prev)}>
              <TransactionForm
                id={selectedId}
                setIsModalOpen={setIsModalOpen}
              />
            </Modal>
          )}
        </>
      ) : (
        <p>There is no transactions</p>
      )}
    </>
  );
};
