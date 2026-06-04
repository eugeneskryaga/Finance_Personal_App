import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/query-core";
import { getTransactions } from "../../api/transactionsApi";
import type { SortOrder, TransactionResponse } from "../../types/types";
import { useState } from "react";
import { TransactionsList } from "../TransactionsList/TransactionsList";
import { TransactionsListControls } from "../TransactionsListControls/TransactionsListControls";
import { useDebounce } from "use-debounce";
import { MdAdd } from "react-icons/md";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import { Modal } from "../Modal/Modal";

import css from "./Dashboard.module.css";

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      TransactionResponse,
      Error,
      InfiniteData<TransactionResponse>,
      ["transactions", string],
      number
    >({
      queryKey: ["transactions", debouncedSearch],
      queryFn: ({ pageParam = 1 }) =>
        getTransactions({
          perPage: 10,
          search: debouncedSearch,
          page: pageParam,
        }),
      getNextPageParam: (lastPage, pages) =>
        lastPage.isNextPageExists ? pages.length + 1 : undefined,
      initialPageParam: 1,
      retry: 1,
    });

  const handleModalBtn = () => {
    setIsModalOpen(prev => !prev);
  };

  const transactions = data?.pages.flatMap(page => page.transactions) ?? [];

  return (
    <div className={css.container}>
      <TransactionsListControls
        search={search}
        setSearch={setSearch}
      />
      {transactions.length > 0 && (
        <TransactionsList
          transactions={transactions}
          loadMore={fetchNextPage}
          hasNextPage={Boolean(hasNextPage)}
          isLoadingMore={isFetchingNextPage}
        />
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
