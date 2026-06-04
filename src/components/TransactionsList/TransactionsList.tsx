import type { Transaction } from "../../types/types";
import { capitalize, formatDate, getDateTime } from "../../utils/utils";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import { TransactionInfo } from "../TransactionInfo/TransactionInfo";
import { Notification } from "../Notification/Notification";

import css from "./TransactionsList.module.css";

interface Props {
  transactions: Transaction[];
  loadMore?: () => Promise<unknown>;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
  onSelectTransaction?: (transaction: Transaction) => void;
}

export const TransactionsList = ({
  transactions,
  loadMore,
  hasNextPage,
  isLoadingMore,
}: Props) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMore || !hasNextPage || !rootRef.current || !sentinelRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: rootRef.current,
        rootMargin: "50px",
      },
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasNextPage]);

  const onModalClose = () => {
    setSelectedTransaction(null);
  };

  return (
    <>
      <div
        className={css.scrollWrapper}
        ref={rootRef}
      >
        {
          <ul className={css.list}>
            {transactions.map(transaction => (
              <li
                key={transaction._id}
                className={css.li}
                onClick={() => setSelectedTransaction(transaction)}
              >
                <p>
                  {transaction.type === "income" ? (
                    <MdTrendingUp className={`${css.icon} ${css.income}`} />
                  ) : (
                    <MdTrendingDown className={`${css.icon} ${css.expense}`} />
                  )}
                </p>
                <div className={css.date}>
                  <div className={css.dateTime}>
                    <p>{formatDate(transaction.date)}</p>
                    <p>{getDateTime(transaction.date)}</p>
                  </div>
                  <p>{capitalize(transaction.category)}</p>
                </div>
                <p className={css.amount}>
                  {transaction.type === "income" ? (
                    <span className={`${css.span} ${css.span_income}`}>
                      + {transaction.amount}
                    </span>
                  ) : (
                    <span className={css.span}>- {transaction.amount}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        }
        <div
          ref={sentinelRef}
          className={css.sentinel}
        />
      </div>
      {isLoadingMore && <Notification message="Loading..." />}
      {selectedTransaction && (
        <Modal onClose={onModalClose}>
          <TransactionInfo
            transaction={selectedTransaction}
            onModalClose={onModalClose}
          />
        </Modal>
      )}
    </>
  );
};
