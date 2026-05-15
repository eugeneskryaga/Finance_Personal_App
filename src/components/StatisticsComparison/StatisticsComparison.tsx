import type { TransactionsTotal } from "../../types/types";

interface Props {
  currentMonthTotal: TransactionsTotal;
  previousMonthTotal: TransactionsTotal;
  previousMonthName: string;
}

export const StatisticsComparison = ({
  currentMonthTotal,
  previousMonthTotal,
  previousMonthName,
}: Props) => {
  return (
    <div>
      <h2>Compared to {previousMonthName}</h2>
      <p>Income: {currentMonthTotal.income - previousMonthTotal.income}</p>
      <p>
        Expenses:{" "}
        {currentMonthTotal.totalExpenses - previousMonthTotal.totalExpenses}
      </p>
      <p>
        Balance:{" "}
        {currentMonthTotal.income -
          currentMonthTotal.totalExpenses -
          (previousMonthTotal.income - previousMonthTotal.totalExpenses)}
      </p>
      <strong>Expenses</strong>
      <p>Living: {currentMonthTotal.living - previousMonthTotal.living}</p>
      <p>Meal: {currentMonthTotal.meal - previousMonthTotal.meal}</p>
      <p>Habits: {currentMonthTotal.habits - previousMonthTotal.habits}</p>
      <p>Road: {currentMonthTotal.road - previousMonthTotal.road}</p>
      <p>
        Entertainment:{" "}
        {currentMonthTotal.entertainment - previousMonthTotal.entertainment}
      </p>
    </div>
  );
};
