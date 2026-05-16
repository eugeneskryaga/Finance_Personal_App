import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../api/transactionsApi";
import {
  calculateTotal,
  getCurrentMonth,
  getCurrentMonthTransactions,
  getPreviousMonth,
  getPreviousMonthName,
  getPreviousMonthTransactions,
  getPreviousYear,
} from "../../utils/calculations";

import css from "./Statistics.module.css";
import { StatisticsComparison } from "../StatisticsComparison/StatisticsComparison";
import { Notification } from "../Notification/Notification";

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

  const currentMonthTransactions = getCurrentMonthTransactions(
    transactions ?? [],
    currentDate,
  );

  const previousMonthTransactions = getPreviousMonthTransactions(
    transactions ?? [],
    previousMonth,
    previousYear,
  );

  const currentMonthTotal = calculateTotal(currentMonthTransactions);

  const previousMonthTotal = calculateTotal(previousMonthTransactions);

  if (isError) {
    return <Notification message="Opps, it`s an error" />;
  }

  if (isLoading) {
    return <Notification message="Loading..." />;
  }

  return currentMonthTotal ? (
    <section className={css.container}>
      <div>
        <h1>Total for {currentMonth}</h1>
        <p>Total income: {currentMonthTotal.income}</p>
        <p>Total expenses: {currentMonthTotal.totalExpenses}</p>
        <p>
          Balance: {currentMonthTotal.income - currentMonthTotal.totalExpenses}
        </p>
      </div>
      <div>
        <h2>Expenses for {currentMonth}</h2>
        <p>Living: {currentMonthTotal.living}</p>
        <p>Meal: {currentMonthTotal.food}</p>
        <p>Habits: {currentMonthTotal.habits}</p>
        <p>Road: {currentMonthTotal.road}</p>
        <p>Entertainment: {currentMonthTotal.entertainment}</p>
      </div>
      {previousMonthTotal ? (
        <StatisticsComparison
          currentMonthTotal={currentMonthTotal}
          previousMonthTotal={previousMonthTotal}
          previousMonthName={previousMonthName}
        />
      ) : (
        <Notification message={`No trasactions for ${previousMonthName}`} />
      )}
    </section>
  ) : (
    <Notification message="No transactions for current month" />
  );
};
