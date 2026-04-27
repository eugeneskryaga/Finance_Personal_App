import type { Transaction } from "../../types/types";

import css from "./TodayTransactions.module.css";

interface Props {
  transaction: Transaction;
}

export const TodayTransactions = ({ transaction }: Props) => {
  const icons = {
    home: "\u{1F3E0}",
    food: "\u{1F354}",
    habits: "\u{1F6AC}",
    transport: "\u{1F68C}",
    game: "\u{1F3AE}",
  };

  return (
    <ul className={css.ul}>
      <li>
        {icons.home} Living: {transaction.expenses.living}
      </li>
      <li>
        {icons.food} Meal: {transaction.expenses.meal}
      </li>
      <li>
        {icons.habits} Habits: {transaction.expenses.habits}
      </li>
      <li>
        {icons.transport} Road: {transaction.expenses.road}
      </li>
      <li>
        {icons.game} Enternainment: {transaction.expenses.entertainment}
      </li>
    </ul>
  );
};
