import { useState } from "react";
import Calendar from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { Notification } from "../Notification/Notification";
import { TransactionsList } from "../TransactionsList/TransactionsList";
import { Modal } from "../Modal/Modal";
import { TransactionForm } from "../TransactionForm/TransactionForm";

import "./сustom-calendar.css";
import css from "./Stats.module.css";

export const Stats = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryKey: ["transactions", date],
    queryFn: () =>
      getTransactions({
        perPage: 20,
        startDate: date,
        endDate: date,
      }),
    enabled: !!date,
  });

  return (
    <>
      <div>
        <Calendar
          onChange={value => {
            setDate(value as Date);
            setIsModalOpen(true);
          }}
          value={date}
          locale="en-US"
          showNeighboringMonth={false}
          selectRange={false}
          maxDate={new Date()}
        />
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {isLoading ? (
            <Notification
              message="Loading ..."
              isLoading
            />
          ) : response && response.transactions.length > 0 ? (
            <div className={css.transactionsListContainer}>
              <TransactionsList transactions={response.transactions} />
            </div>
          ) : (
            <div>
              <Notification message="There is no transactions for this day" />
              <TransactionForm
                setIsModalOpen={setIsModalOpen}
                initialDate={new Date(date as Date).toISOString()}
              />
            </div>
          )}
        </Modal>
      )}
    </>
  );
};
