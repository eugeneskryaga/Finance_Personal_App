import css from "./Notification.module.css";

interface Props {
  message: string;
}

export const Notification = ({ message }: Props) => {
  return (
    <div className={css.notification}>
      <p>{message}</p>
    </div>
  );
};
