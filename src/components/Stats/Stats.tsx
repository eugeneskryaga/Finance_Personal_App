import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { Statistics } from "../../types/types";

import css from "./Stats.module.css";
import { capitalize } from "../../utils/utils";

interface Props {
  statistics: Statistics;
}

export const Stats = ({ statistics }: Props) => {
  const totalExpenses = statistics.expenses;

  const chartData = Object.entries(statistics.expensesByCategory)
    .map(([category, amount]) => ({
      category: capitalize(category),
      amount,
      percent: ((amount / totalExpenses) * 100).toFixed(1),
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className={css.statsContainer}>
      <div className={css.summary}>
        <div className={css.summaryCard}>
          <span>Income</span>
          <strong className={css.income}>+{statistics.income}</strong>
        </div>
        <div className={css.summaryCard}>
          <span>Balance</span>
          <strong
            className={statistics.balance >= 0 ? css.income : css.expense}
          >
            {statistics.balance}
          </strong>
        </div>

        <div className={css.summaryCard}>
          <span>Expenses</span>
          <strong className={css.expense}>-{statistics.expenses}</strong>
        </div>
      </div>
      <div className={css.card}>
        <h2 className={css.title}>Expenses by Category</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#404040"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="category"
              width={110}
              tick={{ fill: "#E5E7EB" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#2A2A2A",
                border: "1px solid #404040",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="amount"
              fill="#22C55E"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        <ul className={css.legend}>
          {chartData.map(item => (
            <li
              key={item.category}
              className={css.legendItem}
            >
              <div className={css.category}>
                <span className={css.dot}></span>
                <span>{capitalize(item.category)}</span>
              </div>
              <span className={css.amount}>{item.amount}</span>
              <span className={css.percent}>{item.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
