import render from "../handleTodos/renderTodos.js";

export default function clearAndFilterTodoList(todoList, data, filteredArr) {
  const {renderFilteredTodos} = render;

  todoList.innerHTML = "";
  renderFilteredTodos(data, filteredArr)
};