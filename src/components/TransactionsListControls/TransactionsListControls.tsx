import { MdSearch } from "react-icons/md";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import type { SelectOption, SortOrder } from "../../types/types";
import Select, { type SingleValue } from "react-select";

import css from "./TransactionsListControls.module.css";

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
  const sortOptions: SelectOption[] = [
    { value: "date", label: "By Date" },
    { value: "type", label: "By Type" },
    { value: "category", label: "By Category" },
    { value: "amount", label: "By Value" },
  ];

  const defaultOption = sortOptions.find(option => option.value === sortBy);

  const handleChange = (option: SingleValue<SelectOption>) => {
    if (option) setSortBy(option.value);
  };

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
        <Select
          unstyled
          classNames={{
            control: () => css.control,
            menu: () => css.menu,
            option: state => (state.isFocused ? css.optionFocused : css.option),
          }}
          options={sortOptions}
          value={defaultOption}
          onChange={handleChange}
        />
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
