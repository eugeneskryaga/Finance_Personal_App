import { icons } from "../../assets/assets";

import type { Transaction } from "../../types/types";

import css from "./TodayTransactions.module.css";

interface Props {
  transaction: Transaction;
}

export const TodayTransactions = ({ transaction }: Props) => {
  return (
    <ul className={css.ul}>
      <li>
        {icons.home} Living: {transaction.expenses.living}
      </li>
      <li>
        {icons.food} Food: {transaction.expenses.food}
      </li>
      <li>
        {icons.habits} Habits: {transaction.expenses.habits}
      </li>
      <li>
        {icons.transport} Road: {transaction.expenses.road}
      </li>
      <li>
        {icons.game} Entertainment: {transaction.expenses.entertainment}
      </li>
    </ul>
  );
};
