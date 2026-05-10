import type { Order } from "../../types/types";

import css from "./TransactionsListControls.module.css";

interface Props {
  search: string;
  sort: string;
  order: Order;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionsListControls = ({
  search,
  sort,
  order,
  setSearch,
  setSort,
  setOrder,
  setPage,
}: Props) => {
  return (
    <div className={css.container}>
      <input
        value={search}
        type="text"
        placeholder="Search"
        onChange={e => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <select
        value={sort}
        onChange={e => {
          setSort(e.target.value);
          setPage(1);
        }}
      >
        <option value="date">By date</option>
        <option value="income">By income</option>
        <option value="totalExpenses">By expenses</option>
      </select>
      <select
        value={order}
        onChange={e => {
          setOrder(e.target.value as Order);
          setPage(1);
        }}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};
