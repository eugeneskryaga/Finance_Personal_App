import type { Transaction } from "../../types/types";
import { capitalize, formatDate, getDateTime } from "../../utils/utils";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

import css from "./TransactionsList.module.css";

interface Props {
  transactions: Transaction[];
}

export const TransactionsList = ({ transactions }: Props) => {
  const groupedTransactions = transactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.date).toISOString().split("T")[0];

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(transaction);

      return acc;
    },
    {} as Record<string, Transaction[]>,
  );

  return (
    <>
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date}>
          <strong className={css.date}>{formatDate(date)}</strong>
          <ul>
            {transactions.map(transaction => (
              <li
                key={transaction._id}
                className={css.li}
              >
                <p>
                  {transaction.type === "income" ? (
                    <MdTrendingUp className={`${css.icon} ${css.income}`} />
                  ) : (
                    <MdTrendingDown className={`${css.icon} ${css.expense}`} />
                  )}
                </p>
                <div>
                  <p>{capitalize(transaction.category)}</p>
                  <p>{getDateTime(transaction.date)}</p>
                </div>
                <p>
                  {transaction.type === "income" ? (
                    <span className={`${css.span} ${css.span_income}`}>
                      + {transaction.amount}
                    </span>
                  ) : (
                    <span className={`${css.span} ${css.span_expense}`}>
                      - {transaction.amount}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
