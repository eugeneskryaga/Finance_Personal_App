import { useState } from "react";
import Calendar from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { Notification } from "../Notification/Notification";
import { TransactionsList } from "../TransactionsList/TransactionsList";
import type { Value } from "react-calendar/dist/shared/types.js";

import "./сustom-calendar.css";
import css from "./Stats.module.css";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import { Modal } from "../Modal/Modal";

export const Stats = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [dateRange, setDateRange] = useState<Value>(null);
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now()).toISOString(),
  );
  const [endDate, setEndDate] = useState<string>("");

  const { data: response } = useQuery({
    queryKey: ["transactions", dateRange],
    queryFn: () =>
      getTransactions({
        perPage: 20,
        startDate,
        endDate,
      }),
    retry: 1,
  });

  const handleRangeChange = (nextValue: Value) => {
    setDateRange(nextValue);
    if (Array.isArray(nextValue) && nextValue[0] && nextValue[1]) {
      const [start, end] = nextValue;

      const convertToMidnightString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}T00:00:00`;
      };

      setStartDate(convertToMidnightString(start));
      setEndDate(convertToMidnightString(end));
    }
  };

  return (
    <>
      <div className={css.calendarContainer}>
        <Calendar
          onChange={handleRangeChange}
          value={dateRange}
          locale="en-US"
          showNeighboringMonth={false}
          selectRange={true}
          maxDate={new Date()}
          minDate={new Date(2026, 4, 1)}
          prev2Label={null}
          next2Label={null}
        />
      </div>
      {startDate === endDate && (
        <button
          onClick={() => setIsCreating(true)}
          className={css.addBtn}
        >
          Add
        </button>
      )}
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <TransactionForm
            setIsModalOpen={setIsCreating}
            initialDate={startDate}
          />
        </Modal>
      )}
      {startDate === endDate && response && response.transactions.length > 0 ? (
        <TransactionsList transactions={response?.transactions} />
      ) : startDate === endDate ? (
        <Notification message="There is no transactions for this day" />
      ) : null}
      {startDate !== endDate && (
        <Notification message="Тут будет блок статистики" />
      )}
    </>
  );
};
