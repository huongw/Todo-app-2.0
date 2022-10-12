import {allInputs} from "../data/data.js";
import renderTodos from "../handleTodos/renderTodos.js";
import sortDueDates from "./sortDueDates.js";

export default function filterTodos(data) {
  const {filter, todoList} = allInputs;

  data.todos = sortDueDates(data.todos)

  if (filter.value === "complete") {
    if (data.todos.every((todo) => !todo.isComplete)) todoList.innerHTML = ""
    const filterCompleteTasks = data.todos.filter(todo => todo.isComplete);
    renderTodos(filterCompleteTasks);
  } else if (filter.value === "incomplete") {
    if (data.todos.every((todo) => todo.isComplete)) todoList.innerHTML = ""
    const filterIncompleteTasks = data.todos.filter(todo => !todo.isComplete)
    renderTodos(filterIncompleteTasks);
  } else {
    renderTodos(data.todos);
  }
};

