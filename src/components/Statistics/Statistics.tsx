import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../api/transactionsApi";
import { calculateTotal } from "../../utils/calculations";

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

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const currentDate = new Date();

  const previousMonth =
    currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;

  const previousYear =
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear();

  const previousMonthName = new Date(
    previousYear,
    previousMonth,
  ).toLocaleString("en-US", { month: "long", year: "numeric" });

  const currentMonthTransactions =
    transactions?.filter(transaction => {
      const date = new Date(transaction.date);
      return (
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      );
    }) || [];

  const previousMonthTransactions =
    transactions?.filter(transaction => {
      const date = new Date(transaction.date);
      return (
        date.getMonth() === previousMonth && date.getFullYear() === previousYear
      );
    }) || [];

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
        <p>Meal: {currentMonthTotal.meal}</p>
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
