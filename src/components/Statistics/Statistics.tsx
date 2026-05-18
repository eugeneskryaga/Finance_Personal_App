import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../api/transactionsApi";
import {
  calculateTotal,
  capitalize,
  getCurrentMonth,
  getCurrentMonthTransactions,
  getPreviousMonth,
  getPreviousMonthName,
  getPreviousMonthTransactions,
  getPreviousYear,
} from "../../utils/utils";

import css from "./Statistics.module.css";
import { StatisticsComparison } from "../StatisticsComparison/StatisticsComparison";
import { Notification } from "../Notification/Notification";
import { useMemo } from "react";

export const Statistics = () => {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allTransactions"],
    queryFn: fetchTransactions,
  });

  const currentDate = new Date();

  const currentMonth = getCurrentMonth(currentDate);

  const previousMonth = getPreviousMonth(currentDate);

  const previousYear = getPreviousYear(currentDate);

  const previousMonthName = getPreviousMonthName(previousYear, previousMonth);

  const currentMonthTransactions = useMemo(
    () => getCurrentMonthTransactions(transactions ?? [], currentDate),
    [transactions],
  );

  const previousMonthTransactions = useMemo(
    () =>
      getPreviousMonthTransactions(
        transactions ?? [],
        previousMonth,
        previousYear,
      ),
    [transactions],
  );

  const currentMonthTotal = useMemo(
    () => calculateTotal(currentMonthTransactions),
    [currentMonthTransactions],
  );

  const previousMonthTotal = useMemo(
    () => calculateTotal(previousMonthTransactions),
    [previousMonthTransactions],
  );

  const currentMonthTotalFiltered = useMemo(() => {
    const { income, totalExpenses, ...rest } = currentMonthTotal;
    return rest;
  }, [currentMonthTotal]);

  if (isError) {
    return <Notification message="Oops, it`s an error" />;
  }

  if (isLoading) {
    return <Notification message="Loading..." />;
  }

  return currentMonthTotal ? (
    <section className={css.container}>
      <div>
        <h1>Total for {currentMonth}</h1>
        <p>
          Total income: <span>{currentMonthTotal.income}</span>
        </p>
        <p>
          Total expenses: <span>{currentMonthTotal.totalExpenses}</span>
        </p>
        <p>
          Balance:{" "}
          <span>
            {currentMonthTotal.income - currentMonthTotal.totalExpenses}
          </span>
        </p>
      </div>
      <div>
        <h2>Expenses for {currentMonth}</h2>
        {Object.entries(currentMonthTotalFiltered)
          .sort(([, a], [, b]) => b - a)
          .map(expense => (
            <label key={expense[0]}>
              {capitalize(expense[0])}:
              <progress
                max={currentMonthTotal.totalExpenses}
                value={expense[1]}
                className={css.progressBar}
              >
                {expense[1]}
              </progress>
              {expense[1]}
            </label>
          ))}
      </div>

      {previousMonthTotal ? (
        <StatisticsComparison
          currentMonthTotal={currentMonthTotal}
          previousMonthTotal={previousMonthTotal}
          previousMonthName={previousMonthName}
        />
      ) : (
        <Notification message={`No transactions for ${previousMonthName}`} />
      )}
    </section>
  ) : (
    <Notification message="No transactions for current month" />
  );
};
