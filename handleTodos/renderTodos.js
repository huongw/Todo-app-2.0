import createTodo from "./createTodo.js";
import {allInputs} from "../data/data.js";

const { todoList } = allInputs;

export default function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.map((todo) => todoList.append(createTodo(todo)));
}