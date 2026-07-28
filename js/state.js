import {
    loadTodos,
    saveTodos,
    loadFilter,
    saveFilter
} from "./storage.js";

export const state = {
    todos: loadTodos(),
    filter: loadFilter()
};

export function updateState(newTodos) {

    state.todos = newTodos;

    saveTodos(state.todos);

}

export function setFilter(filter) {

    state.filter = filter;

    saveFilter(filter);

}
