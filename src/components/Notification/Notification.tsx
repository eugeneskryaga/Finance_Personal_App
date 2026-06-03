import { LuLoaderCircle } from "react-icons/lu";

import css from "./Notification.module.css";

interface Props {
  message: string;
  isLoading?: boolean;
}

export const Notification = ({ message, isLoading }: Props) => {
  return (
    <div className={css.notification}>
      {isLoading && <LuLoaderCircle className={css.spinner} />}
      <p>{message}</p>
    </div>
  );
};
