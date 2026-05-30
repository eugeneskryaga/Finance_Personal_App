import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { useState } from "react";
import { TransactionsList } from "../TransactionsList/TransactionsList";
import { TransactionsListControls } from "../TransactionsListControls/TransactionsListControls";
import { useDebounce } from "use-debounce";
import type { QueryParams } from "../../types/types";

export const Dashboard = () => {
  const [params, setParams] = useState<QueryParams>({ perPage: 20 });
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: response } = useQuery({
    queryKey: [
      "transactions",
      {
        search: debouncedSearch,
        perPage: 20,
      },
    ],
    queryFn: ({ queryKey }: QueryFunctionContext<[string, QueryParams]>) => {
      const [, params] = queryKey;
      return getTransactions(params);
    },
    retry: 1,
  });

  const transactions = response?.transactions ?? [];

  return (
    <div>
      <TransactionsListControls
        search={search}
        setSearch={setSearch}
      />
      {transactions.length > 0 && (
        <TransactionsList transactions={transactions} />
      )}
    </div>
  );
};
