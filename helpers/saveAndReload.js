import checkFilter from "./checkFilter.js";

export default function saveAndReload(data, saveToLocalStorage) {
  checkFilter(data)
  saveToLocalStorage(data);
}