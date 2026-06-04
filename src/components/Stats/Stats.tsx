import { useState } from "react";
import Calendar from "react-calendar";
import type { Value } from "react-calendar/dist/shared/types.js";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { Notification } from "../Notification/Notification";
import { TransactionsList } from "../TransactionsList/TransactionsList";
import { Modal } from "../Modal/Modal";
import { TransactionForm } from "../TransactionForm/TransactionForm";

import "./сustom-calendar.css";

export const Stats = () => {
  const [date, setDate] = useState<Value>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response } = useQuery({
    queryKey: ["transactionsByDate", date],
    queryFn: () =>
      getTransactions({
        perPage: 20,
        startDate: date,
        endDate: date,
      }),
  });

  const handleDateChange = (value: any) => {
    setDate(value as Date | null);
  };
  return (
    <>
      <div>
        <Calendar
          onChange={value => {
            setIsModalOpen(true);
            handleDateChange(value);
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
          {response && response.transactions.length > 0 ? (
            <div>
              <TransactionsList transactions={response.transactions} />
            </div>
          ) : (
            <div>
              <Notification message="There is no transactions for this day" />
              <TransactionForm
                setIsModalOpen={setIsModalOpen}
                initialDate={date}
              />
            </div>
          )}
        </Modal>
      )}
    </>
  );
};
