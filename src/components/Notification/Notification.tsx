import css from "./Notification.module.css";

interface Props {
  message: string;
}

export const Notification = ({ message }: Props) => {
  return (
    <div className={css.container}>
      <p>{message}</p>
    </div>
  );
};
