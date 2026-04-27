export const Header = () => {
  const currentDate = new Date().toDateString();
  return <p>{currentDate}</p>;
};
