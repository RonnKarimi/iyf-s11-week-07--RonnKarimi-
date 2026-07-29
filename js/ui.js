export function renderTodos(
    todos,
    filter,
    toggleTodo,
    deleteTodo
) {

    const todoList = document.getElementById("todo-list");

    todoList.innerHTML = "";

    let filtered = todos;

    if (filter === "active") {
        filtered = todos.filter(todo => !todo.completed);
    }

    if (filter === "completed") {
        filtered = todos.filter(todo => todo.completed);
    }

    filtered.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </span>

            <div>

                <button class="toggle-btn" data-id="${todo.id}">
                    ${todo.completed ? "Undo" : "Done"}
                </button>

                <button class="delete-btn" data-id="${todo.id}">
                    Delete
                </button>

            </div>
        `;

        todoList.appendChild(li);

    });

    document.querySelectorAll(".toggle-btn").forEach(button => {

        button.addEventListener("click", () => {

            toggleTodo(Number(button.dataset.id));

        });

    });

    document.querySelectorAll(".delete-btn").forEach(button => {

        button.addEventListener("click", () => {

            deleteTodo(Number(button.dataset.id));

        });

    });

}
