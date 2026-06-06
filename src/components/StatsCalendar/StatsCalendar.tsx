import { useState } from "react";
import Calendar from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { Notification } from "../Notification/Notification";
import { TransactionsList } from "../TransactionsList/TransactionsList";
import type { Value } from "react-calendar/dist/shared/types.js";
import { TransactionForm } from "../TransactionForm/TransactionForm";
import { Stats } from "../Stats/Stats";
import { Modal } from "../Modal/Modal";
import {
  convertToMidnightString,
  getFirstDayOfCurrentMonth,
  toLocaleISO,
} from "../../utils/utils";

import "./сustom-calendar.css";
import css from "./StatsCalendar.module.css";

export const StatsCalendar = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [dateRange, setDateRange] = useState<Value>(null);
  const [startDate, setStartDate] = useState<string>(
    convertToMidnightString(getFirstDayOfCurrentMonth()),
  );
  const [endDate, setEndDate] = useState<string>(
    convertToMidnightString(new Date()),
  );

  const { data: response } = useQuery({
    queryKey: ["transactions", dateRange],
    queryFn: () =>
      getTransactions({
        perPage: 30,
        startDate,
        endDate,
      }),
    retry: 1,
  });

  const handleRangeChange = (nextValue: Value) => {
    setDateRange(nextValue);
    if (Array.isArray(nextValue) && nextValue[0] && nextValue[1]) {
      const [start, end] = nextValue;
      setStartDate(convertToMidnightString(start));
      setEndDate(convertToMidnightString(end));
    }
  };

  return (
    <>
      <div>
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
            initialDate={toLocaleISO(new Date(startDate))}
          />
        </Modal>
      )}
      {startDate === endDate && response && response.transactions.length > 0 ? (
        <TransactionsList
          transactions={response?.transactions}
          style={css.scrollFix}
        />
      ) : startDate === endDate ? (
        <Notification message="There is no transactions for this day" />
      ) : null}
      {startDate !== endDate && response && (
        <Stats statistics={response?.statistics} />
      )}
    </>
  );
};
