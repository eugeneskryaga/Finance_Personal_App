export const toLocaleISO = (date: Date) => {
  const offsetMs = date.getTimezoneOffset();

  return new Date(date.getTime() - offsetMs).toISOString();
};

export const convertToMidnightString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const getFirstDayOfCurrentMonth = () => {
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  firstDay.setHours(firstDay.getHours() + 3);
  return firstDay;
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
