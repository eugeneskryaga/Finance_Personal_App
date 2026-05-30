import css from "./TransactionsListControls.module.css";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const TransactionsListControls = ({ search, setSearch }: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
        }}
        className={css.search}
      />
      {/* <div>
        <select name="sort">
          <option value="type">By type</option>
          <option value="category">By category</option>
        </select>
        <select name="order">
          <option value="asc">From A to Z</option>
          <option value="desc">From Z to A</option>
        </select>
      </div> */}
    </div>
  );
};
