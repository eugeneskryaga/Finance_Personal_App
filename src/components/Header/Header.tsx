export const Header = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return <strong>{currentDate}</strong>;
};
