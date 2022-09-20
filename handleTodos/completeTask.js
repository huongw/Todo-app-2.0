import { calculateDaysLeft } from "../helpers/calculateDate.js";
import { insertChatBubbleText } from "../chatBubble/chatBubble.js";
import sortDueDates from "../helpers/sortDueDates.js";
import render from "./renderTodos.js";

export default function completeTask(data, id, saveToLocalStorage, editButton, message) {
  const {renderTodos} = render;
  
  data.todos.map((todo) => {
    if (todo.id === id) {
      
      if (!todo.isComplete) {
        todo.isComplete = true;
        todo.message = "Completed";
        todo.dateTime.daysLeft = null;
        editButton.classList.remove("active");
        message.classList.add("complete");
        insertChatBubbleText(todo.isComplete);
      } else {
        todo.isComplete = false;
        todo.message = "Incomplete";
        todo.dateTime.daysLeft = calculateDaysLeft(todo.dateTime.fullDate);
        data.todos = sortDueDates(data.todos)
        renderTodos(data)
        editButton.classList.add("active");
        message.classList.remove("complete");
        insertChatBubbleText(todo.isComplete);
      }
    } 
  });

  saveToLocalStorage(data)
}