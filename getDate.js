import { calculateDaysLeft, calculateFullDate } from "./calculateDate.js";

export default function getDate(inputDate) {
  if (inputDate[0] === "") {
    return { fullDate: null, daysLeft: null };
  }
  
  const newInputDate = `${inputDate[1]} ${inputDate[2]} ${inputDate[0]} 23:59:59`;
  console.log(newInputDate)

  const fullDate = calculateFullDate(newInputDate);
  const daysLeft = calculateDaysLeft(newInputDate);

  return { fullDate, daysLeft };
}

export function updateDaysLeft(data) {
  console.log("second", data.todos)
  data.todos.map((todo) => {
    console.log("third")
    todo.dateTime.daysLeft = calculateDaysLeft(todo.dateTime.fullDate);
  })
}