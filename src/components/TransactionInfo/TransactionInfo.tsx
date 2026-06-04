import type { Transaction } from "../../types/types";
import { capitalize, formatDate, getDateTime } from "../../utils/utils";
import { Notification } from "../Notification/Notification";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../../api/transactionsApi";
import { useState } from "react";
import { TransactionForm } from "../TransactionForm/TransactionForm";

import css from "./TransactionInfo.module.css";

interface Props {
  transaction: Transaction;
  onModalClose: () => void;
}

export const TransactionInfo = ({ transaction, onModalClose }: Props) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      await queryClient.invalidateQueries({ queryKey: ["transactionsByDate"] });
      onModalClose();
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id: Transaction["_id"]) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <>
      <div className={isEditing ? css.none : css.info}>
        <div className={css.date}>
          <p>
            {formatDate(transaction.date)}, {getDateTime(transaction.date)}
          </p>
        </div>
        <div className={css.category}>
          <p>
            {transaction.type === "income" ? (
              <MdTrendingUp className={`${css.icon} ${css.income}`} />
            ) : (
              <MdTrendingDown className={`${css.icon} ${css.expense}`} />
            )}
          </p>
          <p>{capitalize(transaction.category)}</p>
          <p className={css.amount}>
            {transaction.type === "income" ? (
              <span className={css.span_income}>+ {transaction.amount}</span>
            ) : (
              <span className={css.span_expense}>- {transaction.amount}</span>
            )}
          </p>
        </div>
        {transaction.note ? (
          <div className={css.note}>
            <p>Note : {transaction.note}</p>
          </div>
        ) : (
          <Notification message="There is no note for this transaction" />
        )}
        <div className={css.buttons}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => handleDelete(transaction._id)}>Delete</button>
          <button onClick={onModalClose}>Close</button>
        </div>
      </div>
      {isEditing && (
        <TransactionForm
          transaction={transaction}
          setIsModalOpen={onModalClose}
        />
      )}
    </>
  );
};
