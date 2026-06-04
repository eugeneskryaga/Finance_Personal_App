import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { Notification } from "../Notification/Notification";

import css from "./Stats.module.css";

export const Stats = () => {
  const { data: response } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      getTransactions({
        perPage: 20,
        sortOrder: "asc",
      }),
    retry: 1,
  });

  return (
    <div className={css.container}>
      <div>
        <p>Total</p>
      </div>
      <div>Diagram</div>
    </div>
  );
};
