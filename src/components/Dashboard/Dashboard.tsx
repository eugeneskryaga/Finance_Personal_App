import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { useState } from "react";
import { TransactionsList } from "../TransactionsList/TransactionsList";
import { TransactionsListControls } from "../TransactionsListControls/TransactionsListControls";
import { useDebounce } from "use-debounce";
import { MdAdd } from "react-icons/md";

import css from "./Dashboard.module.css";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import { Modal } from "../Modal/Modal";

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: response } = useQuery({
    queryKey: ["transactions", page, debouncedSearch],
    queryFn: () =>
      getTransactions({ page, perPage: 5, search: debouncedSearch }),
    retry: 1,
  });

  const handleModalBtn = () => {
    setIsModalOpen(prev => !prev);
  };

  const transactions = response?.transactions ?? [];

  return (
    <div>
      <TransactionsListControls
        search={search}
        setSearch={setSearch}
      />
      {transactions.length > 0 && (
        <TransactionsList transactions={transactions} />
      )}
      <button
        className={css.modal_btn}
        onClick={handleModalBtn}
      >
        <MdAdd className={css.icon} />
      </button>
      {isModalOpen && (
        <Modal onClose={handleModalBtn}>
          <TransactionForm setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </div>
  );
};
