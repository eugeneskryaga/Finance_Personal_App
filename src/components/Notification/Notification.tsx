interface Props {
  message: string;
}

export const Notification = ({ message }: Props) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
