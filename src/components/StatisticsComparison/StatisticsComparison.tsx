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
  const difference: TransactionsTotal = {
    income: currentMonthTotal.income - previousMonthTotal.income,
    totalExpenses:
      currentMonthTotal.totalExpenses - previousMonthTotal.totalExpenses,
    entertainment:
      currentMonthTotal.entertainment - previousMonthTotal.entertainment,
    food: currentMonthTotal.food - previousMonthTotal.food,
    road: currentMonthTotal.road - previousMonthTotal.road,
    habits: currentMonthTotal.habits - previousMonthTotal.habits,
    living: currentMonthTotal.living - previousMonthTotal.living,
  };

  return (
    <div>
      <h2>Compared to {previousMonthName}</h2>
      <p>
        Income:{" "}
        <span>
          {difference.income} {difference.income > 0 ? "⬆️" : "⬇️"}
        </span>
      </p>
      <p>
        Expenses:{" "}
        <span>
          {difference.totalExpenses}{" "}
          {difference.totalExpenses > 0 ? "⬆️" : "⬇️"}
        </span>
      </p>
      <strong>Expenses</strong>
      <p>
        Living:{" "}
        <span>
          {difference.living} {difference.living > 0 ? "⬆️" : "⬇️"}
        </span>
      </p>
      <p>
        Food:{" "}
        <span>
          {difference.food} {difference.food > 0 ? "⬆️" : "⬇️"}
        </span>
      </p>
      <p>
        Habits:{" "}
        <span>
          {difference.habits} {difference.habits > 0 ? "⬆️" : "⬇️"}
        </span>
      </p>
      <p>
        Road:{" "}
        <span>
          {difference.road} {difference.road > 0 ? "⬆️" : "⬇️"}
        </span>
      </p>
      <p>
        Entertainment:{" "}
        <span>
          {difference.entertainment}{" "}
          {difference.entertainment > 0 ? "⬆️" : "⬇️"}
        </span>
      </p>
    </div>
  );
};
