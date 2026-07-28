import { state, updateState, setFilter } from "./state.js";
import { renderTodos } from "./ui.js";
import { createTodo } from "./utils.js";

function refresh() {
    renderTodos(state.todos, state.filter, toggleTodo, deleteTodo);
}

function addTodo(text) {
    if (!text.trim()) return;

    updateState([
        ...state.todos,
        createTodo(text)
    ]);

    refresh();
}

function toggleTodo(id) {
    updateState(
        state.todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
    );

    refresh();
}

function deleteTodo(id) {
    updateState(
        state.todos.filter(todo => todo.id !== id)
    );

    refresh();
}

window.setFilter = function (filter) {
    setFilter(filter);
    refresh();
};

document.addEventListener("DOMContentLoaded", () => {

    refresh();

    const addButton = document.getElementById("add-btn");

    addButton.addEventListener("click", () => {

        const input = document.getElementById("todo-input");

        addTodo(input.value);

        input.value = "";

    });

});
