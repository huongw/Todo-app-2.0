import { calculateDaysLeft, calculateFullDate } from "./calculateDate.js";

export default function getDate(inputDate) {
  if (inputDate[0] === "") return { fullDate: null, daysLeft: null };
  
  const newInputDate = `${inputDate[1]}/${inputDate[2]}/${inputDate[0]} 23:59:59`;

  const fullDate = calculateFullDate(newInputDate);
  const daysLeft = calculateDaysLeft(newInputDate);

  return { fullDate, daysLeft };
}

