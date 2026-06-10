import { useState } from "react";
import Calendar from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import type { Value } from "react-calendar/dist/shared/types.js";
import { Stats } from "../Stats/Stats";
import {
  convertToMidnightString,
  getFirstDayOfCurrentMonth,
} from "../../utils/utils";

import "./сustom-calendar.css";
import css from "./StatsCalendar.module.css";
import { Notification } from "../Notification/Notification";

export const StatsCalendar = () => {
  const [dateRange, setDateRange] = useState<Value>([
    getFirstDayOfCurrentMonth(),
    new Date(),
  ]);
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
    <div className={css.container}>
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
      {dateRange && response && response.totalTransactions > 0 ? (
        <Stats statistics={response.statistics} />
      ) : (
        response && (
          <Notification message="There is no transactions for this period" />
        )
      )}
    </div>
  );
};
