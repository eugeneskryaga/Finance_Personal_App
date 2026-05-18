import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../api/transactionsApi";
import { TodayTransactions } from "../TodayTransactions/TodayTransactions";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Notification } from "../Notification/Notification";
import { getCurrentTransaction } from "../../utils/utils";

import css from "./Today.module.css";

export const Today = () => {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allTransactions"],
    queryFn: fetchTransactions,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTransaction = getCurrentTransaction(transactions || []);

  const handleModalBtn = () => {
    setIsModalOpen(prev => !prev);
  };

  if (isError) {
    return <Notification message="Oops, it`s an error" />;
  }

  if (isLoading) {
    return <Notification message="Loading..." />;
  }

  return (
    <section className={css.container}>
      {currentTransaction ? (
        <>
          <h1 className={css.title}>
            BALANCE:{" "}
            {currentTransaction.income - currentTransaction.totalExpenses}
          </h1>
          <strong className={css.note}>{currentTransaction?.note}</strong>
          <div className={css.innerContainer}>
            <div className={css.income}>
              <p>{currentTransaction.income}</p>
              <strong>Income</strong>
            </div>
            <div className={css.expenses}>
              <p>{currentTransaction.totalExpenses}</p>
              <strong>Expenses</strong>
            </div>
          </div>
          <TodayTransactions transaction={currentTransaction} />
        </>
      ) : (
        <Notification message="There is no transactions for today" />
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
    </section>
  );
};
