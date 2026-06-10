export const convertToMidnightString = (date: Date) => {
  const localMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  return localMidnight.toISOString();
};

export const convertDateToISO = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const today = new Date();
  const todayString = formatDateForInput(today);

  if (dateString === todayString) {
    return new Date().toISOString();
  }

  return convertToMidnightString(date);
};

export const getFirstDayOfCurrentMonth = () => {
  return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
};

export const formatDateForInput = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
