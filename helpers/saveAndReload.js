import filterTodos from "./filterTodos.js";

export default function saveAndReload(data, saveToLocalStorage) {
  filterTodos(data)
  saveToLocalStorage(data);
}