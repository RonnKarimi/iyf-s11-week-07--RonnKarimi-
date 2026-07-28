import { loadTodos, saveTodos } from "./storage.js";

export const state = {
    todos: loadTodos(),
    filter: "all"
};

export function updateState(newTodos) {
    state.todos = newTodos;
    saveTodos(state.todos);
}
