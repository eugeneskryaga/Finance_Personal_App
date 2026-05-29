import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { useState } from "react";
import type { QueryParams } from "../../types/types";

export const Dashboard = () => {
  const [params, setParams] = useState<QueryParams>({ perPage: 20 });

  const { data: transactions } = useQuery({
    queryKey: ["transactions", params],
    queryFn: ({ queryKey }: QueryFunctionContext<[string, QueryParams]>) => {
      const [, params] = queryKey;
      return getTransactions(params);
    },
  });

  console.log(transactions);
  return (
    <div>
      {transactions && (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              <strong>{transaction.date.toISOString()}</strong>
              <p>{transaction.type}</p>
              <p>{transaction.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
