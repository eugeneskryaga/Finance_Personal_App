import { MdSearch } from "react-icons/md";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";

import css from "./TransactionsListControls.module.css";
import type { SortOrder } from "../../types/types";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  sortOrder: SortOrder;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

export const TransactionsListControls = ({
  search,
  setSearch,
  sortBy,
  sortOrder,
  setSortOrder,
  setSortBy,
}: Props) => {
  return (
    <div className={css.container}>
      <div className={css.searchContainer}>
        <MdSearch className={css.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          className={css.search}
        />
      </div>
      <div className={css.sortContainer}>
        <select
          name="sort"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date">By Date</option>
          <option value="type">By Type</option>
          <option value="category">By Category</option>
          <option value="amount">By Value</option>
        </select>
        <button
          onClick={() => setSortOrder("asc")}
          className={sortOrder === "asc" ? css.activeBtn : ""}
        >
          <MdOutlineArrowUpward className={css.sortIcon} />
        </button>
        <button
          onClick={() => setSortOrder("desc")}
          className={sortOrder === "desc" ? css.activeBtn : ""}
        >
          <MdOutlineArrowDownward className={css.sortIcon} />
        </button>
      </div>
    </div>
  );
};
