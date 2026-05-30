export const getCurrentDate = () => {
  return new Date().toISOString();
};

export const formatDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
    .replace(",", "");
};

export const getDateTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
