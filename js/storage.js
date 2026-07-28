const STORAGE_KEY = "todos";

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFilter(filter) {
    localStorage.setItem("todoFilter", filter);
}

export function loadFilter() {
    return localStorage.getItem("todoFilter") || "all";
}
