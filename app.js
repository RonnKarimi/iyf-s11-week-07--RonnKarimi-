// ===========================
// Local Storage Helpers
// ===========================

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// ===========================
// App State
// ===========================

const STORAGE_KEY = "todos";

const state = {
    todos: getFromStorage(STORAGE_KEY, []),
    filter: localStorage.getItem("todoFilter") || "all",
    theme: "light"
};

function saveState() {
    saveToStorage(STORAGE_KEY, state.todos);
    localStorage.setItem("todoFilter", state.filter);
}

// ===========================
// Todo Functions
// ===========================

function addTodo(text) {

    if (text.trim() === "") return;

    state.todos.push({
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
    });

    saveState();
    renderTodos();
}

function toggleTodo(id) {

    state.todos = state.todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );

    saveState();
    renderTodos();
}

function deleteTodo(id) {

    state.todos = state.todos.filter(todo => todo.id !== id);

    saveState();
    renderTodos();
}

// ===========================
// Filter
// ===========================

function setFilter(filter) {

    state.filter = filter;

    saveState();

    renderTodos();
}

function getFilteredTodos() {

    switch (state.filter) {

        case "completed":
            return state.todos.filter(todo => todo.completed);

        case "active":
            return state.todos.filter(todo => !todo.completed);

        default:
            return state.todos;
    }

}

// ===========================
// Render Todos
// ===========================

function renderTodos() {

    const todoList = document.getElementById("todo-list");

    if (!todoList) return;

    todoList.innerHTML = "";

    const todos = getFilteredTodos();

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </span>

            <button onclick="toggleTodo(${todo.id})">
                ${todo.completed ? "Undo" : "Done"}
            </button>

            <button onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;

        todoList.appendChild(li);

    });

}

// ===========================
// Session Storage Form
// ===========================

function initializeForm() {

    const form = document.getElementById("contact-form");

    if (!form) return;

    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {

        const saved = sessionStorage.getItem(`form_${input.name}`);

        if (saved) {
            input.value = saved;
        }

        input.addEventListener("input", () => {

            sessionStorage.setItem(
                `form_${input.name}`,
                input.value
            );

        });

    });

    form.addEventListener("submit", event => {

        event.preventDefault();

        inputs.forEach(input => {

            sessionStorage.removeItem(`form_${input.name}`);

        });

        alert("Form Submitted!");

        form.reset();

    });

}

// ===========================
// App Initialization
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    renderTodos();

    initializeForm();

    const addButton = document.getElementById("add-btn");

    if (addButton) {

        addButton.addEventListener("click", () => {

            const input = document.getElementById("todo-input");

            if (!input) return;

            addTodo(input.value);

            input.value = "";

        });

    }

});
