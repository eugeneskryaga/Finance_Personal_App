import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../api/transactionsApi";

import css from "./Statistics.module.css";

export const Statistics = () => {
  const { data: transactions } = useQuery({
    queryKey: ["allTransactions"],
    queryFn: fetchTransactions,
  });

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const currentMonthTransactions = transactions?.filter(transaction => {
    const date = new Date(transaction.date);
    const currentDate = new Date();

    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  });

  const totalExpensesByCategory = currentMonthTransactions?.reduce(
    (acc, transaction) => {
      acc.road += transaction.expenses.road;
      acc.meal += transaction.expenses.meal;
      acc.habits += transaction.expenses.habits;
      acc.living += transaction.expenses.living;
      acc.entertainment += transaction.expenses.entertainment;
      acc.total += transaction.totalExpenses;

      return acc;
    },
    {
      living: 0,
      meal: 0,
      habits: 0,
      road: 0,
      entertainment: 0,
      total: 0,
    },
  );

  const highestIncomeTransaction = transactions?.reduce((max, transaction) =>
    transaction.income > max.income ? transaction : max,
  );

  const highestExpensesTransaction = transactions?.reduce((max, transaction) =>
    transaction.totalExpenses > max.totalExpenses ? transaction : max,
  );

  return (
    currentMonthTransactions &&
    currentMonthTransactions?.length > 0 && (
      <section className={css.container}>
        <h1>Overall balance: </h1>
        {highestIncomeTransaction && highestExpensesTransaction && (
          <div className={css.highest}>
            <div>
              <strong>Highest income</strong>
              <p>Date: {highestIncomeTransaction?.date}</p>
              <p>
                Balance:{" "}
                {highestIncomeTransaction?.income -
                  highestIncomeTransaction?.totalExpenses}
              </p>
              <p>Income: {highestIncomeTransaction?.income}</p>
              <p>Expenses: {highestIncomeTransaction?.totalExpenses}</p>
              <button>Details</button>
            </div>
            <div>
              <strong>Highest expenses</strong>
              <p>Date: {highestExpensesTransaction?.date}</p>
              <p>
                Balance:{" "}
                {highestExpensesTransaction?.income -
                  highestExpensesTransaction?.totalExpenses}
              </p>
              <p>Income: {highestExpensesTransaction?.income}</p>
              <p>Expenses: {highestExpensesTransaction?.totalExpenses}</p>
              <button>Details</button>
            </div>
          </div>
        )}
        <div className={css.month}>
          <h2>Expenses for {currentMonth}</h2>
          <div>
            <strong>Total: {totalExpensesByCategory?.total}</strong>
            <p>Living: {totalExpensesByCategory?.living}</p>
            <p>Meal: {totalExpensesByCategory?.meal}</p>
            <p>Habits: {totalExpensesByCategory?.habits}</p>
            <p>Road: {totalExpensesByCategory?.road}</p>
            <p>Entertainment: {totalExpensesByCategory?.entertainment}</p>
          </div>
        </div>
      </section>
    )
  );
};
