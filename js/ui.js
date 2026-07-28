import { state } from "./state.js";

export function renderTodos(toggleTodo, deleteTodo) {

    const todoList = document.getElementById("todo-list");

    if (!todoList) return;

    todoList.innerHTML = "";

    let todos = state.todos;

    if (state.filter === "active") {
        todos = todos.filter(todo => !todo.completed);
    }

    if (state.filter === "completed") {
        todos = todos.filter(todo => todo.completed);
    }

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </span>

            <button data-toggle="${todo.id}">
                ${todo.completed ? "Undo" : "Done"}
            </button>

            <button data-delete="${todo.id}">
                Delete
            </button>
        `;

        todoList.appendChild(li);
    });

    document.querySelectorAll("[data-toggle]").forEach(button => {

        button.addEventListener("click", () => {
            toggleTodo(Number(button.dataset.toggle));
        });

    });

    document.querySelectorAll("[data-delete]").forEach(button => {

        button.addEventListener("click", () => {
            deleteTodo(Number(button.dataset.delete));
        });

    });

}
