export function calculateFullDate(newInputDate) {
  const date = new Date(newInputDate);
  const fullDate = date.toDateString();

  return fullDate;
}

export function calculateDaysLeft(fullDate, daysLeft = undefined) {
  if (fullDate === null || daysLeft === null) return null;

  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  const date = new Date(fullDate.includes("23:59:59") ? fullDate : `${fullDate} 23:59:59`);

  const dueDate = date.getTime();
  const currentDate = new Date().getTime();
  const diffInTime = dueDate - currentDate;

  const updateDaysLeft = Math.floor(diffInTime / days);

  return updateDaysLeft;
}

