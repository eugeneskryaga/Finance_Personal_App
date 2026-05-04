import { useQuery } from "@tanstack/react-query";
import css from "./Today.module.css";
import { fetchTransactions } from "../../api/transactionsApi";
import { TodayTransactions } from "../TodayTransactions/TodayTransactions";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

export const Today = () => {
  const { data: transactions } = useQuery({
    queryKey: ["allTransactions"],
    queryFn: async () => await fetchTransactions(),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTransaction = transactions?.find(
    transaction =>
      new Date(transaction.date).toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0],
  );

  let income = 0;
  let expenses = 0;
  let balance = 0;

  if (currentTransaction) {
    income = currentTransaction.income;
    expenses = currentTransaction.expenses.total;
    balance = income - expenses;
  }

  const handleModalBtn = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>BALANCE: {balance}</h1>
      <strong className={css.note}>{currentTransaction?.note}</strong>
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
      <button
        onClick={handleModalBtn}
        className={css.open_modal_btn}
      >
        <span className={css.btn_icon}>+</span>
      </button>
      {isModalOpen && (
        <Modal onClose={handleModalBtn}>
          {currentTransaction ? (
            <TransactionForm
              id={currentTransaction.id}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <TransactionForm setIsModalOpen={setIsModalOpen} />
          )}
        </Modal>
      )}
    </div>
  );
};
