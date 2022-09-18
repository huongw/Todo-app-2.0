import { calculateDaysLeft } from "./calculateDate.js";

export default function completeTask(data, id, saveToLocalStorage, editButton, message) {
  data.todos.map((todo) => {
    if (todo.id === id) {
      
      if (!todo.isComplete) {
        todo.isComplete = true;
        todo.message = "Complete";
        todo.dateTime.daysLeft = null;
        editButton.classList.remove("active");
        message.classList.add("complete");
      } else {
        todo.isComplete = false;
        todo.message = "Incomplete";
        todo.dateTime.daysLeft = calculateDaysLeft(todo.dateTime.fullDate);
        editButton.classList.add("active");
        message.classList.remove("complete");
      }
    } 
  });

  saveToLocalStorage(data)
}