import {allInputs} from "../data/data.js"
import render from "../handleTodos/renderTodos.js";
import sortDueDates from "./sortDueDates.js";

export default function filterTodos(data) {
  const {filter} = allInputs;
  const {renderTodos, renderFilteredTodos, todoList} = render;

  data.todos = sortDueDates(data.todos)

  if (filter.value === "complete") {
    if (data.todos.every((todo) => !todo.isComplete)) {
      todoList.innerHTML = "";
      return;
    }
    const filterCompleteTasks = data.todos.filter(todo => todo.isComplete);
    renderFilteredTodos(data, filterCompleteTasks);

  } else if (filter.value === "incomplete") {
    if (data.todos.every((todo) => todo.isComplete)) {
      todoList.innerHTML = ""
      return;
    }
    const filterIncompleteTasks = data.todos.filter(todo => !todo.isComplete)
    return renderFilteredTodos(data, filterIncompleteTasks);

  } else if (filter.value === "all") {
    renderTodos(data);
  }
};

