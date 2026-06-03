import { MdSearch } from "react-icons/md";

import css from "./TransactionsListControls.module.css";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const TransactionsListControls = ({ search, setSearch }: Props) => {
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
    </div>
  );
};
